"""
Quest configuration for Big Bunny's Quest.

Each entry maps a hashed password to content that gets unlocked.
To add a new entry, run: python quest_config.py "your-password"
Then paste the hash into a new entry below.
"""

import hashlib
import sys


def hash_password(word):
    return hashlib.sha256(word.lower().replace(" ", "").encode()).hexdigest()


# Content types: "riddle" (HTML text), "photo" (image filename), "game" (game path)
QUEST_ENTRIES = [
    {
        "id": "echo-school",
        "password_hash": hash_password("f3 e5 c6 b8"),
        "type": "riddle",
        "title": "A Quest Awaits!",
        "content": (
            "<p>Find the street that reflects every sound,</p>"
            "<p>A school you've never attended, but it's there to be found.</p>"
            "<p>Climb the steps where the paint's like a star,</p>"
            "<p>And read what they say — the journey is how far?</p>"
        ),
    },
    {
        "id": "echo-school-alt",
        "password_hash": hash_password("f3 d4 c6 b8"),
        "type": "riddle",
        "title": "A Quest Awaits!",
        "content": (
            "<p>Find the street that reflects every sound,</p>"
            "<p>A school you've never attended, but it's there to be found.</p>"
            "<p>Climb the steps where the paint's like a star,</p>"
            "<p>And read what they say — the journey is how far?</p>"
        ),
    },
    {
        "id": "thousand-miles",
        "password_hash": hash_password("thousand miles"),
        "type": "riddle",
        "title": "Great Work Children!",
        "content": "<p>Look to your right. The future is now? Then what?</p>",
    },
    {
        "id": "thousand-miles-a",
        "password_hash": hash_password("a thousand miles"),
        "type": "riddle",
        "title": "Great Work Children!",
        "content": "<p>Look to your right. The future is now? Then what?</p>",
    },
    {
        "id": "work-hard",
        "password_hash": hash_password("work hard get smart"),
        "type": "riddle",
        "title": "Brilliant!",
        "content": "<p>Great work! Now tell me — what year was Lo Coco's founded?</p>",
    },
    {
        "id": "adlai",
        "password_hash": hash_password("adlai"),
        "type": "riddle",
        "title": "Hello Adlai!",
        "content": "<p>Hello Adlai! But that's not a clue.</p>",
    },
    {
        "id": "tobin",
        "password_hash": hash_password("tobin"),
        "type": "riddle",
        "title": "Tobin!",
        "content": "<p>Tobin bobin fo fobin. Tobin! Not a clue.</p>",
    },
    {
        "id": "calliope",
        "password_hash": hash_password("calliope"),
        "type": "photo",
        "title": "My dear Calliope",
        "content": "bb-friends.jpeg",
        "hint": "Remember this? Not a clue.",
    },
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
        "title": "Ooh, Fancy!",
        "content": "theater.jpeg",
        "hint": "Can you figure out what the universal love is for?",
    },
    {
        "id": "mosswood",
        "password_hash": hash_password("popcorn"),
        "type": "photo",
        "title": "Nailed It!",
        "content": "mosswood.jpeg",
        "hint": "I want to know who is playing with the clams!",
    },
    {
        "id": "mister",
        "password_hash": hash_password("shannon"),
        "type": "photo",
        "title": "Well Done, Detectives!",
        "content": "mister.jpeg",
        "hint": "Who is hosting?!",
    },
    {
        "id": "cosmigraphics",
        "password_hash": hash_password("misterrr"),
        "type": "photo",
        "title": "You're On Fire!",
        "content": "cosmigraphics.jpeg",
        "hint": "Keep heading north, and see if you can find out what book this is for me.",
    },
    {
        "id": "power",
        "password_hash": hash_password("cosmigraphics"),
        "type": "photo",
        "title": "Incredible!",
        "content": "power.jpeg",
        "hint": "What should I destroy?",
    },
    {
        "id": "year",
        "password_hash": hash_password("power"),
        "type": "riddle",
        "title": "Unstoppable!",
        "content": "<p>Now tell me, what year was Lo Coco's founded?</p>",
    },
    {
        "id": "adorable-photos",
        "password_hash": hash_password("1966"),
        "type": "riddle",
        "title": "History Buffs!",
        "content": (
            '<p>Near what cross street were these adorable photos taken?</p>'
            '<img class="photo-content" src="/static/img/IMG_0441.jpeg" alt="Adorable photo 1" style="margin:0.5rem 0;max-width:100%;border-radius:12px;">'
            '<img class="photo-content" src="/static/img/IMG_8692.jpeg" alt="Adorable photo 2" style="margin:0.5rem 0;max-width:100%;border-radius:12px;">'
        ),
    },
    {
        "id": "entrada",
        "password_hash": hash_password("entrada"),
        "type": "riddle",
        "title": "Sharp Eyes!",
        "content": (
            '<img class="photo-content" src="/static/img/IMG_7741.jpeg" alt="Flowers in the window" style="margin:0.5rem 0;max-width:100%;border-radius:12px;">'
            "<p>Take two hundred steps toward the setting sun's glow,</p>"
            "<p>Southwest on the avenue, not too fast, not too slow.</p>"
            "<p>In the window, bright blooms — that's the picture you seek.</p>"
            "<p>What's the name of this store? That's the answer you'll speak.</p>"
        ),
    },
    {
        "id": "good-stock",
        "password_hash": hash_password("good stock"),
        "type": "riddle",
        "title": "You're Getting Warmer!",
        "content": (
            "<p>A teacher turned astronaut, sent to save the sun,</p>"
            "<p>He woke up in space, remembering none.</p>"
            "<p>Adlai wants to see him — this movie's a thrill!</p>"
            "<p>What's the name of the actor? That answer will fill.</p>"
        ),
    },
    {
        "id": "ryan-gosling",
        "password_hash": hash_password("ryan gosling"),
        "type": "riddle",
        "title": "Movie Stars!",
        "content": (
            "<p>Hop across the street, there's food to find,</p>"
            "<p>Black as stone with eggs — a one-of-a-kind.</p>"
            "<p>Benediction is its name, a blessing indeed,</p>"
            "<p>What's the price tag say? That's all you need.</p>"
        ),
    },
    {
        "id": "benediction",
        "password_hash": hash_password("1625"),
        "type": "game",
        "title": "Time for Wordle!",
        "content": "wordle",
    },
    {
        "id": "eureka",
        "password_hash": hash_password("eureka"),
        "type": "riddle",
        "title": "Puzzle Masters!",
        "content": (
            "<p>Keep walking southwest on Piedmont Ave,</p>"
            "<p>Past the shops and the signs, be bold and be brave.</p>"
            "<p>Find the spot where a witch might stock up for her brews —</p>"
            "<p>What's the name of this place? That's your very next clue.</p>"
        ),
    },
    {
        "id": "apothicaire",
        "password_hash": hash_password("twisted thistle apothicaire"),
        "type": "riddle",
        "title": "Spellbound!",
        "content": (
            "<p>Hop across to Piedmont Lane,</p>"
            "<p>Find the shop with an otherworldly name.</p>"
            "<p>They sell music that's out of this world —</p>"
            "<p>What symbol's on their sign, bright and bold?</p>"
        ),
    },
    {
        "id": "lightning-bolt",
        "password_hash": hash_password("lightning bolt"),
        "type": "riddle",
        "title": "Electrifying!",
        "content": (
            "<p>Keep heading southwest on Piedmont Ave,</p>"
            "<p>Seek the home of Apple Croissants, Raspberry Walnut Scones,</p>"
            "<p>and Apricot Walnut ________.</p>"
            "<p>Fill in the blank — that's your next clue!</p>"
        ),
    },
    {
        "id": "rugelach",
        "password_hash": hash_password("rugelach"),
        "type": "riddle",
        "title": "The Final Chapter!",
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
        "id": "guest-bed",
        "password_hash": hash_password("8141"),
        "type": "riddle",
        "title": "Almost There!",
        "content": (
            "<p>Find the bed where guests come to rest,</p>"
            "<p>Close to where Mama works her best.</p>"
            "<p>Get down on your knees and look below —</p>"
            "<p>Something special waits there, don't you know?</p>"
        ),
    },
    {
        # Grandpa's poem - saved for later use
        "id": "grandpa-poem",
        "password_hash": hash_password("PLACEHOLDER_DO_NOT_USE"),
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
        "password_hash": hash_password("bloom"),
        "type": "game",
        "title": "Underground Explosive Locator",
        "content": "minesweeper",
    },
    {
        "id": "sudoku",
        "password_hash": hash_password("sparkle"),
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
        "password_hash": hash_password("lights out"),
        "type": "game",
        "title": "Lights Out",
        "content": "lightsout",
    },
    {
        "id": "kenken",
        "password_hash": hash_password("atomic"),
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
