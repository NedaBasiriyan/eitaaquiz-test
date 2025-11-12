function selectCharacter(type){
    localStorage.setItem('character', type);
    window.location.href = 'info.html';
}

function checkMembership(){
    // بررسی عضویت کانال از API ایتا
    let joined = false; // تست اولیه
    const joinBtn = document.getElementById('join-channel');
    joinBtn.href = "https://eitaa.com/hamserr";
    if(joined){
        window.location.href = 'quiz.html';
    }
}
