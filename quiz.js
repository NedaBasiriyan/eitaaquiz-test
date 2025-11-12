let questions = [
  {q:"سوال ۱: پایتخت ایران چیست؟", options:["تهران","اصفهان","شیراز","مشهد"], answer:0, score:10},
  {q:"سوال ۲: بزرگترین دریاچه جهان کدام است؟", options:["کاسپین","خزر","سوپریور","ویکتوریا"], answer:0, score:10},
  {q:"سوال ۳: عنصر شیمیایی با علامت O چیست؟", options:["طلا","اکسیژن","هیدروژن","نقره"], answer:1, score:10},
  {q:"سوال ۴: مشهورترین شاعر ایران کیست؟", options:["سعدی","حافظ","فردوسی","مولانا"], answer:2, score:10},
  {q:"سوال ۵: عدد پی تقریبا برابر است با؟", options:["3.14","2.71","1.61","1.41"], answer:0, score:10}
];

let current = 0;
let score = 0;

function startQuiz(){
  showQuestion();
}

function showQuestion(){
  let q = questions[current];
  document.getElementById('question-text').innerText = q.q;
  let answersDiv = document.getElementById('answers');
  answersDiv.innerHTML = '';
  q.options.forEach((opt,i)=>{
    let btn = document.createElement('button');
    btn.innerText = opt;
    btn.className = "answer-btn";
    btn.onclick = ()=>selectAnswer(i, btn);
    answersDiv.appendChild(btn);
  });
}

function selectAnswer(selected, btn){
  let q = questions[current];
  if(selected === q.answer){
    score += q.score;
    btn.style.background = "#0f0"; // سبز برای درست
  } else {
    btn.style.background = "#f00"; // قرمز برای غلط
    let correctBtn = document.getElementsByClassName('answer-btn')[q.answer];
    correctBtn.style.background = "#0f0"; // نشان دادن پاسخ درست
  }
  document.getElementById('score').innerText = score;
  setTimeout(()=>{
    current++;
    if(current < questions.length) showQuestion();
    else finishQuiz();
  }, 800);
}

function finishQuiz(){
  localStorage.setItem('finalScore', score);
  window.location.href = 'result.html';
}
