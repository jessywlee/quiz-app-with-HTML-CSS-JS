const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
//because the value in local storage is a string
const MAX_HIGH_SCORES = 5;


finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
   saveScoreBtn.disabled = !username.value;
   //if there is value, it enables.
});


saveHighScore = (e) => {
    
    e.preventDefault();
    /* to prevent the default because forms by default will submit to a new page  */
    const scoreBoard = {
        score: mostRecentScore,
        name: username.value
    };

    highScores.push(scoreBoard);
    highScores.sort( (a,b) => b.score - a.score); // if b is higher than a, put b before a
    highScores.splice(MAX_HIGH_SCORES); //to only keep top 5

    localStorage.setItem("highScores", JSON.stringify(highScores));
   
    window.location.assign("index.html");

};