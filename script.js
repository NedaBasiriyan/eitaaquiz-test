// پنل مدیریتی
let adminPanel = document.getElementById("admin-panel");

// سوالات پیش‌فرض
let quizData = [{"question":"اولین سوال؟","options":["گزینه ۱","گزینه ۲"],"answer":0}];

// نمایش دکمه شروع پس از کلیک روی عضویت
const joinBtn = document.getElementById("join-channel-btn");
const startBtn = document.getElementById("start-btn");

joinBtn.addEventListener("click", () => {
  alert("بعد از عضویت در کانال، دکمه شروع مسابقه فعال خواهد شد.");
  startBtn.disabled = false;
});

// شروع مسابقه
startBtn.addEventListener("click", () => {
  document.getElementById("welcome-screen").classList.add("hidden");
  document.getElementById("character-screen").classList.remove("hidden");
});

// انتخاب کاراکتر
const characters = document.querySelectorAll(".character");
characters.forEach(c => {
  c.addEventListener("click", () => {
    const gender = c.dataset.gender;
    document.getElementById("character-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");
    document.getElementById("selected-character").src = c.src;
    loadQuestions();
  });
});

function loadQuestions() {
  const container = document.getElementById("questions-container");
  container.innerHTML = "";
  quizData.forEach((q, i) => {
    let qDiv = document.createElement("div");
    qDiv.innerHTML = `<p>${i+1}. ${q.question}</p>`;
    q.options.forEach((opt, idx) => {
      let btn = document.createElement("button");
      btn.textContent = opt;
      btn.addEventListener("click", () => {
        if(idx === q.answer) alert("پاسخ درست!");
        else alert("پاسخ غلط!");
      });
      qDiv.appendChild(btn);
    });
    container.appendChild(qDiv);
  });
}

// پنل مدیریت
document.getElementById("admin-save-btn").addEventListener("click", () => {
  const channelLink = document.getElementById("admin-channel-link").value;
  joinBtn.href = channelLink;
  quizData = JSON.parse(document.getElementById("admin-questions").value);
  alert("تنظیمات ذخیره شد!");
});
