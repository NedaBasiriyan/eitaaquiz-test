function handleAnswer(selectedIndex, btn){
  const q = questions[current];
  const allBtns = answersDiv.querySelectorAll('button');
  allBtns.forEach(b=>b.disabled = true);

  const feedbackDiv = document.createElement('div');
  feedbackDiv.style.marginTop = '12px';
  feedbackDiv.style.fontWeight = '600';
  
  if(selectedIndex === q.answer){
    btn.classList.add('correct');
    score += Number(q.score || 5);
    liveScore.innerText = score;
    feedbackDiv.style.color = 'lightgreen';
    feedbackDiv.innerText = '✅ درسته! آفرین!';
  } else {
    btn.classList.add('wrong');
    const correctBtn = answersDiv.querySelectorAll('button')[q.answer];
    if(correctBtn) correctBtn.classList.add('correct');
    feedbackDiv.style.color = 'tomato';
    feedbackDiv.innerHTML = '❌ جواب نادرست! برای مشاهده نمونه جواب و منابع به <a href="https://github.com/NedaBasiriyan/eitaaquiz-test" target="_blank" style="color:#22f0df">گیت‌هاب</a> مراجعه کنید.';
  }

  answersDiv.appendChild(feedbackDiv);

  localStorage.setItem('ongoingScore', score);

  setTimeout(()=>{
      current++;
      renderQuestion();
  }, 1500); // کمی زمان برای مشاهده پیام
}
