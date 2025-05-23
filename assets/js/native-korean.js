let numberData = [];
let currentNumberIndex = 0;
let numberCorrectCount = 0;
let numberIncorrectCount = 0;

function displayNextNumberWord() {
    const wordElement = document.getElementById('number-word');
    wordElement.textContent = numberData[currentNumberIndex].num_kr;
}

function updateNumberScore() {
    document.getElementById('number-correct-count').textContent = numberCorrectCount;
    document.getElementById('number-incorrect-count').textContent = numberIncorrectCount;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadNumberData() {
    fetch('https://raw.githubusercontent.com/kaansrflioglu/korean-practices/refs/heads/main/data/native-korean-numbers.json')
        .then(response => response.json())
        .then(data => {
            numberData = shuffleArray(data);
            displayNextNumberWord();
        })
        .catch(error => console.error('Veri yüklenirken hata oluştu:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    loadNumberData();

    const inputElement = document.getElementById('number-input');
    inputElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            checkNumberAnswer();
        }
    });
});

function checkNumberAnswer() {
    const inputElement = document.getElementById('number-input');
    const userAnswer = inputElement.value.trim();

    if (userAnswer === numberData[currentNumberIndex].num) {
        numberCorrectCount++;
        currentNumberIndex = (currentNumberIndex + 1) % numberData.length;
        displayNextNumberWord();
        showFlashNotification("Doğru cevap!", false);
    } else if (userAnswer === "") {
        showFlashNotification("Cevap boş olamaz!", false, "info"); 
    } else {
        numberIncorrectCount++;
        showFlashNotification("Yanlış cevap! Tekrar deneyin.", true);
    }

    updateNumberScore();
    inputElement.value = '';
}

function showFlashNotification(message, isError = false, type = 'success') {
    let container = document.getElementById('flash-notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'flash-notification-container';
        document.body.appendChild(container);
    }

    const notificationElement = document.createElement('div');
    notificationElement.id = 'flash-notification';
    
    let notificationClass = '';
    let iconClass = '';
    let iconColor = '';
    
    if (isError) {
        notificationClass = 'error';
        iconClass = 'fa-circle-exclamation';
        iconColor = '#E74D3C'; 
    } else if (type === 'info') {
        notificationClass = 'info';
        iconClass = 'fa-circle-info';
        iconColor = '#E4A11B';  
    } else {
        notificationClass = 'success';
        iconClass = 'fa-circle-check'; 
        iconColor = '#07BC0C';
    }

    notificationElement.classList.add(notificationClass);

    const contentElement = document.createElement('div');
    contentElement.classList.add('content');

    const iconElement = document.createElement('i');
    iconElement.classList.add('fa-solid', iconClass);
    iconElement.style.color = iconColor;

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