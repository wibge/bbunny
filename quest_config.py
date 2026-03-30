"""
Quest configuration for Big Bunny's Quest.

Each entry maps a hashed password to content that gets unlocked.
To add a new entry, run: python quest_config.py "your-password"
Then paste the hash into a new entry below.
"""

import hashlib
import sys


def hash_password(word):
    return hashlib.sha256(word.lower().strip().encode()).hexdigest()


# Content types: "riddle" (HTML text), "photo" (image filename), "game" (game path)
QUEST_ENTRIES = [
    {
        "id": "welcome",
        "password_hash": hash_password("hello"),
        "type": "riddle",
        "title": "Welcome!",
        "content": "<p>Hello Children! Welcome to Big Bunny's Quest!</p><p>Can you find the next password?</p>",
    },
    {
        "id": "theater",
        "password_hash": hash_password("crepe"),
        "type": "photo",
        "title": "Great Job Children!",
        "content": "theater.jpeg",
        "hint": "Can you figure out what the universal love is for?",
    },
    {
        "id": "mosswood",
        "password_hash": hash_password("popcorn"),
        "type": "photo",
        "title": "Great Job Children!",
        "content": "mosswood.jpeg",
        "hint": "I want to know who is playing with the clams!",
    },
    {
        "id": "mister",
        "password_hash": hash_password("shannon"),
        "type": "photo",
        "title": "Great Job Children!",
        "content": "mister.jpeg",
        "hint": "Who is hosting?!",
    },
    {
        "id": "cosmigraphics",
        "password_hash": hash_password("misterrr"),
        "type": "photo",
        "title": "Great Job Children!",
        "content": "cosmigraphics.jpeg",
        "hint": "Keep heading north, and see if you can find out what book this is for me.",
    },
    {
        "id": "power",
        "password_hash": hash_password("cosmigraphics"),
        "type": "photo",
        "title": "Great Job Children!",
        "content": "power.jpeg",
        "hint": "What should I destroy?",
    },
    {
        "id": "year",
        "password_hash": hash_password("power"),
        "type": "riddle",
        "title": "Great Job Children!",
        "content": "<p>Now tell me, what year was Lo Coco's founded?</p>",
    },
    {
        "id": "poem",
        "password_hash": hash_password("1966"),
        "type": "riddle",
        "title": "You're Getting Close!",
        "content": (
            "<p>He stood before that class of his, a teacher tried and true,</p>"
            "<p>He filled the board with chalk and proof, the way he'd always do.</p>"
            "<p>Now here's a number you must find, it rang upon his desk\u2014</p>"
            "<p>Grandpa's work phone, old but kind, will guide you on this quest.</p>"
            "<br>"
            "<p>Make your way back home once more,</p>"
            "<p>Seek the blue suitcase by the door.</p>"
            "<p>Lift its latch\u2014your quest takes flight;</p>"
            "<p>Inside, the trail begins tonight.</p>"
        ),
    },
    {
        "id": "minesweeper",
        "password_hash": hash_password("boom"),
        "type": "game",
        "title": "Underground Explosive Locator",
        "content": "minesweeper",
    },
    {
        "id": "sudoku",
        "password_hash": hash_password("numbers"),
        "type": "game",
        "title": "Sudoku Challenge",
        "content": "sudoku",
    },
    {
        "id": "wordle",
        "password_hash": hash_password("words"),
        "type": "game",
        "title": "Wordle",
        "content": "wordle",
    },
    {
        "id": "lightsout",
        "password_hash": hash_password("lights"),
        "type": "game",
        "title": "Lights Out",
        "content": "lightsout",
    },
    {
        "id": "kenken",
        "password_hash": hash_password("math"),
        "type": "game",
        "title": "KenKen",
        "content": "kenken",
    },
    {
        "id": "cipher",
        "password_hash": hash_password("spy"),
        "type": "game",
        "title": "Secret Cipher",
        "content": "cipher",
    },
    {
        "id": "crossword",
        "password_hash": hash_password("across"),
        "type": "game",
        "title": "Crossword Puzzle",
        "content": "crossword",
    },
    {
        "id": "finale",
        "password_hash": hash_password("password"),
        "type": "riddle",
        "title": "Excellent Work!",
        "content": "<p>The location of your prize is...</p><p style='font-size:1.5em;font-weight:bold;'>UP YOUR BUTT AND AROUND THE CORNER!</p>",
    },
]


if __name__ == "__main__":
    if len(sys.argv) > 1:
        word = sys.argv[1]
        print(f'"{word}" -> {hash_password(word)}')
    else:
        print("Usage: python quest_config.py <word>")
        print("\nCurrently configured entries:")
        for entry in QUEST_ENTRIES:
            print(f"  {entry['id']:20s} type={entry['type']}")
