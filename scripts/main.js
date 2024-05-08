document.addEventListener('DOMContentLoaded', function() {

    // Sivut
    const pages = [
        document.getElementById("start-page"),
        document.getElementById("instructions-page"),
        document.getElementById("karjalanpiirakka-page"),
        document.getElementById("mämmi-page"),
        document.getElementById("runebergintorttu-page"),
        document.getElementById("kaurapuuro-page"),
        document.getElementById("joulutorttu-page"),
        document.getElementById("questions-page"),
        document.getElementById("results-page")
    ];

    let currentPage = 0; // Nykyinen sivu

    function showPage(pageIndex) {
        pages.forEach((page, index) => {
            if (index === pageIndex) {
                page.style.display = "block";
            } else {
                page.style.display = "none";
            }
        });
    }

    // Aloita peli
    document.getElementById("play-button").addEventListener("click", function() {
        currentPage = 1;
        showPage(currentPage);
    });

    // Jatka napin kuuntelija
    document.getElementById("continue").addEventListener("click", function() {
        let previousPage = parseInt(localStorage.getItem('previousPage'));

        // Tarkistaa, että previousPage on kelvollinen
        if (!isNaN(previousPage)) {
            currentPage = previousPage;
            localStorage.removeItem('previousPage');  // Poistaa previousPage localStoragesta
        } else {
            currentPage++;
        }

        showPage(currentPage);
    });
    
    
    
    // Takaisin napin kuuntelija
    document.addEventListener("click", function(event) {
        if (event.target.classList.contains("takaisin")) {
            currentPage--;
            showPage(currentPage);
        }
        if (event.target.classList.contains("seuraava")) {
            currentPage++;
            showPage(currentPage);
        }
    
        if (event.target.id === 'help-button') {
            showHelp(currentPage);
        }
    });
    
    function showHelp(previousPage) {
        // Tallentaa nykyinen sivu localStorageen
        localStorage.setItem('previousPage', previousPage.toString());
    
        // Piilottaa nykyisen sivu
        pages[previousPage].style.display = 'none';
        
        // Näytä ohjesivu
        document.getElementById('instructions-page').style.display = 'block';
    }

    // Apu nappi
    document.getElementById('help-button').addEventListener('click', function() {
        showHelp(currentPage);
    });

    document.getElementById("end-game").addEventListener("click", function() {
        currentPage = 0;  // Asettaa aloitussivun nykyiseksi sivuksi
        showPage(currentPage);
        resetGame();
        
    });



    // Tässä tulee questions sivun koodi!!! 

    // Kysymykset
    const questions = [
    {
        question: "Mikä on Karjalanpiirakan alkuperä?",
        options: ["Ruotsissa", "Länsi-Suomessa", "Nykyisessä Itä-Suomessa ja Venäjällä", "Helsingissä"],
        correctAnswer: 2
    },
    {
        question: "Millainen täyte yleensä laitetaan Karjalanpiirakkaan?",
        options: ["Riisitäyte", "Puuro", "Vehnätäyte", "Ruistäyte"],
        correctAnswer: 0
    },
    {
        question: "Kuinka kauan mämmiä yleensä haudutetaan uunissa?",
        options: ["10 minuuttia",  "1 tunti", "Useita tunteja", "Yli vuorokauden"],
        correctAnswer: 2
    },
    {
        question: "Mihin aikaan vuodesta mämmi on erityisen suosittua?",
        options: ["Jouluna", "Pääsiäisenä", "Kesällä", "Halloweenina"],
        correctAnswer: 1
    },
    {
        question: "Minkä kanssa mämmiä yleensä tarjoillaan?",
        options: ["Kermavaahdon kanssa", "Maidon kanssa", "Korppujauhojen kanssa", "Mustikkasurvoksen kanssa"],
        correctAnswer: 1
    },
    {
        question: "Kenen mukaan runebergin torttu on nimetty?",
        options: ["Ahlström, Walter Runebergin", "Aalto Alvar Runebergin", "Jean Sibelius Runebergin", "Johan Ludvig Runebergin"],
        correctAnswer: 3
    },
    {
        question: "Mikä on perinteinen täyte joulutortulle?",
        options: ["Mansikkahillo", "Mustikkahillo", "Luumuhillo", "Omenahillo"],
        correctAnswer: 2
    },
    {
        question: "Millä joulutortut voidellaan ennen paistamista?",
        options: ["Kananmuunalla", "Voilla", "Hillolla", "Sokerivedellä"],
        correctAnswer: 0
    },
    {
        question: "Mikä on kaurapuuron perusainesosa?",
        options: ["Vehnähiutale", "Ohrahiutale", "Kaurahiutale", "Ruisjauho"],
        correctAnswer: 2
    },
    {
        question: "Kuinka kauan kaurapuuroa yleensä keitetään?",
        options: ["3-10 minuuttia", "5-10 minuuttia", "20-25 minuuttia", "15-20 minuuttia"],
        correctAnswer: 0
    },
    ];

    const questionElement = document.getElementById('question');
    const optionButtons = document.querySelectorAll('.option-button');
    const nextButton = document.getElementById('next-button');
    const resultsPage = document.getElementById('results-page'); // Lisätty resultsPage-muuttuja
    const questionsPage = document.getElementById('questions-page');
    const startPage = document.getElementById('start-page');
    let currentQuestionIndex = 0;
    let shuffledQuestions = shuffleArray(questions);

    window.onload = function() {
        showCurrentQuestion();
    };

    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedOption = button.textContent;
            checkAnswer(selectedOption);
        });
    });

    nextButton.style.display = 'none';

    nextButton.addEventListener('click', () => {
        // Piilotetaan seuraava-nappula
        nextButton.style.display = 'none';
        
        // Tarkista, onko käyttäjä vastannut nykyiseen kysymykseen
        let userHasAnswered = false;
        optionButtons.forEach(button => {
            if (button.classList.contains('answered')) {
                userHasAnswered = true;
            }
        });

        // Siirry seuraavaan kysymykseen vain, jos käyttäjä on vastannut nykyiseen kysymykseen
        if (userHasAnswered) {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showCurrentQuestion();
            } else {
                const correctAnswers = calculateCorrectAnswers();
                showResults(correctAnswers); // Näytä tulokset
            }
        }
    });

    function showCurrentQuestion() {
        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        currentQuestion.options.forEach((option, index) => {
            optionButtons[index].textContent = option;
            optionButtons[index].classList.remove('answered');
            optionButtons[index].style.backgroundColor = '';
            optionButtons[index].disabled = false;

            // Päivitä kysymyslaskuri
            const questionCountElement = document.getElementById('question-count');
            questionCountElement.textContent = `${currentQuestionIndex + 1}/${questions.length}`;
        });
    }

    function checkAnswer(selectedOption) {
        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        const correctAnswerIndex = currentQuestion.correctAnswer;
    
        const selectedButton = Array.from(optionButtons).find(button => button.textContent === selectedOption);
        selectedButton.classList.add('answered');
    
        // Tallenna valitun vaihtoehdon indeksi
        currentQuestion.answeredIndex = Array.from(optionButtons).indexOf(selectedButton);
    
        if (currentQuestion.options[currentQuestion.answeredIndex] === currentQuestion.options[correctAnswerIndex]) {
            selectedButton.style.background = 'green';
        } else {
            selectedButton.style.background = 'red';
            selectedButton.style.color = 'white'; // Varmista, että teksti on luettavissa punaisella taustalla
            optionButtons[correctAnswerIndex].style.background = 'green';
        }
    
        optionButtons.forEach(button => button.disabled = true);
    
        // Näytä nextButton vain, jos käyttäjä on vastannut kysymykseen
        nextButton.style.display = 'block';
    }


    function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
        }
        return shuffledArray;
    }

    // Funktio laskee oikeiden vastausten määrän
    function calculateCorrectAnswers() {
        let correctCount = 0;
        shuffledQuestions.forEach(question => {
            if (question.options[question.correctAnswer] === question.options[question.answeredIndex]) {
                correctCount++;
            }
        });
        sessionStorage.setItem('correctCount', correctCount); // Tallenna oikeiden vastausten määrä sessionStorageen
        return correctCount;
    }

    // Funktio näyttää tulokset
    function showResults(correctCount) {
        resultsPage.style.display = 'block'; // Näytä resultsPage
        questionsPage.style.display = 'none'; // Piilota questionsPage
        resultsPage.innerHTML = `<h1 id="oikein-määrä" >Sait ${correctCount}/10 kysymyksestä oikein!</h1><h1 id="pelin-loppu-text" >Pelin Loppu!</h1><button id="restart-Button">Aloita alusta ↻</button>`;
        const restartButton = document.getElementById('restart-Button');
        
        restartButton.addEventListener('click', function() {
            resetGame();
        });
    }

    function resetGame() {
        currentQuestionIndex = 0;
        shuffledQuestions = shuffleArray(questions);
        showCurrentQuestion();
        resultsPage.style.display = 'none'; // Piilottaa resultsPage
        startPage.style.display = 'block'; // Näytää startPage
    }
    
});