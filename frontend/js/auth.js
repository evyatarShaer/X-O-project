document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.querySelector('.register');
  const loginForm = document.querySelector('.login');
  const showRegisterLink = document.getElementById('show-register');
  const showLoginLink = document.getElementById('show-login');
  const gameContainer = document.querySelector('.container-game');
  const authContainer = document.getElementById('auth-container');
  const logoutButton = document.getElementById('logout-button');

  showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'flex';
  });

  showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display = 'flex';
  });

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    

    console.log('Register form submitted', { username, password });
    

    registerForm.style.display = 'none';
    loginForm.style.display = 'flex';
  });

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    

    console.log('Login form submitted', { username, password });
    

    authContainer.style.display = 'none';
    gameContainer.style.display = 'flex';
  });

  logoutButton.addEventListener('click', () => {

    gameContainer.style.display = 'none';
    authContainer.style.display = 'block';
    loginForm.style.display = 'flex';
    registerForm.style.display = 'none';

    loginForm.reset();
    registerForm.reset();
  });
});