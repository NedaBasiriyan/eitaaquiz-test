let config = {}; 
fetch('config.json')
.then(res => res.json())
.then(data => {
    config = data;
    startQuiz();
});

let current = 0;
let score = 0;

function startQuiz(){
    showQuestion(current);
}

function showQuestion(index){
    const q = config.questions[index];
    const qBox = document.getElementById('question-box');
    qBox.innerHTML = `<h2>${q.text}</h2>`;
    const oBox = document.getElementById('options-box');
    oBox.innerHTML = '';
    q.options.forEach((opt, i)=>{
        let btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = ()=> checkAnswer(i, q.answer, q.points);
        oBox.appendChild(btn);
    });
}

function checkAnswer(selected, correct, points){
    if(selected === correct){
        score += points;
        alert("جواب درست! امتیاز شما: " + score);
    } else {
        alert("جواب اشتباه!");
    }
    current++;
    if(current < config.questions.length){
        showQuestion(current);
    } else {
        localStorage.setItem('finalScore', score);
        window.location.href = 'result.html';
    }
}
