document.getElementById("startBtn").addEventListener("click", () => {
  const token = "PASTE_YOUR_APP_TOKEN_HERE"; // 🔹 توکن برنامه کارفرما را اینجا بگذار
  alert("در حال بررسی عضویت شما در کانال...");
  // شبیه‌سازی ورود کاربر
  setTimeout(() => {
    alert("✅ عضویت تایید شد! وارد مسابقه شدی.");
    window.location.href = "https://eitaayar.ir/admin/message"; // آدرس صفحه مسابقه
  }, 1500);
});
