/**
 * Title: Wordle
 * Description: A word guessing game
 * Author: Samin Yasar
 * Date: 06/February/2022
 */

let wordList = [];

fetch('./src/js/words.json')
  .then(response => response.json())
  .then(data => {
    wordList = data.words;
  })
  .catch(error => console.error('Error loading the JSON file:', error));

function wordExists(word) {
  const w = word.toLowerCase();
  return wordList.includes(w) || (typeof game !== 'undefined' && game.words.includes(w));
}

// DOM Selection
const gameSection = document.getElementById("gameSection");
const rulesButton = document.getElementById("rulesButton");
const settingsButton = document.getElementById("settingsButton");
const overlayCrossButton = document.getElementById("overlayCrossButton");
const helpOverlayContent = document.getElementById("helpOverlayContent");
const settingsOverlayContent = document.getElementById(
  "settingsOverlayContent"
);
const messageOverlayContent = document.getElementById("messageOverlayContent");
const messageContainer = document.querySelector(".message-container");
const darkModeSwitch = document.getElementById("darkModeSwitch");
const hardModeSwitch = document.getElementById("hardModeSwitch");

/**
 * Set all localstorage default values
 */
const initLocalStorage = () => {
  if (localStorage.getItem("wordle-hardMode") === null) {
    localStorage.setItem("wordle-hardMode", "false");
  }
  if (localStorage.getItem("wordle-darkMode") === null) {
    localStorage.setItem("wordle-darkMode", "false");
  }
};

// Initialize some localstorage variable if they don't exist
initLocalStorage();

// Global variables
const game = {
  hardMode:
    localStorage.getItem("wordle-hardMode") === "false" ? false : true,
  darkMode:
    localStorage.getItem("wordle-darkMode") === "false" ? false : true,
  words: [
    "cigar", "rebut", "sissy", "humph", "awake", "blush", "focal", "evade", "naval", "serve",
    "heath", "dwarf", "model", "karma", "stink", "grade", "quiet", "bench", "abate", "feign",
    "major", "death", "fresh", "crust", "stool", "colon", "abase", "marry", "react", "batty",
    "pride", "floss", "helix", "croak", "staff", "paper", "unfed", "whelp", "trawl", "outdo",
    "adobe", "crazy", "sower", "repay", "digit", "crate", "cluck", "spike", "mimic", "pound",
    "maxim", "linen", "unmet", "flesh", "booby", "forth", "first", "stand", "belly", "ivory",
    "seedy", "print", "yearn", "drain", "bribe", "stout", "panel", "crass", "flume", "offal",
    "agree", "error", "swirl", "argue", "bleed", "delta", "flick", "totem", "wooer", "front",
    "shrub", "parry", "biome", "lapel", "start", "greet", "goner", "golem", "lusty", "loopy",
    "round", "audit", "lying", "gamma", "labor", "islet", "civic", "forge", "corny", "moult",
    "basic", "salad", "agate", "spicy", "spray", "essay", "fjord", "spend", "kebab", "guild",
    "aback", "motor", "alone", "hatch", "hyper", "thumb", "dowry", "ought", "belch", "dutch",
    "pilot", "tweed", "comet", "jaunt", "enema", "steed", "abyss", "growl", "fling", "dozen",
    "boozy", "erode", "world", "gouge", "click", "briar", "great", "altar", "pulpy", "blurt",
    "coast", "duchy", "groin", "fixer", "group", "rogue", "badly", "smart", "pithy", "gaudy",
    "chill", "heron", "vodka", "finer", "surer", "radio", "rouge", "perch", "retch", "wrote",
    "clock", "tilde", "store", "prove", "bring", "solve", "cheat", "grime", "exult", "usher",
    "epoch", "triad", "break", "rhino", "viral", "conic", "masse", "sonic", "vital", "trace",
    "using", "peach", "champ", "baton", "brake", "pluck", "craze", "gripe", "weary", "picky",
    "acute", "ferry", "aside", "tapir", "troll", "unify", "rebus", "boost", "truss", "siege",
    "tiger", "banal", "slump", "crank", "gorge", "query", "drink", "favor", "abbey", "tangy",
    "panic", "solar", "shire", "proxy", "point", "robot", "prick", "wince", "crimp", "knoll",
    "sugar", "whack", "mount", "perky", "could", "wrung", "light", "those", "moist", "shard",
    "pleat", "aloft", "skill", "elder", "frame", "humor", "pause", "ulcer", "ultra", "robin",
    "cynic", "aroma", "caulk", "shake", "dodge", "swill", "tacit", "other", "thorn", "trove",
    "bloke", "vivid", "spill", "chant", "choke", "rupee", "nasty", "mourn", "ahead", "brine",
    "cloth", "hoard", "sweet", "month", "lapse", "watch", "today", "focus", "smelt", "tease",
    "cater", "movie", "saute", "allow", "renew", "their", "slosh", "purge", "chest", "depot",
    "epoxy", "nymph", "found", "shall", "harry", "stove", "lowly", "snout", "trope", "fewer",
    "shawl", "natal", "comma", "foray", "scare", "stair", "black", "squad", "royal", "chunk",
    "mince", "shame", "cheek", "ample", "flair", "foyer", "cargo", "oxide", "plant", "olive",
    "inert", "askew", "heist", "shown", "zesty", "hasty", "trash", "fella", "larva", "forgo",
    "story", "hairy", "train", "homer", "badge", "midst", "canny", "fetus", "butch", "farce",
    "slung", "tipsy", "metal", "yield", "delve", "being", "scour", "glass", "gamer", "scrap",
    "money", "hinge", "album", "vouch", "asset", "tiara", "crept", "bayou", "atoll", "manor",
    "creak", "showy", "phase", "froth", "depth", "gloom", "flood", "trait", "girth", "piety",
    "payer", "goose", "float", "donor", "atone", "primo", "apron", "blown", "cacao", "loser",
    "input", "gloat", "awful", "brink", "smite", "beady", "rusty", "retro", "droll", "gawky",
    "hutch", "pinto", "gaily", "egret", "lilac", "sever", "field", "fluff", "hydro", "flack",
    "agape", "voice", "stead", "stalk", "berth", "madam", "night", "bland", "liver", "wedge",
    "augur", "roomy", "wacky", "flock", "angry", "bobby", "trite", "aphid", "tryst", "midge",
    "power", "elope", "cinch", "motto", "stomp", "upset", "bluff", "cramp", "quart", "coyly",
    "youth", "rhyme", "buggy", "alien", "smear", "unfit", "patty", "cling", "glean", "label",
    "hunky", "khaki", "poker", "gruel", "twice", "twang", "shrug", "treat", "unlit", "waste",
    "merit", "woven", "octal", "needy", "clown", "widow", "irony", "ruder", "gauze", "chief",
    "onset", "prize", "fungi", "charm", "gully", "inter", "whoop", "taunt", "leery", "class",
    "theme", "lofty", "tibia", "booze", "alpha", "thyme", "eclat", "doubt", "parer", "chute",
    "stick", "trice", "alike", "sooth", "recap", "saint", "liege", "glory", "grate", "admit",
    "brisk", "soggy", "usurp", "scald", "scorn", "leave", "twine", "sting", "bough", "marsh",
    "sloth", "dandy", "vigor", "howdy", "enjoy", "valid", "ionic", "equal", "unset", "floor",
    "catch", "spade", "stein", "exist", "quirk", "denim", "grove", "spiel", "mummy", "fault",
    "foggy", "flout", "carry", "sneak", "libel", "waltz", "aptly", "piney", "inept", "aloud",
    "photo", "dream", "stale", "vomit", "ombre", "fanny", "unite", "snarl", "baker", "there",
    "glyph", "pooch", "hippy", "spell", "folly", "louse", "gulch", "vault", "godly", "threw",
    "fleet", "grave", "inane", "shock", "crave", "spite", "valve", "skimp", "claim", "rainy",
    "musty", "pique", "daddy", "quasi", "arise", "aging", "valet", "opium", "avert", "stuck",
    "recut", "mulch", "genre", "plume", "rifle", "count", "incur", "total", "wrest", "mocha",
    "deter", "study", "lover", "safer", "rivet", "funny", "smoke", "mound", "undue", "sedan",
    "pagan", "swine", "guile", "gusty", "equip", "tough", "canoe", "chaos", "covet", "human",
    "udder", "lunch", "blast", "stray", "manga", "melee", "lefty", "quick", "paste", "given",
    "octet", "risen", "groan", "leaky", "grind", "carve", "loose", "sadly", "spilt", "apple",
    "slack", "honey", "final", "sheen", "eerie", "minty", "slick", "derby", "wharf", "spelt",
    "coach", "erupt", "singe", "price", "spawn", "fairy", "jiffy", "filmy", "stack", "chose",
    "sleep", "ardor", "nanny", "niece", "woozy", "handy", "grace", "ditto", "stank", "cream",
    "usual", "diode", "valor", "angle", "ninja", "muddy", "chase", "reply", "prone", "spoil",
    "heart", "shade", "diner", "arson", "onion", "sleet", "dowel", "couch", "palsy", "bowel",
    "smile", "evoke", "creek", "lance", "eagle", "idiot", "siren", "built", "embed", "award",
    "dross", "annul", "goody", "frown", "patio", "laden", "humid", "elite", "lymph", "edify",
    "might", "reset", "visit", "gusto", "purse", "vapor", "crock", "write", "sunny", "loath",
    "chaff", "slide", "queer", "venom", "stamp", "sorry", "still", "acorn", "aping", "pushy",
    "tamer", "hater", "mania", "awoke", "brawn", "swift", "exile", "birch", "lucky", "freer",
    "risky", "ghost", "plier", "lunar", "winch", "snare", "nurse", "house", "borax", "nicer",
    "lurch", "exalt", "about", "savvy", "toxin", "tunic", "pried", "inlay", "chump", "lanky",
    "cress", "eater", "elude", "cycle", "kitty", "boule", "moron", "tenet", "place", "lobby",
    "plush", "vigil", "index", "blink", "clung", "qualm", "croup", "clink", "juicy", "stage",
    "decay", "nerve", "flier", "shaft", "crook", "clean", "china", "ridge", "vowel", "gnome",
    "snuck", "icing", "spiny", "rigor", "snail", "flown", "rabid", "prose", "thank", "poppy",
    "budge", "fiber", "moldy", "dowdy", "kneel", "track", "caddy", "quell", "dumpy", "paler",
    "swore", "rebar", "scuba", "splat", "flyer", "horny", "mason", "doing", "ozone", "amply",
    "molar", "ovary", "beset", "queue", "cliff", "magic", "truce", "sport", "fritz", "edict",
    "twirl", "verse", "llama", "eaten", "range", "whisk", "hovel", "rehab", "macaw", "sigma",
    "spout", "verve", "sushi", "dying", "fetid", "brain", "buddy", "thump", "scion", "candy",
    "chord", "basin", "march", "crowd", "arbor", "gayly", "musky", "stain", "dally", "bless",
    "bravo", "stung", "title", "ruler", "kiosk", "blond", "ennui", "layer", "fluid", "tatty",
    "score", "cutie", "zebra", "barge", "matey", "bluer", "aider", "shook", "river", "privy",
    "betel", "frisk", "bongo", "begun", "azure", "weave", "genie", "sound", "glove", "braid",
    "scope", "wryly", "rover", "assay", "ocean", "bloom", "irate", "later", "woken", "silky",
    "wreck", "dwelt", "slate", "smack", "solid", "amaze", "hazel", "wrist", "jolly", "globe",
    "flint", "rouse", "civil", "vista", "relax", "cover", "alive", "beech", "jetty", "bliss",
    "vocal", "often", "dolly", "eight", "joker", "since", "event", "ensue", "shunt", "diver",
    "poser", "worst", "sweep", "alley", "creed", "anime", "leafy", "bosom", "dunce", "stare",
    "pudgy", "waive", "choir", "stood", "spoke", "outgo", "delay", "bilge", "ideal", "clasp",
    "seize", "hotly", "laugh", "sieve", "block", "meant", "grape", "noose", "hardy", "shied",
    "drawl", "daisy", "putty", "strut", "burnt", "tulip", "crick", "idyll", "vixen", "furor",
    "geeky", "cough", "naive", "shoal", "stork", "bathe", "aunty", "check", "prime", "brass",
    "outer", "furry", "razor", "elect", "evict", "imply", "demur", "quota", "haven", "cavil",
    "swear", "crump", "dough", "gavel", "wagon", "salon", "nudge", "harem", "pitch", "sworn",
    "pupil", "excel", "stony", "cabin", "unzip", "queen", "trout", "polyp", "earth", "storm",
    "until", "taper", "enter", "child", "adopt", "minor", "fatty", "husky", "brave", "filet",
    "slime", "glint", "tread", "steal", "regal", "guest", "every", "murky", "share", "spore",
    "hoist", "buxom", "inner", "otter", "dimly", "level", "sumac", "donut", "stilt", "arena",
    "sheet", "scrub", "fancy", "slimy", "pearl", "silly", "porch", "dingo", "sepia", "amble",
    "shady", "bread", "friar", "reign", "dairy", "quill", "cross", "brood", "tuber", "shear",
    "posit", "blank", "villa", "shank", "piggy", "freak", "which", "among", "fecal", "shell",
    "would", "algae", "large", "rabbi", "agony", "amuse", "bushy", "copse", "swoon", "knife",
    "pouch", "ascot", "plane", "crown", "urban", "snide", "relay", "abide", "viola", "rajah",
    "straw", "dilly", "crash", "amass", "third", "trick", "tutor", "woody", "blurb", "grief",
    "disco", "where", "sassy", "beach", "sauna", "comic", "clued", "creep", "caste", "graze",
    "snuff", "frock", "gonad", "drunk", "prong", "lurid", "steel", "halve", "buyer", "vinyl",
    "utile", "smell", "adage", "worry", "tasty", "local", "trade", "finch", "ashen", "modal",
    "gaunt", "clove", "enact", "adorn", "roast", "speck", "sheik", "missy", "grunt", "snoop",
    "party", "touch", "mafia", "emcee", "array", "south", "vapid", "jelly", "skulk", "angst",
    "tubal", "lower", "crest", "sweat", "cyber", "adore", "tardy", "swami", "notch", "groom",
    "roach", "hitch", "young", "align", "ready", "frond", "strap", "puree", "realm", "venue",
    "swarm", "offer", "seven", "dryer", "diary", "dryly", "drank", "acrid", "heady", "theta",
    "junto", "pixie", "quoth", "bonus", "shalt", "penne", "amend", "datum", "build", "piano",
    "shelf", "lodge", "suing", "rearm", "coral", "ramen", "worth", "psalm", "infer", "overt",
    "mayor", "ovoid", "glide", "usage", "poise", "randy", "chuck", "prank", "fishy", "tooth",
    "ether", "drove", "idler", "swath", "stint", "while", "begat", "apply", "slang", "tarot",
    "radar", "credo", "aware", "canon", "shift", "timer", "bylaw", "serum", "three", "steak",
    "iliac", "shirk", "blunt", "puppy", "penal", "joist", "bunny", "shape", "beget", "wheel",
    "adept", "stunt", "stole", "topaz", "chore", "fluke", "afoot", "bloat", "bully", "dense",
    "caper", "sneer", "boxer", "jumbo", "lunge", "space", "avail", "short", "slurp", "loyal",
    "flirt", "pizza", "conch", "tempo", "droop", "plate", "bible", "plunk", "afoul", "savoy",
    "steep", "agile", "stake", "dwell", "knave", "beard", "arose", "motif", "smash", "broil",
    "glare", "shove", "baggy", "mammy", "swamp", "along", "rugby", "wager", "quack", "squat",
    "snaky", "debit", "mange", "skate", "ninth", "joust", "tramp", "spurn", "medal", "micro",
    "rebel", "flank", "learn", "nadir", "maple", "comfy", "remit", "gruff", "ester", "least",
    "mogul", "fetch", "cause", "oaken", "aglow", "meaty", "gaffe", "shyly", "racer", "prowl",
    "thief", "stern", "poesy", "rocky", "tweet", "waist", "spire", "grope", "havoc", "patsy",
    "truly", "forty", "deity", "uncle", "swish", "giver", "preen", "bevel", "lemur", "draft",
    "slope", "annoy", "lingo", "bleak", "ditty", "curly", "cedar", "dirge", "grown", "horde",
    "drool", "shuck", "crypt", "cumin", "stock", "gravy", "locus", "wider", "breed", "quite",
    "chafe", "cache", "blimp", "deign", "fiend", "logic", "cheap", "elide", "rigid", "false",
    "renal", "pence", "rowdy", "shoot", "blaze", "envoy", "posse", "brief", "never", "abort",
    "mouse", "mucky", "sulky", "fiery", "media", "trunk", "yeast", "clear", "skunk", "scalp",
    "bitty", "cider", "koala", "duvet", "segue", "creme", "super", "grill", "after", "owner",
    "ember", "reach", "nobly", "empty", "speed", "gipsy", "recur", "smock", "dread", "merge",
    "burst", "kappa", "amity", "shaky", "hover", "carol", "snort", "synod", "faint", "haunt",
    "flour", "chair", "detox", "shrew", "tense", "plied", "quark", "burly", "novel", "waxen",
    "stoic", "jerky", "blitz", "beefy", "lyric", "hussy", "towel", "quilt", "below", "bingo",
    "wispy", "brash", "scone", "toast", "easel", "saucy", "value", "spice", "honor", "route",
    "sharp", "bawdy", "radii", "skull", "phony", "issue", "lager", "swell", "urine", "gassy",
    "trial", "flora", "upper", "latch", "wight", "brick", "retry", "holly", "decal", "grass",
    "shack", "dogma", "mover", "defer", "sober", "optic", "crier", "vying", "nomad", "flute",
    "hippo", "shark", "drier", "obese", "bugle", "tawny", "chalk", "feast", "ruddy", "pedal",
    "scarf", "cruel", "bleat", "tidal", "slush", "semen", "windy", "dusty", "sally", "igloo",
    "nerdy", "jewel", "shone", "whale", "hymen", "abuse", "fugue", "elbow", "crumb", "pansy",
    "welsh", "syrup", "terse", "suave", "gamut", "swung", "drake", "freed", "afire", "shirt",
    "grout", "oddly", "tithe", "plaid", "dummy", "broom", "blind", "torch", "enemy", "again",
    "tying", "pesky", "alter", "gazer", "noble", "ethos", "bride", "extol", "decor", "hobby",
    "beast", "idiom", "utter", "these", "sixth", "alarm", "erase", "elegy", "spunk", "piper",
    "scaly", "scold", "hefty", "chick", "sooty", "canal", "whiny", "slash", "quake", "joint",
    "swept", "prude", "heavy", "wield", "femme", "lasso", "maize", "shale", "screw", "spree",
    "smoky", "whiff", "scent", "glade", "spent", "prism", "stoke", "riper", "orbit", "cocoa",
    "guilt", "humus", "shush", "table", "smirk", "wrong", "noisy", "alert", "shiny", "elate",
    "resin", "whole", "hunch", "pixel", "polar", "hotel", "sword", "cleat", "mango", "rumba",
    "puffy", "filly", "billy", "leash", "clout", "dance", "ovate", "facet", "chili", "paint",
    "liner", "curio", "salty", "audio", "snake", "fable", "cloak", "navel", "spurt", "pesto",
    "balmy", "flash", "unwed", "early", "churn", "weedy", "stump", "lease", "witty", "wimpy",
    "spoof", "saner", "blend", "salsa", "thick", "warty", "manic", "blare", "squib", "spoon",
    "probe", "crepe", "knack", "force", "debut", "order", "haste", "teeth", "agent", "widen",
    "icily", "slice", "ingot", "clash", "juror", "blood", "abode", "throw", "unity", "pivot",
    "slept", "troop", "spare", "sewer", "parse", "morph", "cacti", "tacky", "spool", "demon",
    "moody", "annex", "begin", "fuzzy", "patch", "water", "lumpy", "admin", "omega", "limit",
    "tabby", "macho", "aisle", "skiff", "basis", "plank", "verge", "botch", "crawl", "lousy",
    "slain", "cubic", "raise", "wrack", "guide", "foist", "cameo", "under", "actor", "revue",
    "fraud", "harpy", "scoop", "climb", "refer", "olden", "clerk", "debar", "tally", "ethic",
    "cairn", "tulle", "ghoul", "hilly", "crude", "apart", "scale", "older", "plain", "sperm",
    "briny", "abbot", "rerun", "quest", "crisp", "bound", "befit", "drawn", "suite", "itchy",
    "cheer", "bagel", "guess", "broad", "axiom", "chard", "caput", "leant", "harsh", "curse",
    "proud", "swing", "opine", "taste", "lupus", "gumbo", "miner", "green", "chasm", "lipid",
    "topic", "armor", "brush", "crane", "mural", "abled", "habit", "bossy", "maker", "dusky",
    "dizzy", "lithe", "brook", "jazzy", "fifty", "sense", "giant", "surly", "legal", "fatal",
    "flunk", "began", "prune", "small", "slant", "scoff", "torus", "ninny", "covey", "viper",
    "taken", "moral", "vogue", "owing", "token", "entry", "booth", "voter", "chide", "elfin",
    "ebony", "neigh", "minim", "melon", "kneed", "decoy", "voila", "ankle", "arrow", "mushy",
    "tribe", "cease", "eager", "birth", "graph", "odder", "terra", "weird", "tried", "clack",
    "color", "rough", "weigh", "uncut", "ladle", "strip", "craft", "minus", "dicey", "titan",
    "lucid", "vicar", "dress", "ditch", "gypsy", "pasta", "taffy", "flame", "swoop", "aloof",
    "sight", "broke", "teary", "chart", "sixty", "wordy", "sheer", "leper", "nosey", "bulge",
    "savor", "clamp", "funky", "foamy", "toxic", "brand", "plumb", "dingy", "butte", "drill",
    "tripe", "bicep", "tenor", "krill", "worse", "drama", "hyena", "think", "ratio", "cobra",
    "basil", "scrum", "bused", "phone", "court", "camel", "proof", "heard", "angel", "petal",
    "pouty", "throb", "maybe", "fetal", "sprig", "spine", "shout", "cadet", "macro", "dodgy",
    "satyr", "rarer", "binge", "trend", "nutty", "leapt", "amiss", "split", "myrrh", "width",
    "sonar", "tower", "baron", "fever", "waver", "spark", "belie", "sloop", "expel", "smote",
    "baler", "above", "north", "wafer", "scant", "frill", "awash", "snack", "scowl", "frail",
    "drift", "limbo", "fence", "motel", "ounce", "wreak", "revel", "talon", "prior", "knelt",
    "cello", "flake", "debug", "anode", "crime", "salve", "scout", "imbue", "pinky", "stave",
    "vague", "chock", "fight", "video", "stone", "teach", "cleft", "frost", "prawn", "booty",
    "twist", "apnea", "stiff", "plaza", "ledge", "tweak", "board", "grant", "medic", "bacon",
    "cable", "brawl", "slunk", "raspy", "forum", "drone", "women", "mucus", "boast", "toddy",
    "coven", "tumor", "truer", "wrath", "stall", "steam", "axial", "purer", "daily", "trail",
    "niche", "mealy", "juice", "nylon", "plump", "merry", "flail", "papal", "wheat", "berry",
    "cower", "erect", "brute", "leggy", "snipe", "sinew", "skier", "penny", "jumpy", "rally",
    "umbra", "scary", "modem", "gross", "avian", "greed", "satin", "tonic", "parka", "sniff",
    "livid", "stark", "trump", "giddy", "reuse", "taboo", "avoid", "quote", "devil", "liken",
    "gloss", "gayer", "beret", "noise", "gland", "dealt", "sling", "rumor", "opera", "thigh",
    "tonga", "flare", "wound", "white", "bulky", "etude", "horse", "circa", "paddy", "inbox",
    "fizzy", "grain", "exert", "surge", "gleam", "belle", "salvo", "crush", "fruit", "sappy",
    "taker", "tract", "ovine", "spiky", "frank", "reedy", "filth", "spasm", "heave", "mambo",
    "right", "clank", "trust", "lumen", "borne", "spook", "sauce", "amber", "lathe", "carat",
    "corer", "dirty", "slyly", "affix", "alloy", "taint", "sheep", "kinky", "wooly", "mauve",
    "flung", "yacht", "fried", "quail", "brunt", "grimy", "curvy", "cagey", "rinse", "deuce",
    "state", "grasp", "milky", "bison", "graft", "sandy", "baste", "flask", "hedge", "girly",
    "swash", "boney", "coupe", "endow", "abhor", "welch", "blade", "tight", "geese", "miser",
    "mirth", "cloud", "cabal", "leech", "close", "tenth", "pecan", "droit", "grail", "clone",
    "guise", "ralph", "tango", "biddy", "smith", "mower", "payee", "serif", "drape", "fifth",
    "spank", "glaze", "allot", "truck", "kayak", "virus", "testy", "tepee", "fully", "zonal",
    "metro", "curry", "grand", "banjo", "axion", "bezel", "occur", "chain", "nasal", "gooey",
    "filer", "brace", "allay", "pubic", "raven", "plead", "gnash", "flaky", "munch", "dully",
    "eking", "thing", "slink", "hurry", "theft", "shorn", "pygmy", "ranch", "wring", "lemon",
    "shore", "mamma", "froze", "newer", "style", "moose", "antic", "drown", "vegan", "chess",
    "guppy", "union", "lever", "lorry", "image", "cabby", "druid", "exact", "truth", "dopey",
    "spear", "cried", "chime", "crony", "stunk", "timid", "batch", "gauge", "rotor", "crack",
    "curve", "latte", "witch", "bunch", "repel", "anvil", "soapy", "meter", "broth", "madly",
    "dried", "scene", "known", "magma", "roost", "woman", "thong", "punch", "pasty", "downy",
    "knead", "whirl", "rapid", "clang", "anger", "drive", "goofy", "email", "music", "stuff",
    "bleep", "rider", "mecca", "folio", "setup", "verso", "quash", "fauna", "gummy", "happy",
    "newly", "fussy", "relic", "guava", "ratty", "fudge", "femur", "chirp", "forte", "alibi",
    "whine", "petty", "golly", "plait", "fleck", "felon", "gourd", "brown", "thrum", "ficus",
    "stash", "decry", "wiser", "junta", "visor", "daunt", "scree", "impel", "await", "press",
    "whose", "turbo", "stoop", "speak", "mangy", "eying", "inlet", "crone", "pulse", "mossy",
    "staid", "hence", "pinch", "teddy", "sully", "snore", "ripen", "snowy", "attic", "going",
    "leach", "mouth", "hound", "clump", "tonal", "bigot", "peril", "piece", "blame", "haute",
    "spied", "undid", "intro", "basal", "shine", "gecko", "rodeo", "guard", "steer", "loamy",
    "scamp", "scram", "manly", "hello", "vaunt", "organ", "feral", "knock", "extra", "condo",
    "adapt", "willy", "polka", "rayon", "skirt", "faith", "torso", "match", "mercy", "tepid",
    "sleek", "riser", "twixt", "peace", "flush", "catty", "login", "eject", "roger", "rival",
    "untie", "refit", "aorta", "adult", "judge", "rower", "artsy", "rural", "shave",
  ],
  word: null,
  fetchWord: async function() {
    // fetch from api
    // const apiURL = `http://localhost:2004/`;
    // await fetch(apiURL)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         this.word = data.word;
    //         this.words = data.words;
    //     });
    this.word = this.words[Math.floor(Math.random() * this.words.length)];
  },
  guesses: {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  },
  currentTry: 1,
  maxTries: 6,
  isGameEnd: false,
  win: false,
};

// Fetch the random word if it's not already generated
(async () => {
  !game.word ? await game.fetchWord() : null;
})();

/**
 * Generate a game popup & show it on game popup container
 *
 * @param {String} message - Error message
 */
const gamePopup = (message) => {
  messageContainer.textContent = message || "There have a message for you!.";
  showOverlay(messageOverlayContent);
};

/**
 * Print a word on a game cell
 *
 * @param {String} key - The key value
 */
const type = (key) => {
  game.guesses[game.currentTry].push(key);
  for (let i = game.currentTry * 5 - 4; i <= game.currentTry * 5; i++) {
    const currentCell = document.querySelector(`.game-cell-${i} h2`);
    currentCell.textContent =
      game.guesses[game.currentTry][i - (game.currentTry - 1) * 5 - 1];
  }
};

/**
 * Remove a word from right on game cell
 */
const remove = () => {
  game.guesses[game.currentTry].pop();
  for (let i = game.currentTry * 5 - 4; i <= game.currentTry * 5; i++) {
    const currentCell = document.querySelector(`.game-cell-${i} h2`);
    currentCell.textContent =
      game.guesses[game.currentTry][i - (game.currentTry - 1) * 5 - 1];
  }
};

/**
 * Submit a word against a try
 *
 * @param {String} text - The full word that will be submitted
 */
const submit = (text) => {
  if (wordExists(text)) {
    const rightCells = [];
    const wrongSpotCells = [];
    const wrongCells = [];
    // TODO: Highlight right/wrong/wrong spot letters on the screen keyboard
    const rightLetters = [];
    const wrongLetters = [];
    const wrongSpotLetters = [];

    const answer = game.word.split("");
    const guess = text.split("");
    const cellResults = new Array(5).fill("wrong");

    // First pass: mark greens (correct position)
    const remainingAnswer = [...answer];
    for (let i = 0; i < 5; i++) {
      if (guess[i] === answer[i]) {
        cellResults[i] = "right";
        remainingAnswer[i] = null;
      }
    }

    // Second pass: mark yellows (wrong position, letter exists)
    if (!game.hardMode) {
      for (let i = 0; i < 5; i++) {
        if (cellResults[i] === "right") continue;
        const idx = remainingAnswer.indexOf(guess[i]);
        if (idx > -1) {
          cellResults[i] = "wrongSpot";
          remainingAnswer[idx] = null;
        }
      }
    }

    // Populate cell arrays
    for (let i = 0; i < 5; i++) {
      const cell = document.querySelector(
        `.game-cell-${5 * game.currentTry - (5 - (i + 1))} h2`
      );
      if (cellResults[i] === "right") {
        rightCells.push(cell);
        rightLetters.push(cell.textContent);
      } else if (cellResults[i] === "wrongSpot") {
        wrongSpotCells.push(cell);
        wrongSpotLetters.push(cell.textContent);
      } else {
        wrongCells.push(cell);
        wrongLetters.push(cell.textContent);
      }
    }

    rightCells.forEach((cell) => {
      cell.parentElement.classList.add("bg-primary");
      cell.classList.remove("dark:text-white");
      cell.classList.add("text-black", "dark:text-black");
    });

    wrongSpotCells.forEach((cell) => {
      cell.parentElement.classList.add("bg-yellow");
      cell.classList.remove("dark:text-white");
      cell.classList.add("text-black", "dark:text-black");
    });

    wrongCells.forEach((cell) => {
      if (!wrongSpotCells.includes(cell)) {
        cell.parentElement.classList.add("bg-red");
      }
    });

    rightLetters.forEach((letter) => {
      const selector = document.querySelector(`[data-key = "${letter}"]`);
      selector.className = "keyboard-key bg-primary text-black";
    });

    wrongSpotLetters.forEach((letter) => {
      const selector = document.querySelector(`[data-key = "${letter}"]`);
      selector.className = "keyboard-key bg-yellow text-black";
    });

    wrongLetters.forEach((letter) => {
      if (!wrongSpotLetters.includes(letter)) {
        const selector = document.querySelector(
          `[data-key = "${letter}"]`
        );
        selector.className = "keyboard-key bg-red text-black";
      }
    });

    if (
      rightCells.length === 5 &&
      wrongCells.length === 0 &&
      wrongSpotCells.length === 0
    ) {
      // all cells is rigth / user guessed the right word
      game.isGameEnd = true;
      game.win = true;
      gamePopup(
        `Great Job Children! Your next clue is: bloom`
      );
    } else if (game.currentTry < game.maxTries) {
      // user cannot guess the right word but user have more tries
      game.currentTry++;
      game.isGameEnd = !Boolean(game.currentTry <= game.maxTries);
    } else {
      // User cannot guess the right word within maximum tries
      game.isGameEnd = true;
      gamePopup(
        `You cannot guess the correct word. The word is: ${game.word}.`
      );
    }
  } else {
    gamePopup("Not in word list.");
  }
};

/**
 * Switch hard mode on or off
 *
 * @param {Boolean} hardMode - Indicate that if hard mode is enabled or not
 */
const switchDifficulty = (hardMode) => {
  hardMode = typeof hardMode === "boolean" ? hardMode : !game.hardMode;

  if (hardMode) {
    hardModeSwitch.querySelector(".knob").classList.add("switch-active");
  } else {
    hardModeSwitch.querySelector(".knob").classList.remove("switch-active");
  }
  game.hardMode = hardModeSwitch.querySelector(".knob").dataset.hardmode =
    hardModeSwitch
      .querySelector(".knob")
      .classList.contains("switch-active");
  localStorage.setItem("wordle-hardMode", JSON.stringify(game.hardMode));
};

/**
 * Switch the current theme to dark or light
 *
 * @param {Boolean} darkMode - Indicate that dark mode is enabled or not
 */
const switchTheme = (darkMode) => {
  darkMode = typeof darkMode === "boolean" ? darkMode : !game.darkMode;

  if (darkMode) {
    document.querySelector("html").classList.remove("light");
    document.querySelector("html").classList.add("dark");
    darkModeSwitch.querySelector(".knob").classList.add("switch-active");
  } else {
    document.querySelector("html").classList.remove("dark");
    document.querySelector("html").classList.add("light");
    darkModeSwitch.querySelector(".knob").classList.remove("switch-active");
  }
  game.darkMode = darkModeSwitch.querySelector(".knob").dataset.darkmode =
    darkModeSwitch
      .querySelector(".knob")
      .classList.contains("switch-active");
  localStorage.setItem("wordle-darkMode", JSON.stringify(game.darkMode));
};

/**
 * Show the overlay section
 *
 * @param {HTMLElement} contentId - The corresponding content element on overlay
 */
const showOverlay = (contentId) => {
  if (!gameSection.classList.contains("game-section-disable")) {
    gameSection.classList.add("game-section-disable");
  }
  if (
    overlayCrossButton
      .closest("#overlay")
      .classList.contains("overlay-disable")
  ) {
    overlayCrossButton
      .closest("#overlay")
      .classList.remove("overlay-disable");
  }
  [...overlayCrossButton.closest("#overlay").children].forEach(
    (content, index) => {
      if (content === contentId) {
        content.style.display = "inherit";
      } else if (index !== 0) {
        content.style.display = "none";
      }
    }
  );
};

/**
 * Hide the overlay section
 *
 * @param {HTMLElement} contentId - The corresponding content element on overlay
 */
const hideOverlay = (contentId) => {
  if (gameSection.classList.contains("game-section-disable")) {
    gameSection.classList.remove("game-section-disable");
  }
  if (
    !overlayCrossButton
      .closest("#overlay")
      .classList.contains("overlay-disable")
  ) {
    overlayCrossButton.closest("#overlay").classList.add("overlay-disable");
  }
  [...overlayCrossButton.closest("#overlay").children].forEach(
    (content, index) => {
      if (index !== 0) {
        content.style.display = "none";
      }
    }
  );
};

// add listener for rules button
rulesButton.addEventListener(
  "click",
  showOverlay.bind(this, helpOverlayContent)
);

// add listener for overlay cross button
overlayCrossButton.addEventListener(
  "click",
  hideOverlay.bind(this, helpOverlayContent)
);

// add listener for settings button
settingsButton.addEventListener(
  "click",
  showOverlay.bind(this, settingsOverlayContent)
);

// add listener for overlay cross buttion
overlayCrossButton.addEventListener(
  "click",
  hideOverlay.bind(this, settingsOverlayContent)
);

// Help overlay disabled - kids know how to play

// set the theme & difficulty according to localstorage value
switchDifficulty(game.hardMode);
switchTheme(game.darkMode);

hardModeSwitch.addEventListener("click", switchDifficulty);
darkModeSwitch.addEventListener("click", switchTheme);

// Interact if user type any key from external keyboard
window.addEventListener("keydown", (e) => {
  if (!e.ctrlKey && !e.altKey) {
    if (!game.isGameEnd && !game.win) {
      // if pressed key is a letter
      if (
        (e.keyCode >= 65 && e.keyCode <= 90) ||
        (e.keyCode >= 97 && e.keyCode <= 122)
      ) {
        if (game.guesses[game.currentTry].length < 5) {
          type(e.key.toString().toLowerCase());
        } else {
          gamePopup("Please press enter to submit this word.");
        }
      } else if (e.keyCode === 8) {
        // if pressed key is Backspace
        if (game.guesses[game.currentTry].length >= 1) {
          remove();
        } else {
          // ignore
        }
      } else if (e.keyCode === 13) {
        // if pressed key is Enter
        if (game.guesses[game.currentTry].length === 5) {
          submit(game.guesses[game.currentTry].join(""));
        } else {
          // ignore - not enough letters
        }
      }
    } else if (game.isGameEnd && game.currentTry <= game.maxTries) {
      if (game.win) {
        gamePopup(
          `You can guess the word within ${game.currentTry} tries. Refresh the page to play again.`
        );
      } else {
        gamePopup(
          `You cannot guess the correct word. The word is: ${game.word}.`
        );
      }
    } else {
      gamePopup(
        "You exceed your maximum tries. Please refresh the page to play again."
      );
    }
  }
});

// Interact if the user type any key from the screen keyboard
document.querySelectorAll(".keyboard-row").forEach((row) => {
  row.querySelectorAll("button").forEach((key) => {
    key.addEventListener("click", (e) => {
      if (!e.ctrlKey && !e.altKey) {
        if (!game.isGameEnd && !game.win) {
          // if pressed key is a letter
          if (
            (parseInt(e.target.dataset.keycode) >= 65 &&
              parseInt(e.target.dataset.keycode) <= 90) ||
            (parseInt(e.target.dataset.keycode) >= 97 &&
              parseInt(e.target.dataset.keycode) <= 122)
          ) {
            if (game.guesses[game.currentTry].length < 5) {
              type(e.target.dataset.key.toString().toLowerCase());
            } else {
              gamePopup(
                "Please press enter to submit this word."
              );
            }
          } else if (parseInt(e.target.dataset.keycode) === 8) {
            // if pressed key is Backspace
            if (game.guesses[game.currentTry].length >= 1) {
              remove();
            } else {
              // ignore
            }
          } else if (parseInt(e.target.dataset.keycode) === 13) {
            // if pressed key is Enter
            if (game.guesses[game.currentTry].length === 5) {
              submit(game.guesses[game.currentTry].join(""));
            } else {
              // ignore - not enough letters
            }
          }
        } else if (game.isGameEnd && game.currentTry <= game.maxTries) {
          if (game.win) {
            gamePopup(
              `You can guess the word within ${game.currentTry} tries. Refresh the page to play again.`
            );
          } else {
            gamePopup(
              `You cannot guess the correct word. The word is: ${game.word}.`
            );
          }
        } else {
          gamePopup(
            "You exceed your maximum tries. Please refresh the page to play again."
          );
        }
      }
    });
  });
});
