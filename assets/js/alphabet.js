let alphabetData = [];
let currentWordIndex = 0;
let correctCount = 0;
let incorrectCount = 0;

function displayNextAlphabetWord() {
    const wordElement = document.getElementById('alphabet-word');
    wordElement.textContent = alphabetData[currentWordIndex].word_kr;
}

function updateScore() {
    document.getElementById('correct-count').textContent = correctCount;
    document.getElementById('incorrect-count').textContent = incorrectCount;
}

function checkAlphabetAnswer() {
    const inputElement = document.getElementById('alphabet-input');
    const feedbackElement = document.getElementById('alphabet-feedback');
    const userAnswer = inputElement.value.trim().toLocaleUpperCase('tr-TR');

    if (userAnswer === alphabetData[currentWordIndex].word_tr) {
        feedbackElement.textContent = "Doğru cevap!";
        correctCount++;
        currentWordIndex = (currentWordIndex + 1) % alphabetData.length;
        displayNextAlphabetWord();
    } else {
        feedbackElement.textContent = "Yanlış cevap! Tekrar deneyin.";
        incorrectCount++;
    }

    updateScore();
    inputElement.value = '';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadAlphabetData() {
    fetch('https://raw.githubusercontent.com/kaansrflioglu/korean-practices/refs/heads/main/data/alphabet.json')
        .then(response => response.json())
        .then(data => {
            alphabetData = shuffleArray(data); 
            displayNextAlphabetWord();
        })
        .catch(error => console.error('Veri yüklenirken hata oluştu:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    loadAlphabetData();

    const inputElement = document.getElementById('alphabet-input');
    inputElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            checkAlphabetAnswer();
        }
    });

    inputElement.addEventListener('input', () => {
        inputElement.value = inputElement.value.toLocaleUpperCase('tr-TR');
    });
});