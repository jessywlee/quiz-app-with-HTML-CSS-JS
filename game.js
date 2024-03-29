const question = document.getElementById("question");
const codeBlock = document.getElementById("code-block");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const choiceContainer = Array.from(document.getElementsByClassName("choice-container"));
/* to change HTMLcollection to array */
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressFull = document.getElementsByClassName("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let quesitonCounter = 0;
let availableQuestions =[];
let questions = [];
let questionIndex = -1;
let submittedAnswers = {};

/*to fetch data from json file instead of hard coding the questions.  
Note that fetching local path doesn't work for security reasons, so you need
https URL scheme*/
fetch('./questions.json')
// fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple")
.then(res => {
    return res.json(); 
    /* The json() method of the Body mixin takes a Response stream and reads it to completion. 
    It returns a promise that resolves with the result of parsing the body text as JSON. */
})
.then( loadedQuestions => {
    
    // questions = loadedQuestions.results.map( loadedQuestion => {
    //     const formattedQuestion = {
    //         question: loadedQuestion.question
    //     };

    //     const answerChoices = [...loadedQuestion.incorrect_answers];
    //     formattedQuestion.answer = Math.floor(Math.random() * 4) + 1; 
    //     //to get a random index of correct answer and save it to the object.
    //     answerChoices.splice(formattedQuestion.answer-1, 0, loadedQuestion.correct_answer);
    
    //     answerChoices.forEach((choice, index) => {
    //         formattedQuestion["choice" + (index + 1)] = choice;
    //     });
       
    //     console.log(formattedQuestion);
        
    //     return formattedQuestion;
    // });
    questions = loadedQuestions;
    // console.log(questions)
    startGame();

}).catch( err => {
    console.error(err);
})



//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 9;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = questions; 

    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
    
};

getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score);

        //to save the final score to "mostRecentScore". We will use it on end page.
        return window.location.assign("end.html");  //go to the end page
    };
    
    questionCounter ++;
    progressText.innerHTML = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;


    questionIndex++;
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML = currentQuestion.question;
    if (currentQuestion.code) {
        codeBlock.src = currentQuestion.code;
    }
    /* HTML question's innertext is set to currentquestion's question (key name) property */
    choices.forEach((choice, index) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
        if (choice.innerText === "") {
            choice.disabled = true;
            choiceContainer[index].disabled = true;
        } else {
            choice.disabled = false;
            choiceContainer[index].disabled = false;
        }
        /* choice's inner text is set to currentquestion's choice# (key name) property */
    });

    // availableQuestions.splice(questionIndex, 1);
    /* remove the selected question from the available questions */

    acceptingAnswers = true;

    clickAnswer();
};

function clickAnswer() {
    choices.forEach((choice, index) => {
        if (!(choiceContainer[index].disabled)) {
            choice.addEventListener('click', e => {
                if(!acceptingAnswers) return;
                 /*if we are not ready to get answers, ignore the click */
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
                 if (classToApply === "correct") {
                     incrementScore(CORRECT_BONUS);
                 };
         
                 submittedAnswers['Q' + (questionIndex + 1)] = (classToApply === 'correct' ? 'O' : 'X');
                 sessionStorage.setItem('submittedAnswers', JSON.stringify(submittedAnswers));
                 
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
        }
        
    });
}
      
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

