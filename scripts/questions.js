const questions = [
{
    question: "Mikä on Karjalanpiirakan alkuperä?",
    options: ["Ruotsissa", "Länsi-Suomessa", "Nykyisessä Itä-Suomessa ja Venäjällä", "Helsingissä"],
    correctAnswer: "Nykyisessä Itä-Suomessa ja Venäjällä"
},
{
    question: "Millainen täyte yleensä laitetaan Karjalanpiirakkaan?",
    options: ["Riisitäyte", "Puuro", "Vehnätäyte", "Ruistäyte"],
    correctAnswer: "Riisitäyte"
},
{
    question: "Kuinka kauan mämmiä yleensä haudutetaan uunissa?",
    options: ["10 minuuttia",  "1 tunti", "Useita tunteja", "Yli vuorokauden"],
    correctAnswer: "Useita tunteja"
},
{
    question: "Mihin aikaan vuodesta mämmi on erityisen suosittua?",
    options: ["Jouluna", "Pääsiäisenä", "Kesällä", "Halloweenina"],
    correctAnswer: "Pääsiäisenä"
},
{
    question: "Minkä kanssa poronkäristys perinteisesti tarjoillaan?",
    options: ["Riisin ja soijakastikkeen", "Perunamuusin ja puolukkahillon", "Pastan ja tomaattikastikkeen", "Salaatin ja sinappikastikkeen"],
    correctAnswer: "Perunamuusin ja puolukkahillon"
},
{
    question: "Miten poronliha leikataan poronkäristystä varten?",
    options: ["Pieniksi paloiksi", "Paksuiksi viipaleiksi", " Pitkiksi suikaleiksi", "Pyöreiksi palloiksi"],
    correctAnswer: "Pieniksi paloiksi"
},
{
    question: "Mikä näistä ruoista on perinteisesti tarjoiltu useammin jouluna?",
    options: ["Poronkäristys", "Karjalanpiirakka", "Mämmi", "Ei mikään näistä"],
    correctAnswer: "Poronkäristys"
},
{
    question: "Mikä näistä ruoista on ollut osa suomalaista ruokaperinnettä jo vuosisatojen ajan?",
    options: ["Poronkäristys", "Karjalanpiirakka", "Mämmi", "Kaikki"],
    correctAnswer: "Kaikki"
},
{
    question: "Minkä kanssa mämmiä yleensä tarjoillaan?",
    options: ["Kermavaahdon kanssa", "Maidon kanssa", "Korppujauhojen kanssa", "Mustikkasurvoksen kanssa"],
    correctAnswer: ["Kermavaahdon kanssa", "Maidon kanssa"]
},
{
    question: "Mihin päin Suomea poronkäristys juontaa juurensa?",
    options: ["Keski Suomen alueelle", "Itä Suomen alueelle", "Eteläisen Suomen alueelle", "Pohjoisen Suomen alueelle"],
    correctAnswer: "Pohjoisen Suomen alueelle"
},
];

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const optionButtons = document.querySelectorAll('.option-button');
let currentQuestionIndex = 0;
let shuffledQuestions = shuffleArray(questions);
let previousQuestions = [];

window.onload = function() {
    showQuestions();

    document.querySelectorAll('.option-button').forEach(button => {
        button.addEventListener('click', () => {
            const selectedOption = button.textContent;
            checkAnswer(selectedOption);
        });
    });
};

document.querySelectorAll('.option-button').forEach(button => {
    button.addEventListener('click', () => {
        showQuestions();
    });
});

function showQuestions() {
    const currentQuestion = getRandomQuestion();
    if (currentQuestion) {
        questionElement.textContent = currentQuestion.question;
        for (let i = 0; i < currentQuestion.options.length; i++) {
            optionButtons[i].textContent = currentQuestion.options[i];
        }
    } 

    else {
        // Kaikki kysymykset on jo näytetty
        console.log("Kaikki kysymykset on jo näytetty!");
    }
}



function getRandomQuestion() {
    if (currentQuestionIndex >= shuffledQuestions.length) {
        console.log("Kaikki kysymykset on jo näytetty!");
        return null;
    }
    const question = shuffledQuestions[currentQuestionIndex];
    currentQuestionIndex++;
    return question;
}

function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
    }
    return shuffledArray;
}

function checkAnswer(selectedOption) {
    const currentQuestion = shuffledQuestions[currentQuestionIndex - 1];
    const correctAnswer = currentQuestion.correctAnswer;

    // Tarkistetaan, onko valittu vaihtoehto mukana oikeissa vastauksissa
    if (Array.isArray(correctAnswer)) {
        if (correctAnswer.includes(selectedOption)) {
            alert("Oikein!");
        } else {
            alert("Väärin!");
        }
    } 

    else {
        if (selectedOption === correctAnswer) {
            alert("Oikein!");
        } 
        
        else {
            alert("Väärin!");
        }
    }
}

