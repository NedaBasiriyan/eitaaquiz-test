/* quiz.js — منطق مسابقه با پیام تشویق و هشدار اصلاح شده */
(function(){

// بررسی عضویت: اگر عضو نشده، بازگرداندن به صفحه عضویت
const joined = localStorage.getItem('joinedChannel') === 'true';
if(!joined){
  if(!location.pathname.endsWith('join.html') && !location.pathname.endsWith('character.html')){
    location.href = 'join.html';
    return;
  }
}

// بارگذاری سوال‌ها: اول از localStorage (admin)، در غیر اینصورت از config.json
async function loadQuestions(){
  const localQs = JSON.parse(localStorage.getItem('quizQuestions') || '[]');
  if(localQs.length > 0) return localQs;
  try{
    const res = await fetch('config.json');
    const cfg = await res.json();
    return cfg.questions || [];
  }catch(e){
    console.error('خطا در بارگذاری config.json', e);
    return [];
  }
}

// المنت‌ها
const questionText = document.getElementById('question-text');
const answersDiv = document.getElementById('answers');
const liveScore = document.getElementById('live-score');
const miniWrap = document.getElementById('mini-character-wrap');
const inviteInput = document.getElementById('invite-link');
const copyBtn = document.getElementById('copy-invite');
const feedbackDiv = document.getElementById('feedback');

// نمایش کاراکتر کوچک
const ch = localStorage.getItem('selectedCharacter') || 'female';
miniWrap.innerHTML = `<div class="mini-character"><img src="assets/images/character_${ch}.jpeg" alt="کاراکتر"></div>`;

// لینک دعوت اختصاصی
let userInviteId = localStorage.getItem('userInviteId');
if(!userInviteId){
  userInviteId = Math.floor(Math.random()*900000+100000).toString();
  localStorage.setItem('userInviteId', userInviteId);
}
inviteInput.value = window.location.origin + window.location.pathname.replace(/[^/]*$/, '') + 'quiz.html?ref=' + userInviteId;

copyBtn && copyBtn.addEventListener('click', ()=>{
  inviteInput.select();
  inviteInput.setSelectionRange(0, 99999);
  document.execCommand('copy');
  alert('لینک دعوت کپی شد');
});

// مدیریت پارامتر ref
(function handleRef(){
  const params = new URLSearchParams(location.search);
  const ref = params.get('ref');
  if(ref && localStorage.getItem('joinedChannel') === 'true'){
    const referrals = JSON.parse(localStorage.getItem('referrals')||'{}');
    referrals[ref] = (referrals[ref]||0) + 1;
    localStorage.setItem('referrals', JSON.stringify(referrals));
  }
})();

// اجرای مسابقه
let questions = [];
let current = 0;
let score = Number(localStorage.getItem('ongoingScore')||0);

liveScore.innerText = score;

loadQuestions().then(qs=>{
  questions = qs.length ? qs : [
    {q:"اول: چه نهادی در ایران قاضی رسمی است؟", options:["دادگاه","نیروی انتظامی","شهرداری","وزارت فرهنگ"], answer:0, score:5},
    {q:"دوم: مهریه مربوط به چه امری است؟", options:["تعهد مالی همسر","حکم دادگاه","سند رسمی","درخواست وکیل"], answer:0, score:5},
    {q:"سوم: نفقه به چه کسی تعلق می‌گیرد؟", options:["همسر نیازمند","دولت","قاضی","وکیل"], answer:0, score:5},
    {q:"چهارم: میانجیگری معمولاً برای چه کاریست؟", options:["صلح و سازش اختلافات","حکم قطعی","اجرای قانون","بررسی ادله"], answer:0, score:5},
    {q:"پنجم: اولین اقدام در پرونده حقوقی چیست؟", options:["ثبت دادخواست","تهدید","امضای نهایی","تحویل سند"], answer:0, score:5}
  ];
  renderQuestion();
});

function renderQuestion(){
  feedbackDiv.innerHTML = '';
  if(current >= questions.length){
    finishQuiz();
    return;
  }
  const q = questions[current];
  questionText.innerText = q.q;
  answersDiv.innerHTML = '';
  q.options.forEach((opt, idx)=>{
    const btn = document.createElement('button');
    btn.innerText = opt;
    btn.className = 'answer-btn';
    btn.onclick = ()=>handleAnswer(idx, btn);
    answersDiv.appendChild(btn);
  });
}

function handleAnswer(selectedIndex, btn){
  const q = questions[current];
  const allBtns = answersDiv.querySelectorAll('button');
  allBtns.forEach(b=>b.disabled = true);

  if(selectedIndex === q.answer){
    btn.classList.add('correct');
    score += Number(q.score || 5);
    liveScore.innerText = score;
    feedbackDiv.innerHTML = '<span style="color:limegreen">درسته! آفرین 😃</span>';
  } else {
    btn.classList.add('wrong');
    const correctBtn = answersDiv.querySelectorAll('button')[q.answer];
    if(correctBtn) correctBtn.classList.add('correct');
    feedbackDiv.innerHTML = `
      <span style="color:#ff5555">متأسفانه جواب اشتباه بود! بیشتر دقت کنید.</span><br/>
      <a href="https://github.com/" target="_blank">مشاهده جواب صحیح در GitHub</a>
    `;
  }

  localStorage.setItem('ongoingScore', score);

  setTimeout(()=>{
    current++;
    renderQuestion();
  }, 900);
}

function finishQuiz(){
  const referrals = JSON.parse(localStorage.getItem('referrals')||'{}');
  const myRefCount = referrals[userInviteId] || 0;
  if(myRefCount>0){
    score += myRefCount;
  }
  localStorage.setItem('finalScore', score);
  localStorage.removeItem('ongoingScore');
  window.location.href = 'result.html';
}

})();
