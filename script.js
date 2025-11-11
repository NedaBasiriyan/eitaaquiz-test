const joinBtn = document.getElementById('joinChannelBtn');
const startBtn = document.getElementById('startQuizBtn');

// شبیه‌سازی بررسی عضویت در کانال
let isMember = false;

joinBtn.addEventListener('click', () => {
    // هدایت کاربر به کانال ایتا
    window.open('https://t.me/Hamserr', '_blank');

    // پس از برگشت، بررسی عضویت (شبیه‌سازی)
    setTimeout(() => {
        isMember = true; // فرض می‌کنیم کاربر عضو شده است
        if(isMember) {
            alert('عضویت تایید شد، حالا می‌توانید مسابقه را شروع کنید.');
            startBtn.disabled = false;
        } else {
            alert('برای ادامه، باید عضو کانال شوید.');
        }
    }, 2000);
});

startBtn.addEventListener('click', () => {
    alert('مسابقه شروع شد!');
    // اینجا می‌توان به صفحه سوالات هدایت کرد یا نمایش داد
});
