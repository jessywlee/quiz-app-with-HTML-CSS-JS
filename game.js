const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text")); 
/* to change HTMLcollection to array */

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let quesitonCounter = 0;
let availableQuestions =[];
let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions =[...questions];
 
    getNewQuestion();
};

getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        //go to the end page
        return window.location.assign("/end.html");
    };
    
    questionCounter ++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    /* HTML question's innertext is set to currentquetion's question (key name) property */
    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
        /* choice's inner text is set to currentquestion's choice# (key name) property */
    });

    availableQuestions.splice(questionIndex, 1);
    /* remove the selected question from the available questions */

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
       if(!acceptingAnswers) return;
        /*if we are not reading to get answers, ignore the click */
       acceptingAnswers = false;
       const selectedChoice = e.target;
       const selectedAnswer = selectedChoice.dataset["number"];

       getNewQuestion();
    });
});

startGame();