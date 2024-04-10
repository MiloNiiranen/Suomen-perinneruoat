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
    question: "Minkä kanssa poronkäristys perinteisesti tarjoillaan?",
    options: ["Riisin ja soijakastikkeen", "Perunamuusin ja puolukkahillon", "Pastan ja tomaattikastikkeen", "Salaatin ja sinappikastikkeen"],
    correctAnswer: 1
},
{
    question: "Miten poronliha leikataan poronkäristystä varten?",
    options: ["Pieniksi paloiksi", "Paksuiksi viipaleiksi", " Pitkiksi suikaleiksi", "Pyöreiksi palloiksi"],
    correctAnswer: 0
},
{
    question: "Mikä näistä ruoista on perinteisesti tarjoiltu useammin jouluna?",
    options: ["Poronkäristys", "Karjalanpiirakka", "Mämmi", "Ei mikään näistä"],
    correctAnswer: 3
},
{
    question: "Mikä näistä ruoista on ollut osa suomalaista ruokaperinnettä jo vuosisatojen ajan?",
    options: ["Poronkäristys", "Karjalanpiirakka", "Mämmi", "Kaikki"],
    correctAnswer: 3
},
{
    question: "Minkä kanssa mämmiä yleensä tarjoillaan?",
    options: ["Kermavaahdon kanssa", "Maidon kanssa", "Korppujauhojen kanssa", "Mustikkasurvoksen kanssa"],
    correctAnswer: 1
},
{
    question: "Mihin päin Suomea poronkäristys juontaa juurensa?",
    options: ["Keski Suomen alueelle", "Itä Suomen alueelle", "Eteläisen Suomen alueelle", "Pohjoisen Suomen alueelle"],
    correctAnswer: 3
},
];

const questionElement = document.getElementById('question');
const optionButtons = document.querySelectorAll('.option-button');
const nextButton = document.getElementById('next-button');
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

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showCurrentQuestion();
    } else {
        // Kaikki kysymykset on käyty läpi
        // Tähän voit lisätä koodin seuraavaa toimintoa varten
    }
});

nextButton.style.display = 'none'; // Piilotetaan nappi aluksi

nextButton.addEventListener('click', () => {
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
           nextButton.style.display = 'none'; // Piilotetaan nappi aluksi
       } else {
           // Kaikki kysymykset on käyty läpi
           // Tähän voit lisätä koodin seuraavaa toimintoa varten
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

    if (currentQuestion.options[selectedButton.dataset.index] === currentQuestion.options[correctAnswerIndex]) {
        selectedButton.style.backgroundColor = 'green';
    } else {
        selectedButton.style.backgroundColor = 'red';
        optionButtons[correctAnswerIndex].style.backgroundColor = 'green';
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

