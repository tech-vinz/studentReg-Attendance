// students.js
requireLogin();

// Default data mirrors the sample students.txt so the table isn't empty
// the first time the page opens.
let students = [
  { id: '2026-001', name: 'Juan Dela Cruz', age: '18', gender: 'Male', course: 'BSIT', section: '1A', contact: '09123456789' },
  { id: '2026-002', name: 'Maria Santos', age: '19', gender: 'Female', course: 'BSIT', section: '1A', contact: '09987654321' },
];

let selectedId = null; // tracks the row currently loaded into the form

function renderStudents() {
  const q = document.getElementById('searchBox').value.trim().toLowerCase();
  const tbody = document.querySelector('#studentsTable tbody');
  tbody.innerHTML = '';

  const filtered = students.filter(
    (s) => !q || s.id.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
  );

  filtered.forEach((s) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${s.id}</td><td>${s.name}</td><td>${s.age}</td><td>${s.gender}</td><td>${s.course}</td><td>${s.section}</td><td>${s.contact}</td>`;
    tr.onclick = () => selectStudent(s.id);
    tbody.appendChild(tr);
  });

  document.getElementById('rowCount').textContent = `${filtered.length} record(s)`;
}

function selectStudent(id) {
  const s = students.find((x) => x.id === id);
  if (!s) return;
  selectedId = id;
  document.getElementById('sId').value = s.id;
  document.getElementById('sName').value = s.name;
  document.getElementById('sAge').value = s.age;
  document.getElementById('sGender').value = s.gender;
  document.getElementById('sCourse').value = s.course;
  document.getElementById('sSection').value = s.section;
  document.getElementById('sContact').value = s.contact;
}

function getFormStudent() {
  return {
    id: document.getElementById('sId').value.trim(),
    name: document.getElementById('sName').value.trim(),
    age: document.getElementById('sAge').value.trim(),
    gender: document.getElementById('sGender').value,
    course: document.getElementById('sCourse').value.trim(),
    section: document.getElementById('sSection').value.trim(),
    contact: document.getElementById('sContact').value.trim(),
  };
}

function addStudent() {
  const s = getFormStudent();
  if (!s.id || !s.name) {
    alert('Student ID and Full Name are required.');
    return;
  }
  if (students.some((x) => x.id === s.id)) {
    alert('A student with this ID already exists. Use Update instead.');
    return;
  }
  students.push(s);
  clearStudentForm();
  renderStudents();
}

function updateStudent() {
  const s = getFormStudent();
  const targetId = selectedId || s.id;
  const idx = students.findIndex((x) => x.id === targetId);
  if (idx === -1) {
    alert('Select a student from the table (or enter an existing Student ID) first.');
    return;
  }
  students[idx] = s;
  clearStudentForm();
  renderStudents();
}

function deleteStudent() {
  const id = selectedId || document.getElementById('sId').value.trim();
  if (!id) {
    alert('Select a student to delete.');
    return;
  }
  if (!confirm(`Delete student ${id}?`)) return;
  students = students.filter((x) => x.id !== id);
  clearStudentForm();
  renderStudents();
}

function clearStudentForm() {
  selectedId = null;
  document.getElementById('studentForm').reset();
}

function handleImportStudents(inputEl) {
  importTextFile(inputEl, (lines) => {
    students = lines.map((line) => {
      const [id, name, age, gender, course, section, contact] = line.split('|');
      return { id, name, age, gender, course, section, contact };
    });
    renderStudents();
    alert(`Imported ${students.length} student record(s) from students.txt`);
  });
}

function handleExportStudents() {
  const lines = students.map((s) =>
    [s.id, s.name, s.age, s.gender, s.course, s.section, s.contact].join('|')
  );
  exportTextFile(lines, 'students.txt');
}

document.addEventListener('DOMContentLoaded', renderStudents);
