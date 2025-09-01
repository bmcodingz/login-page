const doc = document;
const usernameInput = doc.querySelector('#username');
const passwordInput = doc.querySelector('#password');
const rememberMeCheckbox = doc.querySelector('.check');
const loginBtn = doc.querySelector('button');

function setCookie(cookieName, cookieValue, exDay) {

    const now = new Date();
    now.setTime(now.getTime() + exDay * 24 * 60 * 60 * 1000);
    document.cookie = `${cookieName}=${cookieValue};path=/;expires=${now.toUTCString()}`;
}

loginBtn.addEventListener('click', event => {
    
    event.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem('user-info'));

    const inputUsername = usernameInput.value.trim();
    const inputPassword = passwordInput.value.trim();

    if (
        savedUser &&
        inputUsername === savedUser.username &&
        inputPassword === savedUser.password
    ) {
        if (rememberMeCheckbox.checked) {
            setCookie('login-token', inputUsername, 10);
        }

        location.href = 'index.html'; // ورود موفق
    } else {
        alert('شما ثبت‌نام نکرده‌اید یا اطلاعات نادرست است.');
    }
});
