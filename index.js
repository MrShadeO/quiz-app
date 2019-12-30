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
        question: "2) Which continent is Greenland a part of?", 
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
        trueAnswer: "c",
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
        question: "5) Which of the following is both a city and the \nname of a country (that currently exists)?", 
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
    toggleHidden($('.js-intro-form'));
}

function nextQuestion() {
    SCOREBOARD.currQuestion++;
}

function findQuestion() {
    let question = null;
    for (let i = 0; i < QUIZ.length; i++) {
        if (QUIZ[i].id == SCOREBOARD.currQuestion) {
            question = QUIZ[i];
        }
    }
    return question;
}

function questionPageContents() {
    let newQuestion = findQuestion();
    $('.results').html(
        `
        <p>Score: ${SCOREBOARD.score}</p>
        <p>Question ${SCOREBOARD.currQuestion} of ${SCOREBOARD.possible}</p>
        `
    );
    $('.js-question-form').html(
        `
        <fieldset class="js-question-field">
            <legend class="question">${newQuestion.question}</legend>
            <div><input class="answer" type="radio" name="answer" value="a"> ${newQuestion.answerA}</div>
            <div><input class="answer" type="radio" name="answer" value="b"> ${newQuestion.answerB}</div>
            <div><input class="answer" type="radio" name="answer" value="c"> ${newQuestion.answerC}</div>
            <div><input class="answer" type="radio" name="answer" value="d"> ${newQuestion.answerD}</div>
            <input class= "submit-answer js-submit-answer" type="submit" value="Submit">
        <fieldset>
        `
    )
}

function startQuiz() {
    $('.js-start-button').click(function() {
        event.preventDefault();
        toggleHidden($('.js-intro-form'));
        nextQuestion();
        toggleHidden($('.js-question-form'));
        toggleHidden($('.results'));
        questionPageContents();
    });      
}

function handleAnswerSubmit() {
    $('.js-question-form').on('click', '.js-submit-answer', event => {
        event.preventDefault();
        let providedAnswer = null;
        let correctAnswer = findQuestion();
        answerList = document.getElementsByClassName('answer');
        for (let i = 0; i < answerList.length; i++) {
            if (answerList[i].checked == true) {
                providedAnswer = answerList[i];
            }
        }
        //No answer provided
        if (providedAnswer == null) {
            $('.js-question-field').find('span').remove();
            $('.js-question-field').append('<span class="incorrect"><p>Please select an answer!</p></span>');
        //Correct answer_:<
        } else if (($(providedAnswer).attr('value') == correctAnswer.trueAnswer)) {
            SCOREBOARD.score++;
            $('.js-question-field').find('span').remove();
            $('.js-question-field').append(`<span class="correct"><p>That is correct!</p></span>`);
            $('.js-submit-answer').replaceWith(
                `
                <button class="continue-button js-continue-button">
                    <span class="button-label">Continue</span>
                </button>
                `);
        //Wrong answer
        } else {
            $('.js-question-field').find('span').remove();
            $('.js-question-field').append(
                `<span class="incorrect">
                    <p>That is incorrect.</p>
                    <p>The correct answer was ${correctAnswer.trueAnswer}.</p>
                </span>`);
            $('.js-submit-answer').replaceWith(
                `
                <button class="continue-button js-continue-button">
                    <span class="button-label">Continue</span>
                </button>
                `);
        }
    })
}

function renderOutroPage() {
    toggleHidden($('.js-question-form'));
    toggleHidden($('.js-results'));
    toggleHidden($('.js-outro-form'));
    $('.js-outro-form').append(
        `<fieldset class="outro-fieldset js-outro-fieldset">
            <legend>Congragulations on completing the quiz!\nYour final score is ${SCOREBOARD.score} out of ${SCOREBOARD.possible}.</legend>
            <button class="retake-quiz js-retake-quiz">
                <span class="button-label">Retry?</span>
            </button>
        </fieldset>
        `);
}

function handleContinue() {
    $('.js-question-form').on('click', '.js-continue-button', event => {
        event.preventDefault();
        $('.js-question-form').empty();
        $('.js-results').empty();
        if (SCOREBOARD.currQuestion == 5) {
            renderOutroPage();
        } else {
            SCOREBOARD.currQuestion++;
            questionPageContents();
        }
    });
}

function handleRetry() {
    $('.js-outro-form').on('click', '.js-retake-quiz', event => {
        event.preventDefault();
        $('.js-outro-form').empty();
        toggleHidden($('.js-outro-form'));
        SCOREBOARD.score = 0;
        SCOREBOARD.currQuestion = 0;
        renderIntroPage();
    });
}

function handleQuiz() {
    renderIntroPage();
    startQuiz();
    handleAnswerSubmit();
    handleContinue();
    handleRetry();
}

$(handleQuiz);