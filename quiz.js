let questions = [
  {q:"سوال ۱: ...؟", options:["الف","ب","ج","د"], answer:0, score:10},
  {q:"سوال ۲: ...؟", options:["الف","ب","ج","د"], answer:2, score:10}
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
    btn.onclick = ()=>selectAnswer(i);
    answersDiv.appendChild(btn);
  });
}

function selectAnswer(selected){
  let q = questions[current];
  if(selected === q.answer){
    score += q.score;
    alert('جواب درست!');
  } else alert('جواب اشتباه!');
  document.getElementById('score').innerText = score;
  current++;
  if(current < questions.length) showQuestion();
  else {
    localStorage.setItem('finalScore', score);
    window.location.href = 'result.html';
  }
}
