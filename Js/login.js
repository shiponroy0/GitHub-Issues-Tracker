const getInputUserName = document.getElementById('inputUserName');
const getInputPassword = document.getElementById('inputPassword');
const signButton = document.getElementById('loginButton');

// check Password
signButton.addEventListener('click', () => {
  if (
    getInputUserName.value === 'admin' &&
    getInputPassword.value === 'admin123'
  ) {
    alert('Login Success');
    window.location.assign('../Html/home.html');
  } else {
    alert('Login Failed');
  }
});
