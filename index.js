const QUIZ = [
    {id: 1, 
        question: "1) What is the capital of Portugal?", 
        answerA: "Madrid", 
        answerB: "Lisbon", 
        answerC: "Gibraltar", 
        answerD: "Mozambique", 
        trueAnswer: "b",
        picture: "C:\Users\Ian\projects\quiz_app\images\Lisbon.jpeg",
        pictureAlt: "Landscape of a city whose building are white with bronze tiles for the roofs."},
    {id: 2, 
        question: "2) Which continent is Greenland apart of?", 
        answerA: "Africa", 
        answerB: "Europe", 
        answerC: "Australia", 
        answerD: "North America", 
        trueAnswer: "d",
        picture: "C:\Users\Ian\projects\quiz_app\images\Greenland.jpeg",
        pictureAlt: "A city with colorful houses on the edge of a sea, snow covered mountains are in the background."},
    {id: 3, 
        question: "3) What is the largest country in the world (in terms of landmass)?", 
        answerA: "United States of America", 
        answerB: "Canada", 
        answerC: "Russia", 
        answerD: "Australia", 
        trueAnswer: "d",
        picture: "C:\Users\Ian\projects\quiz_app\images\Russia.png",
        pictureAlt: "People walking in front of a massive, colorful building with many towers, whose tips are curved and sloped."},
    {id: 4, 
        question: "4) Which of the following is NOT a continent?", 
        answerA: "Antarctica", 
        answerB: "Australia", 
        answerC: "Middle East", 
        answerD: "South America", 
        trueAnswer: "c",
        picture: "C:\Users\Ian\projects\quiz_app\images\Antarctica.jpg",
        pictureAlt: "An iceburg floats in the ocean, with a white, snow-covered landmass nearby."},
    {id: 5, 
        question: "5) Which of the following is both a city and the name of a country (that currently exists)?", 
        answerA: "Singapore", 
        answerB: "Rome", 
        answerC: "Buenos Aires", 
        answerD: "Quebec", 
        trueAnswer: "a",
        picture: "C:\Users\Ian\projects\quiz_app\images\rome.jpg",
        pictureAlt: "Landscape of a city during twilight. A river flows in front of the city."},
];

const SCOREBOARD = {
  score: 0,
  possible: 5,
  currQuestion: 0,
}

function toggleHidden(toHide) {
    toHide.toggleClass('hidden');
}

function renderIntroPage() {
    const intro = $('.js-intro-form');
    if (intro.hasClass('hidden')) {
        toggleHidden(intro);
    }
}

function nextQuestion() {
    SCOREBOARD.currQuestion++;
}

function questionPageContents() {
    let new_question = null;
    for (let i = 0; i < QUIZ.length; i++) {
        if (QUIZ[i].id == SCOREBOARD.currQuestion) {
            newQuestion = QUIZ[i];
        }
    }
    $('.results').html(
        `
        <p>Score: ${SCOREBOARD.score}</p>
        <p>Question ${SCOREBOARD.currQuestion} of ${SCOREBOARD.possible}</p>
        `
    );
    $('.js-question-form').html(
        `
        <fieldset>
            <legend class="question">${newQuestion.question}</legend>
            <div><input class= "answer" type="radio" name="answer" value="a"> ${newQuestion.answerA}</div>
            <div><input class= "answer" type="radio" name="answer" value="b"> ${newQuestion.answerB}</div>
            <div><input class= "answer" type="radio" name="answer" value="c"> ${newQuestion.answerC}</div>
            <div><input class= "answer" type="radio" name="answer" value="d"> ${newQuestion.answerD}</div>
            <div><input type="submit" value="Submit"></div>
        <fieldset>
        `
    )
}

function startQuiz() {
    $('.js-start-button').click(function() {
        event.preventDefault();
        const intro = $('.js-intro-form');
        const question = $('.js-question-form');
        const results = $('.results');
        toggleHidden(intro);
        nextQuestion();
        toggleHidden(question);
        toggleHidden(results);
        questionPageContents();
    });      
}

function renderQuestionPage() {

}

function handleQuiz() {
    renderIntroPage();
    startQuiz();
    renderQuestionPage();
}

$(handleQuiz);