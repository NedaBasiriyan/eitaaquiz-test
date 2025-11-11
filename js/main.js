// بررسی عضویت از localStorage
document.addEventListener("DOMContentLoaded", () => {
  const isJoined = localStorage.getItem("joinedChannel");

  const joinBtn = document.querySelector(".btn.join");
  const startBtn = document.querySelector(".btn.start");

  // اگر هنوز عضو نشده، فقط دکمه عضویت فعال است
  if (!isJoined) {
    startBtn.classList.add("disabled");
    startBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("برای شروع مسابقه ابتدا در کانال عضو شوید.");
      window.location.href = "join.html";
    });
  } else {
    startBtn.classList.remove("disabled");
  }

  // وقتی روی دکمه عضویت کلیک شود:
  joinBtn.addEventListener("click", () => {
    window.location.href = "join.html";
  });
});
