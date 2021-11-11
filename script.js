const questionContainer = document.getElementById("questionContainer");
const questionTitle = document.getElementById("questionTitle");
const questionDes = document.getElementById("questionDes");
const askQuestion = document.getElementById("askQuestion");
const questionListContainer = document.getElementById("questionListContainer");
const answerFormContainer = document.getElementById("answerFormContainer");
const nameCommentator = document.getElementById("nameCommentator");
const answerCommentator = document.getElementById("answerCommentator");
const submitAnswer = document.getElementById("submitAnswer");
const newQuestion = document.getElementById("newQuestion");
const QUESTION = "questions";
let allquestions = [];
let selectedQuestion = null;


function questionListStartup() {
    let questions = localStorage.getItem(QUESTION);
    if (questions) {
        questions = JSON.parse(questions);
    }
    else {
        questions = [];
    }

    allquestions = questions;

    questions.forEach(function (question) {
        addToUI(question)
    })

}

questionListStartup();

askQuestion.addEventListener("click", function () {
    if (questionTitle.value != "" && questionDes.value != "") {
        const title = questionTitle.value;
        const description = questionDes.value;
        questionTitle.value = "";
        questionDes.value = "";

        const questionData = {
            title: title,
            description: description,
            answers: []
        }

        let questions = localStorage.getItem(QUESTION);
        if (questions) {
            questions = JSON.parse(questions);
        }
        else {
            questions = [];
        }

        questions.push(questionData);
        localStorage.setItem(QUESTION, JSON.stringify(questions));
        addToUI(questionData);
    }
})

function addToUI(question) {
    const container = document.createElement("div");
    container.classList.add("question")
    const title = document.createElement("h3");
    const description = document.createElement("p")

    container.addEventListener("click", function () {
        handleQuestionClick(question);
    })

    title.innerHTML = question.title;
    description.innerHTML = question.description;

    container.appendChild(title);
    container.appendChild(description);

    questionListContainer.appendChild(container);
}

function handleQuestionClick(question) {
    questionContainer.style.display = "none";
    questionDisplay.innerHTML = "";
    answerFormContainer.style.display = "block";

    selectedQuestion = question;

    displayQuestion(question);
}

function displayQuestion(question) {
    const container = document.createElement("div");
    container.classList.add("question")
    const title = document.createElement("h3");
    const description = document.createElement("p")

    title.innerHTML = question.title;
    description.innerHTML = question.description;

    container.appendChild(title);
    container.appendChild(description);

    questionDisplay.appendChild(container);

    const resolve = document.createElement("button");
    resolve.innerHTML = "resolve";
    questionDisplay.appendChild(resolve);

    resolve.addEventListener("click", function () {
        let selectedQuestionIndex = allquestions.indexOf(selectedQuestion);

        allquestions.splice(selectedQuestionIndex, 1);

        localStorage.setItem(QUESTION, JSON.stringify(allquestions));

        questionDisplay.removeChild(container);
    })

    question.answers.forEach(function (answer) {
        const answerContainer = document.createElement("div");

        const nameOfCommentatorNode = document.createElement("h3");
        const answerNode = document.createElement("p")

        nameOfCommentatorNode.innerHTML = answer.name;
        answerNode.innerHTML = answer.comment;

        answerContainer.appendChild(nameOfCommentatorNode);
        answerContainer.appendChild(answerNode);

        questionDisplay.appendChild(answerContainer);
    })
}

newQuestion.addEventListener("click", function () {
    questionContainer.style.display = "block";
    questionDisplay.innerHTML = "";
    answerFormContainer.style.display = "none";
})

submitAnswer.addEventListener("click", function () {
    const nameOfCommentator = nameCommentator.value;
    const answer = answerCommentator.value;

    const answerContainer = document.createElement("div");

    const nameOfCommentatorNode = document.createElement("h3");
    const answerNode = document.createElement("p")

    nameOfCommentatorNode.innerHTML = nameOfCommentator;
    answerNode.innerHTML = answer;

    answerContainer.appendChild(nameOfCommentatorNode);
    answerContainer.appendChild(answerNode);

    questionDisplay.appendChild(answerContainer);

    let selectedQuestionIndex = allquestions.indexOf(selectedQuestion);

    let question = allquestions[selectedQuestionIndex];

    question.answers.push({ name: nameOfCommentator, comment: answer });

    localStorage.setItem(QUESTION, JSON.stringify(allquestions));

})

search.addEventListener("keyup",function(event){
    const value = event.target.value;

    questionListContainer.innerHTML = "";

    allquestions.forEach(function(question){
        if(question.title.includes(value)){
            addToUI(question);
        }
    })
})