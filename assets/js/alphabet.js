let alphabetData = [];
let currentWordIndex = 0;

function displayNextAlphabetWord() {
    const wordElement = document.getElementById('alphabet-word');
    wordElement.textContent = alphabetData[currentWordIndex].word_kr;
}

function checkAlphabetAnswer() {
    const inputElement = document.getElementById('alphabet-input');
    const feedbackElement = document.getElementById('alphabet-feedback');
    const userAnswer = inputElement.value.trim().toUpperCase();

    if (userAnswer === alphabetData[currentWordIndex].word_tr) {
        feedbackElement.textContent = "Doğru cevap!";
        currentWordIndex = (currentWordIndex + 1) % alphabetData.length;
        displayNextAlphabetWord();
    } else {
        feedbackElement.textContent = "Yanlış cevap! Tekrar deneyin.";
    }

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
    fetch('../data/alphabet.json')
    //fetch('korean-practices/data/alphabet.json')
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
});