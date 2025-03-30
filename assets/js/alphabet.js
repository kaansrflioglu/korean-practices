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


function checkAlphabetAnswer() {
    const inputElement = document.getElementById('alphabet-input');
    const userAnswer = inputElement.value.trim().toLocaleUpperCase('tr-TR');

    if (userAnswer === alphabetData[currentWordIndex].word_tr) {
        correctCount++;
        currentWordIndex = (currentWordIndex + 1) % alphabetData.length;
        displayNextAlphabetWord();
        showFlashNotification("Doğru cevap!", false); 
    } else {
        incorrectCount++;
        showFlashNotification("Yanlış cevap! Tekrar deneyin.", true); 
    }

    updateScore();
    inputElement.value = '';
}

function showFlashNotification(message, isError = false) {
    let container = document.getElementById('flash-notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'flash-notification-container';
        document.body.appendChild(container);
    }

    const notificationElement = document.createElement('div');
    notificationElement.id = 'flash-notification';
    notificationElement.classList.add(isError ? 'error' : 'success'); 

    const contentElement = document.createElement('div');
    contentElement.classList.add('content');

    const iconElement = document.createElement('i');
    iconElement.classList.add('fa-solid');
    if (isError) {
        iconElement.classList.add('fa-circle-exclamation');
        iconElement.style.color = '#E74D3C'; 
    } else {
        iconElement.classList.add('fa-circle-check'); 
        iconElement.style.color = '#07BC0C';
    }

    iconElement.style.fontSize = '22px';
    iconElement.style.marginRight = '10px';

    contentElement.appendChild(iconElement);

    const messageElement = document.createElement('span');
    messageElement.textContent = message;
    contentElement.appendChild(messageElement);

    notificationElement.appendChild(contentElement);

    const closeButton = document.createElement('span');
    closeButton.classList.add('close-btn');
    closeButton.textContent = '×';
    closeButton.onclick = () => {
        notificationElement.style.display = 'none';
        container.removeChild(notificationElement); 
    };
    notificationElement.appendChild(closeButton);

    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    const progressSpan = document.createElement('span');
    progressBar.appendChild(progressSpan);
    notificationElement.appendChild(progressBar);

    container.prepend(notificationElement);  

    notificationElement.style.display = 'block';

    setTimeout(() => {
        notificationElement.classList.add('show-scrollbar'); 
    }, 500); 

    const duration = 3000;
    let elapsedTime = 0;

    const interval = setInterval(() => {
        elapsedTime += 100;
        const percentage = (elapsedTime / duration) * 100;
        progressSpan.style.width = `${100 - percentage}%`;

        if (elapsedTime >= duration) {
            clearInterval(interval);
            notificationElement.style.display = 'none';
            container.removeChild(notificationElement); 
        }
    }, 100);
}

document.querySelector('.open-popup').addEventListener('click', function(event) {
    event.preventDefault(); 
    document.getElementById('popup').style.display = 'block';
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('popup')) {
        document.getElementById('popup').style.display = 'none';
    }
});