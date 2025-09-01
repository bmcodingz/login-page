const doc = document;
const usernameInput = doc.querySelector('#username');
const passwordInput = doc.querySelector('#password');
const registerBtn = doc.querySelector('button');

registerBtn.addEventListener('click', event => {

    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        alert('لطفاً تمام فیلدها را پر کنید.');
        return;
    }

    const userData = {
        username: username,
        password: password
    };

    localStorage.setItem('user-info', JSON.stringify(userData));

    alert('ثبت‌نام با موفقیت انجام شد!');
    location.href = 'login.html'; // بعد از ثبت‌نام بره به لاگین
});
