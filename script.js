function getCookie(cookieName) {

    let cookiesArray = document.cookie.split(';')

    let mainCookie = null

    cookiesArray.some(cookie => {
        if (cookie.includes(cookieName)) {
            mainCookie = cookie.substring(cookie.indexOf('=') + 1)
            return true
        }
    })

    return mainCookie
}

window.addEventListener('load', () => {

    let isLogin = getCookie('login-token')

    if (!isLogin) {
        location.href = 'index.html'
    }
})

const startBtn = document.getElementById('start-btn');
const quizContainer = document.querySelector('.quiz-container');
const quizStart = document.querySelector('.quiz-start');
const questionBox = document.getElementById('question-box');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const resultBox = document.getElementById('result');
const timerDisplay = document.getElementById('timer');

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;

const questions = [
    { q: '1. پایتخت ایران؟', options: ['شیراز', 'تهران', 'مشهد'], answer: 1 },
    { q: '2. حاصل 3 * 3؟', options: ['6', '9', '12'], answer: 1 },
    { q: '3. رنگ پرچم ایران؟', options: ['آبی', 'قرمز،سفید،سبز', 'زرد'], answer: 1 },
    { q: '4. پدر زبان فارسی؟', options: ['سعدی', 'فردوسی', 'خیام'], answer: 1 },
    { q: '5. بزرگترین سیاره؟', options: ['زمین', 'زحل', 'مشتری'], answer: 2 },
    { q: '6. پایتخت فرانسه؟', options: ['پاریس', 'رم', 'برلین'], answer: 0 },
    { q: '7. تعداد قاره‌ها؟', options: ['۵', '۶', '۷'], answer: 2 },
    { q: '8. زبان HTML برای؟', options: ['طراحی وب', 'حسابداری', 'ویرایش عکس'], answer: 0 },
    { q: '9. بنیان‌گذار اپل؟', options: ['ایلان ماسک', 'استیو جابز', 'بیل گیتس'], answer: 1 },
    { q: '10. نماد آب در شیمی؟', options: ['H2O', 'CO2', 'NaCl'], answer: 0 }
];

let userAnswers = Array(questions.length).fill(null);

// شروع آزمون
startBtn.addEventListener('click', () => {
    quizStart.style.display = 'none';
    quizContainer.style.display = 'block';
    startTimer();
    showQuestion();
});

function startTimer() {
    let timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `زمان باقی‌مانده: ${timeLeft} ثانیه`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            finishQuiz();
        }
    }, 1000);
}

function showQuestion() {
    const q = questions[currentQuestion];
    questionBox.innerHTML = `
    <p>${q.q}</p>
    ${q.options
            .map(
                (opt, i) =>
                    `<label>
            <input type="radio" name="answer" value="${i}" ${userAnswers[currentQuestion] == i ? 'checked' : ''}>
            ${opt}
          </label><br>`
            )
            .join('')}
  `;

    prevBtn.style.display = currentQuestion === 0 ? 'none' : 'inline-block';
    nextBtn.style.display = currentQuestion === questions.length - 1 ? 'none' : 'inline-block';
    submitBtn.style.display = currentQuestion === questions.length - 1 ? 'inline-block' : 'none';
}

questionBox.addEventListener('change', (e) => {
    if (e.target.name === 'answer') {
        userAnswers[currentQuestion] = parseInt(e.target.value);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
});

submitBtn.addEventListener('click', finishQuiz);

function finishQuiz() {
    let finalScore = 0;
    userAnswers.forEach((ans, idx) => {
        if (ans === questions[idx].answer) finalScore++;
    });
    quizContainer.innerHTML = `<h2>آزمون پایان یافت</h2><p>امتیاز شما: ${finalScore} از ${questions.length}</p>`;
}
