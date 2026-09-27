// signup.js
function handleSignup(event) {
  event.preventDefault();

  const username = document.getElementById('newUsername').value.trim();
  const password = document.getElementById('newPassword').value;
  const confirm = document.getElementById('confirmPassword').value;
  const errorEl = document.getElementById('signupError');
  errorEl.textContent = '';

  if (!username || !password) {
    errorEl.textContent = 'Username and password are required.';
    return;
  }
  if (password !== confirm) {
    errorEl.textContent = 'Passwords do not match.';
    return;
  }

  const users = getUsers();
  if (users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
    errorEl.textContent = 'That username is already taken.';
    return;
  }

  users.push({ username, password });
  saveUsers(users);

  alert('Account created! You can now log in as ' + username + '.');
  window.location.href = 'index.html';
}
