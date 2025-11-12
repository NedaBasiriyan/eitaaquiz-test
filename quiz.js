// بارگذاری config از پنل مدیریت
const cfg = JSON.parse(localStorage.getItem('quizConfig') || '{}');
const questions = cfg.questions || [];
let score = Number(localStorage.getItem('ongoingScore') || 0);
let current = Number(localStorage.getItem('currentQuestion') || 0);

const questionCard = document.getElementById('questionCard');
const answersDiv = document.getElementById('answers');
const liveScore = document.getElementById('score');

// بررسی عضویت واقعی
if(localStorage.getItem('joinedChannel') !== 'true'){
  window.location.href = 'join.html';
  throw new Error('کاربر عضو کانال نشده');
}

// نمایش سوال
function renderQuestion(){
  if(current >= questions.length){
    localStorage.setItem('ongoingScore', score);
    window.location.href = 'result.html';
    return;
  }
  const q = questions[current];
  questionCard.innerText = q.text;
  answersDiv.innerHTML = '';
  q.options.forEach((opt,i)=>{
    const btn = document.createElement('button');
    btn.innerText = opt;
    btn.onclick = ()=>handleAnswer(i, btn);
    answersDiv.appendChild(btn);
  });
}

// پاسخ به سوال
function handleAnswer(selectedIndex, btn){
  const q = questions[current];
  const allBtns = answersDiv.querySelectorAll('button');
  allBtns.forEach(b=>b.disabled=true);

  if(selectedIndex === q.answer){
    btn.classList.add('correct');
    score += Number(q.score || 5);
    liveScore.innerText = score;
    showInlineMessage('🎉 آفرین! پاسخ درست بود.', 'success');
  } else {
    btn.classList.add('wrong');
    const correctBtn = answersDiv.querySelectorAll('button')[q.answer];
    if(correctBtn) correctBtn.classList.add('correct');
    showInlineMessage('❗ بیشتر دقت کن — پاسخ غلط بود.', 'error', true);
  }

  localStorage.setItem('ongoingScore', score);
  localStorage.setItem('currentQuestion', current);

  setTimeout(()=>{
    current++;
    fadeOutIn(questionCard, ()=>{
      renderQuestion();
    });
  }, 900);
}

// پیام آنی بالای سوال
function showInlineMessage(text, type, showGithubLink=false){
  let el = document.getElementById('inline-msg');
  if(!el){
    el = document.createElement('div');
    el.id = 'inline-msg';
    el.style.margin='8px 0';
    el.style.padding='10px';
    el.style.borderRadius='10px';
    el.style.fontWeight='700';
    el.style.textAlign='center';
    questionCard.prepend(el);
  }
  el.innerText = text;
  if(type==='success'){
    el.style.background='rgba(0,255,120,0.08)';
    el.style.color='#cfffdf';
    el.style.border='1px solid rgba(0,255,120,0.18)';
  } else {
    el.style.background='rgba(255,60,60,0.06)';
    el.style.color='#ffd7d7';
    el.style.border='1px solid rgba(255,60,60,0.12)';
    if(showGithubLink){
      const a = document.createElement('a');
      a.href='https://github.com/NedaBasiriyan/eitaaquiz-test';
      a.target='_blank';
      a.innerText=' راهنمای بیشتر';
      a.style.marginLeft='8px';
      a.style.color='#ffd';
      el.appendChild(a);
    }
  }
  setTimeout(()=>{ if(el) el.remove(); }, 2200);
}

function fadeOutIn(el, cb){
  el.style.transition='opacity .25s';
  el.style.opacity=0;
  setTimeout(()=>{ cb(); el.style.opacity=1; }, 260);
}

// شروع سوالات
renderQuestion();
