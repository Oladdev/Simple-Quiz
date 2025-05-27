const quizQuestions = [
  {
    question: "Which element is used to display an image in HTML?",
    answers: [
      { text: "&lt;pic&gt;", correct: false },
      { text: "&lt;image&gt;", correct: false },
      { text: "&lt;img&gt;", correct: true },
      { text: "&lt;pic&gt;", correct: false },
    ],
  },
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyper Text Makeup Language", correct: false },
    ],
  },
  {
    question: "Which tag is used to insert a line break?",
    answers: [
      { text: "&lt;break&gt;", correct: false },
      { text: "&lt;lb&gt;", correct: false },
      { text: "&lt;br&gt;", correct: true },
      { text: "&lt;newline&gt;", correct: false },
    ],
  },
  {
    question: "Which tag is used to define a hyperlink in HTML?",
    answers: [
      { text: "&lt;link&gt;", correct: false },
      { text: "&lt;a&gt;", correct: true },
      { text: "&lt;href&gt;", correct: false },
      { text: "&lt;hyper&gt;", correct: false },
    ],
  },
  {
    question: "Where is the correct place to insert the <title> tag?",
    answers: [
      { text: "In the &lt;body&gt; section", correct: false },
      { text: "In the &lt;head&gt; section", correct: true },
      { text: "Before &lt;html&gt;", correct: false },
      { text: "After the &lt;footer&gt;", correct: false },
    ],
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Color Style Sheets", correct: false },
      { text: "Creative Style System", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Computer Style Sheets", correct: false },
    ],
  },
  {
    question: "Which HTML tag is used to link an external CSS file?",
    answers: [
      { text: "&lt;style&gt;", correct: false },
      { text: "&lt;css&gt;", correct: false },
      { text: "&lt;link&gt;", correct: true },
      { text: "&lt;script&gt;", correct: false },
    ],
  },
  {
    question: "Which property is used to change the background color?",
    answers: [
      { text: "color", correct: false },
      { text: "background-color", correct: true },
      { text: "bgcolor", correct: false },
      { text: "background", correct: false },
    ],
  },
  {
    question: "Which is the correct CSS syntax to make all <p> elements bold?",
    answers: [
      { text: "p {text:bold;}", correct: false },
      { text: "&lt;p style='font-weight:bold;'&gt;", correct: false },
      { text: "p {font-weight:bold;}", correct: true },
      { text: "bold(p)", correct: false },
    ],
  },
  {
    question: "How do you select an element with ID 'main' in CSS?",
    answers: [
      { text: "#main", correct: true },
      { text: ".main", correct: false },
      { text: "main", correct: false },
      { text: "*main", correct: false },
    ],
  },
  {
    question: "What is the correct way to declare a JavaScript variable?",
    answers: [
      { text: "variable x = 10;", correct: false },
      { text: "var x = 10;", correct: true },
      { text: "int x = 10;", correct: false },
      { text: "x := 10;", correct: false },
    ],
  },
  {
    question:
      "Which of the following is correct to change HTML content with JavaScript?",
    answers: [
      {
        text: "document.getElementById('demo').innerHTML = 'Hello!';",
        correct: true,
      },
      {
        text: "document.getElementByName('demo').innerHTML = 'Hello!';",
        correct: false,
      },
      { text: "#demo.innerHTML = 'Hello!';", correct: false },
      { text: "document.demo.innerHTML = 'Hello!';", correct: false },
    ],
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    answers: [
      { text: "//", correct: true },
      { text: "#", correct: false },
      { text: "&lt;!-- --&gt;", correct: false },
      { text: "**", correct: false },
    ],
  },
  {
    question: "What is the output of typeof '5' in JavaScript?",
    answers: [
      { text: "String", correct: true },
      { text: "Number", correct: false },
      { text: "Integer", correct: false },
      { text: "Undefined", correct: false },
    ],
  },
  {
    question: "Which method is used to log output to the browser console?",
    answers: [
      { text: "console.print()", correct: false },
      { text: "console.log()", correct: true },
      { text: "print.console()", correct: false },
      { text: "log.console()", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextbutton = document.getElementById("next-btn");
const returnBtn = document.getElementById("return-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextbutton.innerHTML = "Next";
  returnBtn.style.display = "none";
  shuffleArray(quizQuestions);
  quizQuestions.forEach((q) => shuffleArray(q.answers));
  showQuestion();
}
function showQuestion() {
  resetState();
  let currentQuestion = quizQuestions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtonsElement.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextbutton.style.display = "none";
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  if (isCorrect) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorrect");
  }
  Array.from(answerButtonsElement.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
    button.disabled = true;
  });
  nextbutton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${quizQuestions.length}!`;
  nextbutton.innerHTML = "Try Again";
  nextbutton.style.display = "block";
  returnBtn.style.display = "block";
}

returnBtn.addEventListener("click", function () {
  location.reload();
});

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const signinContainer = document.getElementById("signin-container");
const signinForm = document.getElementById("signin-form");
const quizContainer = document.getElementById("quiz-container");

signinForm.addEventListener("submit", function (e) {
  e.preventDefault();
  signinContainer.style.display = "none";
  quizContainer.style.display = "block";
  startQuiz();
});

nextbutton.addEventListener("click", () => {
  if (
    nextbutton.innerHTML === "Try Again" ||
    nextbutton.innerHTML === "Play Again"
  ) {
    startQuiz();
    return;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showScore();
  }
});
