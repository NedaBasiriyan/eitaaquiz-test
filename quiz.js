// پیش‌نیاز: config در localStorage از admin بارگذاری شده باشد
const cfg = JSON.parse(localStorage.getItem('quizConfig') || '{}');

// بررسی عضویت قوی‌تر: joinedChannel باید true باشد
if(!localStorage.getItem('joinedChannel') || localStorage.getItem('joinedChannel') !== 'true'){
  // فرستادن کاربر به join.html
  window.location.href = 'join.html';
  throw new Error('user not joined');
}

// ... سپس بقیه منطق سوالات

function handleAnswer(selectedIndex, btn){
  const q = questions[current];
  // غیرفعال کردن موقت دکمه‌ها
  const allBtns = answersDiv.querySelectorAll('button');
  allBtns.forEach(b=>b.disabled = true);

  if(selectedIndex === q.answer){
    btn.classList.add('correct');
    score += Number(q.score || 5);
    liveScore.innerText = score;
    // پیام تشویقی
    showInlineMessage('🎉 آفرین! پاسخ درست بود.', 'success');
  } else {
    btn.classList.add('wrong');
    const correctBtn = answersDiv.querySelectorAll('button')[q.answer];
    if(correctBtn) correctBtn.classList.add('correct');
    showInlineMessage('❗ بیشتر دقت کن — پاسخ غلط بود.', 'error', true);
  }

  localStorage.setItem('ongoingScore', score);

  setTimeout(()=>{
    current++;
    // افکت محو و نمایش سوال بعد
    fadeOutIn(questionCard, ()=>{
      renderQuestion();
    });
  }, 900);
}

// نمایش پیام آنی بالای سوال
function showInlineMessage(text, type, showGithubLink=false){
  let el = document.getElementById('inline-msg');
  if(!el){
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
  if(type==='success'){
    el.style.background = 'rgba(0,255,120,0.08)';
    el.style.color = '#cfffdf';
    el.style.border = '1px solid rgba(0,255,120,0.18)';
  } else {
    el.style.background = 'rgba(255,60,60,0.06)';
    el.style.color = '#ffd7d7';
    el.style.border = '1px solid rgba(255,60,60,0.12)';
    if(showGithubLink){
      // لینک گیت‌هاب برای کمک به کاربر (مثلاً راهنمای بیشتر)
      const a = document.createElement('a');
      a.href = 'https://github.com/NedaBasiriyan/eitaaquiz-test';
      a.target = '_blank';
      a.innerText = ' راهنمای بیشتر';
      a.style.marginLeft = '8px';
      a.style.color = '#ffd';
      el.appendChild(a);
    }
  }
  // ناپدید شدن خودکار بعد از 2 ثانیه
  setTimeout(()=>{ if(el) el.remove(); }, 2200);
}

function fadeOutIn(el, cb){
  el.style.transition = 'opacity .25s';
  el.style.opacity = 0;
  setTimeout(()=>{ cb(); el.style.opacity = 1; }, 260);
}
