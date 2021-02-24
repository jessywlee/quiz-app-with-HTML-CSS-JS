const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores.map( score => {
    return `<li class="high-score">${score.name}: ${score.score}</li>`;
})
.join(""); //.map takes an array of items and convert each into something else.