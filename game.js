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
    availableQuestions =[...questions]; //why??
 
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

        let classToApply = "incorrect";
        if (selectedAnswer == currentQuestion.answer) {
            classToApply = "correct";
        }; /* used == because the right hand is string. Set the default value to incorrect and use if statement
        to change it to correct if the condition is true */

        /* The above can be written as: 
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect' */
        selectedChoice.parentElement.classList.add(classToApply);
        //to add the class to the parent element of selected choice text
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            /*this is to remove the color once the option is selected.
            the setTimeout is required because when add & remove class are applied without time delay,
            both won't be applied.  */
            getNewQuestion();
        }, 1000);
       
    });
});

startGame();