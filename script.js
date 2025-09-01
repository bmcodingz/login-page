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
    { q: '1. نقش CPU در کامپیوتر چیست؟', options: ['پردازش اطلاعات', 'ذخیره دائمی اطلاعات', 'چاپ اطلاعات'], answer: 0 },
    { q: '2. RAM چه نوع حافظه‌ای است؟', options: ['حافظه موقت', 'حافظه خارجی', 'حافظه دائمی'], answer: 0 },
    { q: '3. کدام قطعه داده‌ها را برای ذخیره دائمی نگه می‌دارد؟', options: ['RAM', 'هارد دیسک (HDD/SSD)', 'CPU'], answer: 1 },
    { q: '4. وظیفه کارت گرافیک چیست؟', options: ['پردازش تصاویر و ویدیو', 'ذخیره فایل‌ها', 'مدیریت حافظه'], answer: 0 },
    { q: '5. مادربورد چه کاری انجام می‌دهد؟', options: ['ذخیره فایل‌ها', 'چاپ اطلاعات', 'اتصال و هماهنگی بین قطعات'], answer: 2 },
    { q: '6. کدام یک دستگاه ورودی است؟', options: ['مانیتور', 'کیبورد', 'پرینتر'], answer: 1 },
    { q: '7. کدام قطعه برق کامپیوتر را تأمین می‌کند؟', options: ['هارد دیسک', 'مادربورد', 'پاور (Power Supply)'], answer: 2 },
    { q: '8. کدام حافظه سریع‌تر است؟', options: ['فلاپی دیسک', 'HDD', 'SSD'], answer: 2 },
    { q: '9. فن در کامپیوتر چه کاری انجام می‌دهد؟', options: ['خنک کردن قطعات', 'پردازش اطلاعات', 'ذخیره فایل‌ها'], answer: 0 },
    { q: '10. USB چه نوع دستگاهی است؟', options: ['دستگاه ورودی', 'دستگاه خروجی', 'حافظه جانبی'], answer: 2 }
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
