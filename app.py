import os
from datetime import date, datetime

import resend
from flask import Flask, jsonify, redirect, render_template, request, session, url_for

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


# In-memory message store (resets on deploy)
messages_today = []  # list of {"text": str, "time": str, "date": str}


def prune_old_messages():
    today = date.today().isoformat()
    messages_today[:] = [m for m in messages_today if m["date"] == today]


def send_email(text):
    api_key = os.environ.get("RESEND_API_KEY")
    from_addr = os.environ.get("RESEND_FROM", "Big Bunny <onboarding+bigbunny@resend.dev>")
    if not api_key:
        return False
    resend.api_key = api_key
    try:
        resend.Emails.send({
            "from": from_addr,
            "to": ["wibge@gmail.com"],
            "subject": "Big Bunny Message",
            "text": text,
        })
        return True
    except Exception as e:
        print(f"Email failed: {e}")
        return False


@app.route("/msg", methods=["GET", "POST"])
def msg():
    prune_old_messages()
    error = None
    success = None

    if request.method == "POST":
        text = request.form.get("message", "").strip()
        if text:
            now = datetime.now()
            messages_today.append({
                "text": text,
                "time": now.strftime("%I:%M %p"),
                "date": date.today().isoformat(),
            })
            if send_email(text):
                success = "Message sent!"
            else:
                success = "Message saved!"
            return redirect(url_for("msg"))
        else:
            error = "Please type a message."

    return render_template("msg.html", messages=messages_today, error=error, success=success)


@app.route("/health")
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    app.run(debug=True, port=5000)
