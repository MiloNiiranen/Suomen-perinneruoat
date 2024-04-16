document.addEventListener('DOMContentLoaded', function() {
    const correctCount = sessionStorage.getItem('correctCount');
    const resultContainer = document.querySelector('.container');

    if (correctCount !== null) {
        resultContainer.innerHTML = `<h1>Sait ${correctCount}/10 kysymyksestä oikein!</h1><h1>Kiitos pelaamisesta</h1><button id="restart-Button">Aloita alusta</button>`;
    } else {
        resultContainer.innerHTML = `<h1>Tulosta ei löytynyt</h1><button id="restart-Button">Aloita alusta</button>`;
    }

    const restartButton = document.getElementById('restart-Button');

    restartButton.addEventListener('click', function() {
        window.location.href = '../index.html';
    });
});