// membership.html
document.getElementById('checkMembership')?.addEventListener('click', () => {
    alert("عضویت تایید شد! ادامه به انتخاب کاراکتر...");
    window.location.href = 'character.html';
});

// character.html
const female = document.getElementById('femaleChar');
const male = document.getElementById('maleChar');
const selectedDiv = document.getElementById('selectedCharacter');
let selectedCharacter = '';

female?.addEventListener('click', () => {
    selectedCharacter = 'female';
    selectedDiv.innerHTML = '<img src="assets/characters/female.png" width="80">';
});

male?.addEventListener('click', () => {
    selectedCharacter = 'male';
    selectedDiv.innerHTML = '<img src="assets/characters/male.png" width="80">';
});

document.getElementById('startQuiz')?.addEventListener('click', () => {
    if (!selectedCharacter) {
        alert('لطفاً کاراکتر خود را انتخاب کنید!');
        return;
    }
    localStorage.setItem('selectedCharacter', selectedCharacter);
    window.location.href = 'quiz.html';
});

// quiz.html
document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        alert(`گزینه ${btn.dataset.answer} انتخاب شد`);
    });
});

const avatarDiv = document.getElementById('userAvatar');
const char = localStorage.getItem('selectedCharacter');
if (char) {
    avatarDiv.innerHTML = `<img src="assets/characters/${char}.png" width="50">`;
}

// admin.html
document.getElementById('updateQuiz')?.addEventListener('click', () => {
    const q = document.getElementById('adminQuestion').value;
    const o1 = document.getElementById('adminOption1').value;
    const o2 = document.getElementById('adminOption2').value;
    const o3 = document.getElementById('adminOption3').value;
    const o4 = document.getElementById('adminOption4').value;

    localStorage.setItem('quiz', JSON.stringify({ q, options: [o1,o2,o3,o4] }));
    alert('تغییرات ذخیره شد');
});
