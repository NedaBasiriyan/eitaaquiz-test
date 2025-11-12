const questions = [
    {q: "متن سوال اول", answers: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"], correct: 0},
    {q: "متن سوال دوم", answers: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"], correct: 2},
    {q: "متن سوال سوم", answers: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"], correct: 1},
    {q: "متن سوال چهارم", answers: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"], correct: 3},
    {q: "متن سوال پنجم", answers: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"], correct: 0},
    {q: "متن سوال ششم", answers: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"], correct: 1},
    {q: "متن سوال هفتم", answers: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"], correct: 2},
];

let currentQuestion = 0;
let score = 0;

const questionTitle = document.getElementById("questionTitle");
const questionText = document.getElementById("questionText");
const answersDiv = document.getElementById("answers");
const userPosition = document.getElementById("userPosition");

function showQuestion() {
    const q = questions[currentQuestion];
    questionTitle.textContent = `سوال ${currentQuestion + 1}`;
    questionText.textContent = q.q;
    const buttons = answersDiv.querySelectorAll(".answerBtn");
    buttons.forEach((btn, i) => {
        btn.textContent = q.answers[i];
        btn.onclick = () => checkAnswer(i);
    });
}

function checkAnswer(selected) {
    const correct = questions[currentQuestion].correct;
    if(selected === correct){
        score += 5;
        alert("پاسخ صحیح! +5 امتیاز");
    } else {
        alert("متاسفانه جواب شما صحیح نبود.");
    }
    currentQuestion++;
    if(currentQuestion < questions.length){
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    alert(`مسابقه پایان یافت! امتیاز شما: ${score}`);
    // به روز رسانی جایگاه کاربر و نفرات برتر
    userPosition.innerHTML = `<h2>جایگاه شما: نفر ${Math.max(1, 10 - Math.floor(score/5))}</h2>`;
}

showQuestion();
