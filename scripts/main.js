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
        document.getElementById("kalakukko-page"),
        document.getElementById("lohikeitto-page"),
        document.getElementById("silakkalaatikko-page"),
        document.getElementById("questions-page"),
        document.getElementById("results-page")
    ];

    const helpButton = document.getElementById('help-button'); 
    const endGameButton = document.getElementById('end-game'); 
    const motiveButton = document.getElementById('motive-button');

    let currentPage = 0; // Nykyinen sivu

    function showPage(pageIndex) {
        pages.forEach((page, index) => {
            if (index === pageIndex) {
                page.style.display = "block";
            } else {
                page.style.display = "none";
            }
        });
        hideButtonsInStartPageAndHelpPage();
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
        // Tallentaa nykyisen sivu localStorageen
        localStorage.setItem('previousPage', previousPage.toString());
    
        pages[previousPage].style.display = 'none';
        
        // Näytä ohjesivu
        document.getElementById('instructions-page').style.display = 'block';
    }

    // Apu nappi
    document.getElementById('help-button').addEventListener('click', function() {
        showHelp(currentPage);
        helpButton.style.display ="none"
    });

    // Pelin lopetus nappi
    document.getElementById("end-game").addEventListener("click", function() {
        localStorage.clear();
        currentPage = 0;  // Asettaa aloitussivun nykyiseksi sivuksi
        showPage(currentPage);
        resetGame();
        document.getElementById('motive-page').style.display = 'none';
        
    });

    document.getElementById("motive-button").addEventListener("click", function(){
        document.getElementById('instructions-page').style.display = 'none';
        document.getElementById('motive-page').style.display = 'block';
    });



    function hideButtonsInStartPageAndHelpPage(){
        if(currentPage === 0 || currentPage === 12){
            helpButton.style.display ="none"
            endGameButton.style.display = "none"
        }
        else if(currentPage === 1){
            helpButton.style.display ="none"
            endGameButton.style.display = "block"
        }
        else{
            helpButton.style.display ="block"
            endGameButton.style.display = "block"
        }
    }
    hideButtonsInStartPageAndHelpPage()
    

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
            question: "Miten silakkalaatikko paistetaan?",
            options: ["Paistetaan uunissa, kunnes perunat ovat kypsiä ja pinta on kauniin ruskea", "Paistetaan pannulla, kunnes kaikki ainekset ovat kypsiä", "Keitetään kattilassa, kunnes perunat ovat kypsiä", "Haudutetaan liedellä, kunnes perunat ovat kypsiä"],
            correctAnswer: 0
        },
        {
            question: "Kenen mukaan runebergin torttu on nimetty?",
            options: ["Ahlström, Walter Runebergin", "Aalto Alvar Runebergin", "Jean Sibelius Runebergin", "Johan Ludvig Runebergin"],
            correctAnswer: 3
        },
        {
            question: "Mitä kasviksia käytetään lohikeitossa?",
            options: [" Perunoita, porkkanoita ja sipulia", " Perunoita, tomaatteja ja sipulia", "Porkkanoita, kurkkuja ja sipulia", "Perunoita, porkkanoita ja kurkkuja"],
            correctAnswer: 0
        },
        {
            question: "Millä joulutortut voidellaan ennen paistamista?",
            options: ["Kananmuunalla", "Voilla", "Hillolla", "Sokerivedellä"],
            correctAnswer: 0
        },
        {
            question: "Mihin tarkoitukseen kalakukko alun perin valmistettiin?",
            options: ["Juhla-aterioiksi", "Evääksi pellolle tai metsään työhön lähtiessä", "Myytäväksi toreilla", "Kirkonmenojen jälkeisiksi lounaiksi"],
            correctAnswer: 1
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
    const backButton = document.getElementById('back-button');
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
    backButton.style.display = 'none';
    
    nextButton.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showCurrentQuestion(true); // Näytä vastattu kysymys
        } else {
            const correctAnswers = calculateCorrectAnswers();
            showResults(correctAnswers);
        }
        updateNavigationButtons();
    });
    
    backButton.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showCurrentQuestion(true); // Näytä vastattu kysymys
        }
        updateNavigationButtons();
    });
    
    function showCurrentQuestion(isReview = false) {
        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        currentQuestion.options.forEach((option, index) => {
            optionButtons[index].textContent = option;
            optionButtons[index].classList.remove('answered');
            optionButtons[index].style.background = 'linear-gradient(120deg, rgba(79, 123, 199, 1), rgba(107, 158, 223, 1))';
            optionButtons[index].disabled = false;
    
            if (currentQuestion.answeredIndex !== undefined) {
                optionButtons[currentQuestion.answeredIndex].classList.add('answered');
                if (currentQuestion.answeredIndex === currentQuestion.correctAnswer) {
                    optionButtons[currentQuestion.answeredIndex].style.background = 'green';
                } else {
                    optionButtons[currentQuestion.answeredIndex].style.background = 'red';
                    optionButtons[currentQuestion.correctAnswer].style.background = 'green';
                }
                optionButtons.forEach(button => button.disabled = true);
                nextButton.style.display = 'block';
            } else {
                nextButton.style.display = 'none';
            }
    
            const questionCountElement = document.getElementById('question-count');
            questionCountElement.textContent = `${currentQuestionIndex + 1}/${questions.length}`;
        });
    
        updateNavigationButtons();
    }
    
    function checkAnswer(selectedOption) {
        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        if (currentQuestion.answeredIndex !== undefined) {
            return; // Estää uudelleen vastaamisen
        }
        
        const correctAnswerIndex = currentQuestion.correctAnswer;
    
        const selectedButton = Array.from(optionButtons).find(button => button.textContent === selectedOption);
        selectedButton.classList.add('answered');
    
        currentQuestion.answeredIndex = Array.from(optionButtons).indexOf(selectedButton);
    
        if (currentQuestion.options[currentQuestion.answeredIndex] === currentQuestion.options[correctAnswerIndex]) {
            selectedButton.style.background = 'green';
        } else {
            selectedButton.style.background = 'red';
            selectedButton.style.color = 'white';
            optionButtons[correctAnswerIndex].style.background = 'green';
        }
    
        optionButtons.forEach(button => button.disabled = true);
    
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
    
    function calculateCorrectAnswers() {
        let correctCount = 0;
        shuffledQuestions.forEach(question => {
            if (question.options[question.correctAnswer] === question.options[question.answeredIndex]) {
                correctCount++;
            }
        });
        sessionStorage.setItem('correctCount', correctCount);
        return correctCount;
    }
    
    function showResults(correctCount) {
        currentPage = 12;
        resultsPage.style.display = 'block';
        questionsPage.style.display = 'none';
        resultsPage.innerHTML = `<h1 id="oikein-määrä">Sait <span style="color: #0000CC; text-shadow: #FFF 0px 0px 5px, #FFF 0px 0px 10px, #FFF 0px 0px 15px, #FF2D95 0px 0px 20px, #FF2D95 0px 0px 30px, #FF2D95 0px 0px 40px, #FF2D95 0px 0px 50px, #FF2D95 0px 0px 75px;">${correctCount}</span><span style="color: #55FF00"> / </span> <span style="color: #0000CC; text-shadow: #FFF 0px 0px 5px, #FFF 0px 0px 10px, #FFF 0px 0px 15px, #FF2D95 0px 0px 20px, #FF2D95 0px 0px 30px, #FF2D95 0px 0px 40px, #FF2D95 0px 0px 50px, #FF2D95 0px 0px 75px;">10</span> kysymyksestä oikein!</h1><h1 id="pelin-loppu-text" >Pelin Loppu!</h1> <h1 id="thanks-for-playing">Kiitos Pelaamisesta!</h1> <button id="restart-Button">Aloita alusta ↻</button>`;
        const restartButton = document.getElementById('restart-Button');
        
        restartButton.addEventListener('click', function() {
            resetGame();
        });

        hideButtonsInStartPageAndHelpPage();
    }
    
    function resetGame() {
        currentQuestionIndex = 0;
        shuffledQuestions = shuffleArray(questions).map(question => ({
            ...question,
            answeredIndex: undefined // Nollaa vastaustilan
        }));
        showCurrentQuestion();
        resultsPage.style.display = 'none';
        startPage.style.display = 'block';
        backButton.style.display = 'none';
        nextButton.style.display = 'none';

        currentPage = 0;
        hideButtonsInStartPageAndHelpPage();
    }
    
    function updateNavigationButtons() {
        if (currentQuestionIndex === 0) {
            backButton.style.display = 'none';
        } else {
            backButton.style.display = 'block';
        }
    
        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        if (currentQuestion.answeredIndex !== undefined) {
            nextButton.style.display = 'block';
        } else {
            nextButton.style.display = 'none';
        }
    }
    
});