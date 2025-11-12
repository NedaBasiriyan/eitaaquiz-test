/* ================================
   📘 فایل: quiz.js
   نسخه نهایی مسابقه حقوقی
   نویسنده: ندا بصیریان
   ================================ */

// 🔸 پیش‌نیاز: پیکربندی از admin ذخیره شده در localStorage
const cfg = JSON.parse(localStorage.getItem('quizConfig') || '{}');

// 🔸 بررسی عضویت واقعی در کانال
if (!localStorage.getItem('joinedChannel') || localStorage.getItem('joinedChannel') !== 'true') {
  window.location.href = 'join.html';
  throw new Error('❌ کاربر عضو کانال نیست');
}

// ------------------------------
// 🧩 متغیرهای پایه
// ------------------------------
let current = 0;
let score = Number(localStorage.getItem('ongoingScore') || 0);
const questionCard = document.getElementById('question-card');
const questionText = document.getElementById('question');
const answersDiv = document.getElementById('answers');
const liveScore = document.getElementById('live-score');

// 🔸 سوالات مسابقه
const questions = [
  {
    text: "کدام‌یک از موارد زیر از منابع اصلی حقوق ایران نیست؟",
    options: ["قرآن", "سنت", "عرف", "منطق"],
    answer: 3,
    score: 5
  },
  {
    text: "در حقوق مدنی، اهلیت به چه معناست؟",
    options: ["توانایی انجام اعمال حقوقی", "داشتن شغل", "شناخت قوانین", "داشتن سواد حقوقی"],
    answer: 0,
    score: 5
  },
  {
    text: "در عقد نکاح، مهر باید چه ویژگی داشته باشد؟",
    options: ["قابل تملک باشد", "خیالی باشد", "نامحدود باشد", "شرط ندارد"],
    answer: 0,
    score: 5
  },
  {
    text: "قانون اساسی ایران در چه سالی تصویب شد؟",
    options: ["۱۳۵۸", "۱۳۶۸", "۱۳۴۲", "۱۳۵۷"],
    answer: 0,
    score: 5
  },
  {
    text: "شخصی که بدون دلیل به دیگری خسارت وارد کند، طبق قانون چه مسئولیتی دارد؟",
    options: ["ضمان قهری", "ضمان قراردادی", "حق فسخ", "بلاعوض"],
    answer: 0,
    score: 5
  },
];

// ------------------------------
// 🧠 توابع نمایش سوال و امتیاز
// ------------------------------
function renderQuestion() {
  if (current >= questions.length) {
    return endQuiz();
  }

  const q = questions[current];
  questionText.innerText = q.text;
  answersDiv.innerHTML = '';

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.innerText = opt;
    btn.onclick = () => handleAnswer(i, btn);
    answersDiv.appendChild(btn);
  });

  liveScore.innerText = score;
}

// ------------------------------
// 🏆 منطق پاسخ به سوالات
// ------------------------------
function handleAnswer(selectedIndex, btn) {
  const q = questions[current];
  const allBtns = answersDiv.querySelectorAll('button');
  allBtns.forEach(b => b.disabled = true);

  if (selectedIndex === q.answer) {
    btn.classList.add('correct');
    score += Number(q.score || 5);
    liveScore.innerText = score;
    showInlineMessage('🎉 آفرین! پاسخ درست بود.', 'success');
  } else {
    btn.classList.add('wrong');
    const correctBtn = answersDiv.querySelectorAll('button')[q.answer];
    if (correctBtn) correctBtn.classList.add('correct');
    showInlineMessage('❗ بیشتر دقت کن — پاسخ غلط بود.', 'error', true);
  }

  localStorage.setItem('ongoingScore', score);

  setTimeout(() => {
    current++;
    fadeOutIn(questionCard, () => {
      renderQuestion();
    });
  }, 900);
}

// ------------------------------
// 💬 نمایش پیام آنی بالای سوال
// ------------------------------
function showInlineMessage(text, type, showGithubLink = false) {
  let el = document.getElementById('inline-msg');
  if (!el) {
    el = document.createElement('div');
    el.id = 'inline-msg';
    el.style.margin = '8px 0';
    el.style.padding = '10px';
    el.style.borderRadius = '10px';
    el.style.fontWeight = '700';
    el.style.textAlign = 'center';
    questionCard.prepend(el);
  }
  el.innerText = text;

  if (type === 'success') {
    el.style.background = 'rgba(0,255,120,0.08)';
    el.style.color = '#cfffdf';
    el.style.border = '1px solid rgba(0,255,120,0.18)';
  } else {
    el.style.background = 'rgba(255,60,60,0.06)';
    el.style.color = '#ffd7d7';
    el.style.border = '1px solid rgba(255,60,60,0.12)';
    if (showGithubLink) {
      const a = document.createElement('a');
      a.href = 'https://github.com/NedaBasiriyan/eitaaquiz-test';
      a.target = '_blank';
      a.innerText = ' راهنمای بیشتر';
      a.style.marginLeft = '8px';
      a.style.color = '#ffd';
      el.appendChild(a);
    }
  }

  setTimeout(() => { if (el) el.remove(); }, 2200);
}

// ------------------------------
// 🌫️ افکت محو برای نمایش سوال بعد
// ------------------------------
function fadeOutIn(el, cb) {
  el.style.transition = 'opacity .25s';
  el.style.opacity = 0;
  setTimeout(() => { cb(); el.style.opacity = 1; }, 260);
}

// ------------------------------
// 🏁 پایان مسابقه و نمایش نتایج
// ------------------------------
function endQuiz() {
  localStorage.setItem('finalScore', score);
  localStorage.removeItem('ongoingScore');

  questionCard.innerHTML = `
    <div class="quiz-end">
      <h2>🎯 مسابقه به پایان رسید</h2>
      <p>امتیاز نهایی شما: <strong>${score}</strong></p>
      <p>رتبه شما در بین شرکت‌کنندگان به زودی اعلام می‌شود.</p>
      <button onclick="location.href='index.html'" class="restart-btn">بازگشت به صفحه اصلی</button>
    </div>
  `;
}

// ------------------------------
// 🚀 شروع مسابقه
// ------------------------------
document.addEventListener('DOMContentLoaded', () => {
  renderQuestion();
});
