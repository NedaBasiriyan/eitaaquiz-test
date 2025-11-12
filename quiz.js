const questions = [
  {
    text: "اولین سوال چیست؟",
    answers: ["گزینه 1", "گزینه 2", "گزینه 3", "گزینه 4"],
    correct: 1
  },
  {
    text: "سوال دوم؟",
    answers: ["الف", "ب", "ج", "د"],
    correct: 0
  },
  // سوالات بیشتر را اینجا اضافه کنید
];

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById('question-text');
const answerBtns = document.querySelectorAll('.answer-btn');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');

function loadQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.text;
  answerBtns.forEach((btn, i) => {
    btn.textContent = q.answers[i];
    btn.disabled = false;
    btn.style.backgroundColor = "";
  });
  feedback.textContent = "";
}

answerBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const answerIndex = parseInt(btn.dataset.answer);
    const q = questions[currentQuestion];

    if(answerIndex === q.correct){
      btn.style.backgroundColor = "green";
      feedback.textContent = "پاسخ درست!";
      score += 10;
    } else {
      btn.style.backgroundColor = "red";
      feedback.textContent = "پاسخ غلط!";
    }

    scoreDisplay.textContent = "امتیاز: " + score;
    answerBtns.forEach(b => b.disabled = true);

    setTimeout(() => {
      currentQuestion++;
      if(currentQuestion < questions.length){
        loadQuestion();
      } else {
        localStorage.setItem('finalScore', score);
        window.location.href = "result.html";
      }
    }, 1000);
  });
});

loadQuestion();
