// شناسه کاربر
const userID = "Ali123";
let score = 0;

const userScoreSpan = document.getElementById("userScore");
const userPosition = document.getElementById("userPosition");

const getBannerBtn = document.getElementById("getBanner");
const bannerDiv = document.getElementById("bannerLink");
const userBannerInput = document.getElementById("userBanner");
const copyBannerBtn = document.getElementById("copyBanner");

const startQuizBtn = document.getElementById("startQuiz");
const quizSection = document.getElementById("quizSection");
const finishQuizBtn = document.getElementById("finishQuiz");
const resultsSection = document.getElementById("resultsSection");
const resultsDiv = document.getElementById("results");
const questionsDiv = document.getElementById("questions");

// سوالات نمونه
const questions = [
    {q:"سوال اول: ۲+۲؟", a:["۳","۴","۵"], correct:1},
    {q:"سوال دوم: پایتخت ایران؟", a:["تهران","اصفهان","شیراز"], correct:0},
    {q:"سوال سوم: رنگ آسمان؟", a:["سبز","آبی","قرمز"], correct:1},
    {q:"سوال چهارم: ۵*۵؟", a:["۲۰","۲۵","۳۰"], correct:1},
    {q:"سوال پنجم: تعداد روزهای هفته؟", a:["۶","۷","۸"], correct:1}
];

// بروزرسانی امتیاز
function updateScore(points){
    score += points;
    userScoreSpan.textContent = score;
}

// تولید لینک بنر اختصاصی
getBannerBtn.onclick = () => {
    const bannerURL = `https://t.me/Hamserr?start=${userID}`;
    userBannerInput.value = bannerURL;
    bannerDiv.style.display = "block";
};

// کپی لینک به کلیپ‌بورد
copyBannerBtn.onclick = () => {
    userBannerInput.select();
    document.execCommand("copy");
    alert("لینک بنر کپی شد. با اشتراک گذاری، هر عضویت جدید +۱ امتیاز!");
};

// شبیه‌سازی عضویت جدید (هر بار که کاربر لینک ارسال شده عضو شود)
function newMembershipAdded(){
    updateScore(1);
    alert("عضویت جدید تایید شد! +1 امتیاز");
    userPosition.innerHTML = `<h2>جایگاه شما: نفر ${Math.max(1, 10 - Math.floor(score/5))}</h2>
                               <p>امتیاز شما: ${score}</p>
                               <button id="getBanner" class="btn">دریافت بنر اختصاصی برای دعوت</button>`;
}

// شروع مسابقه
startQuizBtn.onclick = () => {
    // بررسی عضویت فرضی
    window.open("https://t.me/Hamserr", "_blank"); // هدایت به کانال برای عضویت
    setTimeout(()=>{ quizSection.style.display="block"; }, 1000); // پس از عضویت
    startQuizBtn.parentElement.style.display="none";
};

// نمایش سوالات
questions.forEach((q,i)=>{
    const div = document.createElement("div");
    div.classList.add("questionCard");
    div.innerHTML = `<p>${q.q}</p>`;
    q.a.forEach((ans,j)=>{
        const btn = document.createElement("button");
        btn.textContent = ans;
        btn.classList.add("btn");
        btn.onclick = () => {
            if(j === q.correct) { updateScore(5); alert("جواب صحیح! +۵ امتیاز"); }
            else alert("متاسفانه جواب شما صحیح نبود.");
        }
        div.appendChild(btn);
    });
    questionsDiv.appendChild(div);
});

// پایان مسابقه
finishQuizBtn.onclick = () => {
    quizSection.style.display="none";
    resultsSection.style.display="block";
    resultsDiv.innerHTML = `<p>امتیاز نهایی شما: ${score}</p>
                            <p>ادامه دهید و بنر خود را برای ارتقای رتبه به دیگران ارسال کنید!</p>`;
};
