// login.js
function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const users = getUsers();
  const found = users.find((u) => u.username === username && u.password === password);
  const errorEl = document.getElementById('loginError');

  if (found) {
    sessionStorage.setItem('loggedIn', 'true');
    sessionStorage.setItem('currentUser', username);
    window.location.href = 'students.html';
  } else {
    errorEl.textContent = 'Invalid username or password.';
  }
}

function handleExit() {
  if (confirm('Exit the application?')) {
    document.body.innerHTML = '<div class="exit-message"><h2>You may now close this tab.</h2></div>';
  }
}
