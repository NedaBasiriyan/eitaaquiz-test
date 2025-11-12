/* quiz.js — منطق مسابقه */
(function(){
  // بررسی عضویت: اگر عضو نشده، بازگرداندن به صفحه عضویت
  const joined = localStorage.getItem('joinedChannel') === 'true';
  if(!joined){
    // اگر از صفحه‌ی join نیامده، هدایت به join.html
    if(location.pathname.endsWith('join.html')===false && location.pathname.endsWith('character.html')===false){
      location.href = 'join.html';
      return;
    }
  }

  // بارگذاری سوال‌ها: اول از localStorage (admin)، در غیر اینصورت از config.json
  async function loadQuestions(){
    const localQs = JSON.parse(localStorage.getItem('quizQuestions') || '[]');
    if(localQs.length>0) return localQs;
    try{
      const res = await fetch('config.json');
      const cfg = await res.json();
      return cfg.questions || [];
    }catch(e){
      console.error('خطا در بارگذاری config.json', e);
      return [];
    }
  }

  // مقداردهی اولیه
  const questionText = document.getElementById('question-text');
  const answersDiv = document.getElementById('answers');
  const liveScore = document.getElementById('live-score');
  const miniWrap = document.getElementById('mini-character-wrap');
  const inviteInput = document.getElementById('invite-link');
  const copyBtn = document.getElementById('copy-invite');

  // نمایش کاراکتر کوچک
  const ch = localStorage.getItem('selectedCharacter') || 'female';
  miniWrap.innerHTML = `<div class="mini-character"><img src="assets/images/character_${ch}.jpeg" alt="کاراکتر"></div>`;

  // لینک دعوت اختصاصی (ذخیره userInviteId برای هر کاربر)
  let userInviteId = localStorage.getItem('userInviteId');
  if(!userInviteId){
    userInviteId = Math.floor(Math.random()*900000+100000).toString();
    localStorage.setItem('userInviteId', userInviteId);
  }
  inviteInput.value = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '/') + 'quiz.html?ref=' + userInviteId;

  copyBtn && copyBtn.addEventListener('click', ()=>{
    inviteInput.select();
    inviteInput.setSelectionRange(0, 99999);
    document.execCommand('copy');
    alert('لینک دعوت کپی شد');
  });

  // مدیریت پارامتر ref: اگر کاربر وارد شده با ?ref=someId و این کاربر عضو شود،
  // صاحبِ لینک باید 1 امتیاز بگیرد — اما از آنجایی که احراز عضویت خارجی نیست،
  // ما یک مکانیزم ساده محلی می‌گذاریم: اگر کاربر با ref بیاید و بعد localStorage
  // نشان دهد که joinedChannel=true، به صاحب لینک (ref) در localStorage یک عدد افزوده می‌شود.
  // (این صرفاً محلی است؛ برای اعتبار واقعی باید سرور/پایگاه داده داشته باشید.)
  (function handleRef(){
    const params = new URLSearchParams(location.search);
    const ref = params.get('ref');
    if(ref && localStorage.getItem('joinedChannel') === 'true'){
      // افزایش شمارنده برای آن ref
      const referrals = JSON.parse(localStorage.getItem('referrals')||'{}');
      referrals[ref] = (referrals[ref]||0) + 1;
      localStorage.setItem('referrals', JSON.stringify(referrals));
      // اعتباردهی: اگر صاحب لینک در همین مرورگر باشد، به او امتیاز می‌دهیم
      // (در پنل می‌توان این را بررسی و اعتبارسنجی کرد)
    }
  })();

  // اجرای مسابقه
  let questions = [];
  let current = 0;
  let score = Number(localStorage.getItem('ongoingScore')||0);

  liveScore.innerText = score;

  loadQuestions().then(qs=>{
    questions = qs.length? qs : [
      // پشتیبان در صورت نبود config — همین 5 سوال نمونه حقوقی/آموزشی:
      {q:"اول: چه نهادی در ایران قاضی رسمی است؟", options:["دادگاه","نیروی انتظامی","شهرداری","وزارت فرهنگ"], answer:0, score:5},
      {q:"دوم: مهریه مربوط به چه امری است؟", options:["تعهد مالی همسر","حکم دادگاه","سند رسمی","درخواست وکیل"], answer:0, score:5},
      {q:"سوم: نفقه به چه کسی تعلق می‌گیرد؟", options:["همسر نیازمند","دولت","قاضی","وکیل"], answer:0, score:5},
      {q:"چهارم: میانجیگری معمولاً برای چه کاریست؟", options:["صلح و سازش اختلافات","حکم قطعی","اجرای قانون","بررسی ادله"], answer:0, score:5},
      {q:"پنجم: اولین اقدام در پرونده حقوقی چیست؟", options:["ثبت دادخواست","تهدید","امضای نهایی","تحویل سند"], answer:0, score:5}
    ];
    renderQuestion();
  });

  function renderQuestion(){
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
      btn.style.cursor = 'pointer';
      btn.onclick = ()=>handleAnswer(idx, btn);
      answersDiv.appendChild(btn);
    });
  }

  function handleAnswer(selectedIndex, btn){
    const q = questions[current];
    // جلوگیری از کلیک‌های متعدد
    const allBtns = answersDiv.querySelectorAll('button');
    allBtns.forEach(b=>b.disabled = true);

    if(selectedIndex === q.answer){
      // نمایش تشویق بصری و امتیازدهی
      btn.classList.add('correct');
      score += Number(q.score || 5);
      liveScore.innerText = score;
      // افکت کوتاه
    } else {
      btn.classList.add('wrong');
      // نشان‌دادن پاسخ درست
      const correctBtn = answersDiv.querySelectorAll('button')[q.answer];
      if(correctBtn) correctBtn.classList.add('correct');
      // هشدار کوتاه
      setTimeout(()=>{ alert('متأسفانه جواب شما صحیح نبود…'); }, 80);
    }

    // ذخیره وضعیت جاری در localStorage تا در بارگذاری مجدد حفظ شود
    localStorage.setItem('ongoingScore', score);

    // بعد از تأخیر کوتاه به سوال بعدی
    setTimeout(()=>{
      current++;
      renderQuestion();
    }, 900);
  }

  function finishQuiz(){
    // اعمال امتیازات ناشی از دعوت (referrals)
    const referrals = JSON.parse(localStorage.getItem('referrals')||'{}');
    const myRefCount = referrals[userInviteId] || 0;
    // به ازای هر عضویتِ واقعیِ ادعاشده، 1 امتیاز اضافه می‌کنیم
    if(myRefCount>0){
      score += myRefCount; // هر عضویت = 1 امتیاز طبق ساختار
    }
    localStorage.setItem('finalScore', score);
    // پاک‌کردن متغیرهای موقت
    localStorage.removeItem('ongoingScore');
    // هدایت به صفحه نتیجه
    window.location.href = 'result.html';
  }

})();
