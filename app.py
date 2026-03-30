import os
from datetime import date

from flask import Flask, jsonify, render_template, request, session

from quest_config import QUEST_ENTRIES, hash_password

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "dev-secret-key-change-me")


@app.before_request
def check_midnight_reset():
    today = date.today().isoformat()
    if session.get("session_date") != today:
        session.clear()
        session["session_date"] = today
        session["tried_words"] = []
        session["unlocked"] = []
        session["correct_words"] = []


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/guess", methods=["POST"])
def guess():
    data = request.get_json()
    word = data.get("word", "").lower().strip()

    if not word:
        return jsonify({"match": False, "error": "No word provided"}), 400

    tried = session.get("tried_words", [])
    unlocked = session.get("unlocked", [])
    correct_words = session.get("correct_words", [])

    if word not in tried:
        tried.append(word)
        session["tried_words"] = tried

    word_hash = hash_password(word)

    for entry in QUEST_ENTRIES:
        if entry["password_hash"] == word_hash:
            if entry["id"] not in unlocked:
                unlocked.append(entry["id"])
                session["unlocked"] = unlocked
            if word not in correct_words:
                correct_words.append(word)
                session["correct_words"] = correct_words

            return jsonify({
                "match": True,
                "entry": {
                    "id": entry["id"],
                    "type": entry["type"],
                    "title": entry["title"],
                    "content": entry["content"],
                    "hint": entry.get("hint"),
                },
                "tried_words": tried,
                "correct_words": correct_words,
            })

    return jsonify({
        "match": False,
        "tried_words": tried,
        "correct_words": correct_words,
    })


@app.route("/api/progress")
def progress():
    tried = session.get("tried_words", [])
    correct_words = session.get("correct_words", [])
    return jsonify({
        "tried_words": tried,
        "correct_words": correct_words,
    })


@app.route("/api/reset", methods=["POST"])
def reset():
    session.clear()
    session["session_date"] = date.today().isoformat()
    session["tried_words"] = []
    session["unlocked"] = []
    session["correct_words"] = []
    return jsonify({"ok": True})


@app.route("/health")
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    app.run(debug=True, port=5000)
