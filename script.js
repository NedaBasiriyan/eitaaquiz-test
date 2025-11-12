let selectedCharacter = '';

function selectCharacter(type) {
    selectedCharacter = type;
    alert('شما ' + (type === 'male' ? 'کاراکتر مرد' : 'کاراکتر زن') + ' را انتخاب کردید.');
}

function goToMembership() {
    if (!selectedCharacter) {
        alert('لطفاً یک کاراکتر انتخاب کنید.');
        return;
    }
    // بررسی عضویت ایتا
    let isMember = false; // مقدار واقعی باید از API یا روش ایتا بررسی شود
    if (!isMember) {
        // هدایت به کانال ایتا
        window.location.href = 'https://eitaa.com/hamserr';
        return;
    } else {
        // ادامه مسابقه
        window.location.href = 'quiz.html';
    }
}

// پنل مدیریتی (نمونه ساده برای تست)
let quizQuestions = [
    {question: 'طلاق توافقی چیست؟', options: ['گزینه ۱', 'گزینه ۲', 'گزینه ۳'], answer: 0},
    {question: 'مهریه چیست؟', options: ['گزینه ۱', 'گزینه ۲', 'گزینه ۳'], answer: 1},
    {question: 'نفقه شامل چه مواردی است؟', options: ['گزینه ۱', 'گزینه ۲', 'گزینه ۳'], answer: 2},
    {question: 'خیانت در قانون ایران چه مجازاتی دارد؟', options: ['گزینه ۱', 'گزینه ۲', 'گزینه ۳'], answer: 1},
    {question: 'میانجیگری چیست؟', options: ['گزینه ۱', 'گزینه ۲', 'گزینه ۳'], answer: 0}
];

function getQuizQuestions() {
    return quizQuestions;
}

function addQuestion(q) {
    quizQuestions.push(q);
}

function editQuestion(index, q) {
    quizQuestions[index] = q;
}

function deleteQuestion(index) {
    quizQuestions.splice(index, 1);
}
