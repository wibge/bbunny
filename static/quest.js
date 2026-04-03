const form = document.getElementById('guess-form');
const input = document.getElementById('word-input');
const resultArea = document.getElementById('result-area');
const wordList = document.getElementById('word-list');

let triedWords = [];
let correctWords = [];

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const word = input.value.trim();
    if (!word) return;

    input.value = '';

    if (word.toLowerCase() === 'clear') {
        await fetch('/api/reset', { method: 'POST' });
        triedWords = [];
        correctWords = [];
        resultArea.classList.add('hidden');
        renderWordLog();
        input.focus();
        return;
    }

    await submitWord(word);
    input.focus();
});

async function submitWord(word) {
    const res = await fetch('/api/guess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word }),
    });
    const data = await res.json();

    triedWords = data.tried_words || triedWords;
    correctWords = data.correct_words || correctWords;

    if (data.match) {
        showContent(data.entry);
    } else {
        showMiss(word);
    }

    renderWordLog();
}

function showContent(entry) {
    resultArea.classList.remove('hidden');
    resultArea.classList.remove('miss');
    resultArea.classList.add('hit');

    let html = entry.type !== 'game' ? `<h2 class="result-title">${entry.title}</h2>` : '';

    if (entry.type === 'riddle') {
        html += `<div class="riddle-content">${entry.content}</div>`;
    } else if (entry.type === 'photo') {
        html += `<img class="photo-content" src="/static/img/${entry.content}" alt="${entry.title}">`;
    } else if (entry.type === 'game') {
        html += `<iframe class="game-frame" src="/static/games/${entry.content}/index.html" sandbox="allow-scripts allow-same-origin allow-modals"></iframe>`;
    }

    if (entry.hint) {
        html += `<p class="hint">${entry.hint}</p>`;
    }

    resultArea.innerHTML = html;

    const container = document.querySelector('.container');
    if (entry.type === 'game') {
        container.classList.add('game-active');
    } else {
        container.classList.remove('game-active');
    }
}

function showMiss(word) {
    resultArea.classList.remove('hidden', 'hit');
    resultArea.classList.add('miss');
    resultArea.innerHTML = `<p class="miss-text">Hmm, "<strong>${escapeHtml(word)}</strong>" isn't a password. Try again!</p>`;
}

function renderWordLog() {
    if (triedWords.length === 0) {
        wordList.innerHTML = '<p class="empty-state">No words tried yet. Start guessing!</p>';
        return;
    }

    wordList.innerHTML = triedWords.map(word => {
        const cls = correctWords.includes(word) ? 'word-chip correct' : 'word-chip';
        return `<span class="${cls}" data-word="${escapeHtml(word)}">${escapeHtml(word)}</span>`;
    }).join('');

    wordList.querySelectorAll('.word-chip').forEach(chip => {
        chip.addEventListener('click', () => submitWord(chip.dataset.word));
    });
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Load progress on page load
(async () => {
    const res = await fetch('/api/progress');
    const data = await res.json();
    triedWords = data.tried_words || [];
    correctWords = data.correct_words || [];
    renderWordLog();
})();
