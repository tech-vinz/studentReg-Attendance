// common.js
// Shared helpers used across all three interfaces.
// Handles the login session guard and the import/export logic that
// treats plain .txt files as the "database".

function requireLogin() {
  if (sessionStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'index.html';
  }
}

function logout() {
  sessionStorage.removeItem('loggedIn');
  sessionStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

// Accounts are kept in the browser's localStorage so a user created on the
// Sign Up page is still there the next time the Login page loads. Seeded
// with the default demo account the first time the app runs.
function getUsers() {
  const raw = localStorage.getItem('users_db');
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (e) {
      // fall through to default seed below
    }
  }
  return [{ username: 'admin', password: 'admin123' }];
}

function saveUsers(users) {
  localStorage.setItem('users_db', JSON.stringify(users));
}

// Reads a .txt file the user picks, splits it into non-empty lines,
// and hands them to a callback that knows how to parse that record type.
function importTextFile(inputEl, onLoaded) {
  const file = inputEl.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result;
    const lines = text.split(/\r?\n/).filter((l) => l.trim() !== '');
    onLoaded(lines);
  };
  reader.readAsText(file);
  inputEl.value = ''; // allow re-importing the same filename later
}

// Turns an array of pipe-delimited strings into a downloadable .txt file,
// simulating "saving" to the text-file database.
function exportTextFile(lines, filename) {
  const text = lines.join('\n');
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
