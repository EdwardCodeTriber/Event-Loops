const readlineSync = require("readline-sync");

// Questions
const questions = [
  { question: "What is 2 + 2?", answer: "4", timeLimit: 10 },
  {
    question: "What is the capital of France?",
    answer: "Paris",
    timeLimit: 10,
  },
  { question: "What is the color of the sky?", answer: "blue", timeLimit: 10 },
  {
    question: "What is the Best car in the world?",
    answer: "BMW",
    timeLimit: 10,
  },
  {
    question: "What is the full name for this accronim www?",
    answer: "world wide web",
    timeLimit: 10,
  },
  {
    question:
      "Which world statesman and national hero was formerly known as Prisoner 46664?",
    answer: "Nelson Mandela",
    timeLimit: 10,
  },
  {
    question: "In what country is the Mercedes Benz company based?",
    answer: "germany",
    timeLimit: 10,
  },
  {
    question: "What is the longest line of constant latitude of the Earth?",
    answer: "Equator",
    timeLimit: 10,
  },
  {
    question: "The symbol for which car manufacturer is four linked circles?",
    answer: "Audi",
    timeLimit: 10,
  },
  {
    question: "Who was the favourite president in RSA?",
    answer: "Zuma",
    timeLimit: 10,
  },
];

let score = 0;
// total quiz duration in seconds
let totalQuizTime = 100;

// Countdown Timer
const startQuiz = () => {
  let remainingQuizTime = totalQuizTime;

  const quizTimer = setInterval(() => {
    remainingQuizTime--;
    console.log(`Remaining quiz time: ${remainingQuizTime}s`);

    if (remainingQuizTime <= 0) {
      clearInterval(quizTimer);
      console.log("Time is up! Quiz ended.");
      console.log(`Your final score: ${score}`);
      process.exit();
    }
  }, 2000);

  askQuestion(0, quizTimer);
};

// Asynchronously ask questions
const askQuestion = (index, quizTimer) => {
    if (index >= questions.length) {
      clearInterval(quizTimer);
      console.log(`Quiz finished! Your final score: ${score}`);
      process.exit();
    }
  
    const currentQuestion = questions[index];
    console.log(`\nQuestion: ${currentQuestion.question}`);
  
    let questionTime = currentQuestion.timeLimit;
  
    const questionTimer = setInterval(() => {
      questionTime--;
      console.log(`Remaining time for this question: ${questionTime}s`);
  
      if (questionTime <= 0) {
        clearInterval(questionTimer);
        console.log("Time's up for this question!");
        // Move to next question
        askQuestion(index + 1, quizTimer);
      }
    }, 1000);
  
    const answer = readlineSync.question("Your answer: ", {
      timeout: currentQuestion.timeLimit * 1000,
      defaultInput: "",
    });
  
    clearInterval(questionTimer);
  
    if (answer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
      console.log("Correct!");
      score++;
    } else {
      console.log("Incorrect!");
    }
  
    askQuestion(index + 1, quizTimer);
  };
  
  // Start the quiz
  console.log("Starting the quiz...");
  startQuiz();
  