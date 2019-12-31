//Contains all of the questions in the quiz. id is the question number.
const QUIZ = [ 
    {id: 1, 
        question: "1) What is the capital of Portugal?", 
        answerA: "Madrid", 
        answerB: "Lisbon", 
        answerC: "Gibraltar", 
        answerD: "Mozambique", 
        trueAnswer: "b"},
    {id: 2, 
        question: "2) Which continent is Greenland a part of?", 
        answerA: "Africa", 
        answerB: "Europe", 
        answerC: "Australia", 
        answerD: "North America", 
        trueAnswer: "d"},
    {id: 3, 
        question: "3) What is the largest country in the world (in terms of landmass)?", 
        answerA: "United States of America", 
        answerB: "Canada", 
        answerC: "Russia", 
        answerD: "Australia", 
        trueAnswer: "c"},
    {id: 4, 
        question: "4) Which of the following is NOT a continent?", 
        answerA: "Antarctica", 
        answerB: "Australia", 
        answerC: "Middle East", 
        answerD: "South America", 
        trueAnswer: "c"},
    {id: 5, 
        question: "5) Which of the following is both a city and the \nname of a country (that currently exists)?", 
        answerA: "Singapore", 
        answerB: "Rome", 
        answerC: "Buenos Aires", 
        answerD: "Quebec", 
        trueAnswer: "a"},
];

/*
Tracks the user's score, the total number of questions (possible), and what question the user is currently on. 
currQuestion 0 means the user is looking at the intro or outro page.
*/
const SCOREBOARD = { 
  score: 0,
  possible: 5,
  currQuestion: 0,
}

//This function takes an html element and toggles the 'hidden' class on or off.
function toggleHidden(toHide) {
    toHide.toggleClass('hidden');
}

//This function is called to turn the intro page on and off.
function renderIntroPage() {
    toggleHidden($('.js-intro-form'));
}

//This function is called to bring the user to the next question.
function nextQuestion() {
    SCOREBOARD.currQuestion++;
}

//This function is called to find the quiz info for the current question.
function findQuestion() {
    let question = null;
    for (let i = 0; i < QUIZ.length; i++) {
        if (QUIZ[i].id == SCOREBOARD.currQuestion) {
            question = QUIZ[i];
        }
    }
    return question;
}

/*
This function is called to add elements to the html file and render the question and its answers. Additionally, this also renders
the scoreboard for the user to see.
*/
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

/*
This function is called when the user clicks the start button on the intro page. It hides the intro page and allows the
question and scoreboard to be rendered.
*/
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

/*
This function is called when a user clicks the submit button underneath a question. If the user did not select a radio, a
message will appear asking the user to do so. If the selected radio is the correct answer, they will receive a message in
green text notifying them. Finally, if the answer is incorrect, red text will appear telling them that the given answer is
wrong, as well as showing the correct answer. In the final two cases, the submit button is replaced with a continue button.
*/
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


//Once all questions have been completed, this function is called to hide the question form and results and to reveal the outro page.
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

/*
This function is called when a continue button has been clicked. It checks to see if all answers have been completed or not. If they
have, a function is called to render the outro page. If not, a function is called to render the next question.
*/
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

//This function is called by the user clicking the retry button. The scoreboard is completely reset and the user is shown the intro page.
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

/*
This function sets up all event listeners, as well as calling the function that initializes the intro page.
*/
function handleQuiz() {
    renderIntroPage();
    startQuiz();
    handleAnswerSubmit();
    handleContinue();
    handleRetry();
}

$(handleQuiz);