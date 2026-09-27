// attendance.js
requireLogin();

// Default data mirrors the sample attendance.txt so the table isn't empty
// the first time the page opens. A record is uniquely keyed by (id, date)
// since one student can have many attendance rows across different dates.
let attendance = [
  { id: '2026-001', date: '2026-09-25', status: 'Present', timeIn: '07:30', timeOut: '16:30' },
  { id: '2026-002', date: '2026-09-25', status: 'Late', timeIn: '08:15', timeOut: '16:30' },
];

let selectedKey = null;
const keyOf = (a) => `${a.id}|${a.date}`;

function renderAttendance() {
  const q = document.getElementById('searchBox').value.trim().toLowerCase();
  const tbody = document.querySelector('#attendanceTable tbody');
  tbody.innerHTML = '';

  const filtered = attendance.filter(
    (a) => !q || a.id.toLowerCase().includes(q) || a.date.includes(q)
  );

  filtered.forEach((a) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${a.id}</td><td>${a.date}</td><td class="status-${a.status}">${a.status}</td><td>${a.timeIn}</td><td>${a.timeOut}</td>`;
    tr.onclick = () => selectAttendance(a.id, a.date);
    tbody.appendChild(tr);
  });

  document.getElementById('rowCount').textContent = `${filtered.length} record(s)`;
}

function selectAttendance(id, date) {
  const a = attendance.find((x) => x.id === id && x.date === date);
  if (!a) return;
  selectedKey = keyOf(a);
  document.getElementById('aId').value = a.id;
  document.getElementById('aDate').value = a.date;
  document.getElementById('aStatus').value = a.status;
  document.getElementById('aTimeIn').value = a.timeIn;
  document.getElementById('aTimeOut').value = a.timeOut;
}

function getFormAttendance() {
  return {
    id: document.getElementById('aId').value.trim(),
    date: document.getElementById('aDate').value,
    status: document.getElementById('aStatus').value,
    timeIn: document.getElementById('aTimeIn').value,
    timeOut: document.getElementById('aTimeOut').value,
  };
}

function recordAttendance() {
  const a = getFormAttendance();
  if (!a.id || !a.date) {
    alert('Student ID and Date are required.');
    return;
  }
  if (attendance.some((x) => keyOf(x) === keyOf(a))) {
    alert('A record already exists for this student on this date. Use Update instead.');
    return;
  }
  attendance.push(a);
  clearAttendanceForm();
  renderAttendance();
}

function updateAttendance() {
  const a = getFormAttendance();
  const targetKey = selectedKey || keyOf(a);
  const idx = attendance.findIndex((x) => keyOf(x) === targetKey);
  if (idx === -1) {
    alert('Select a record from the table (or enter an existing Student ID + Date) first.');
    return;
  }
  attendance[idx] = a;
  clearAttendanceForm();
  renderAttendance();
}

function deleteAttendance() {
  const a = getFormAttendance();
  const targetKey = selectedKey || keyOf(a);
  if (!a.id && !selectedKey) {
    alert('Select a record to delete.');
    return;
  }
  if (!confirm('Delete this attendance record?')) return;
  attendance = attendance.filter((x) => keyOf(x) !== targetKey);
  clearAttendanceForm();
  renderAttendance();
}

function clearAttendanceForm() {
  selectedKey = null;
  document.getElementById('attendanceForm').reset();
}

function handleImportAttendance(inputEl) {
  importTextFile(inputEl, (lines) => {
    attendance = lines.map((line) => {
      const [id, date, status, timeIn, timeOut] = line.split('|');
      return { id, date, status, timeIn, timeOut };
    });
    renderAttendance();
    alert(`Imported ${attendance.length} attendance record(s) from attendance.txt`);
  });
}

function handleExportAttendance() {
  const lines = attendance.map((a) => [a.id, a.date, a.status, a.timeIn, a.timeOut].join('|'));
  exportTextFile(lines, 'attendance.txt');
}

document.addEventListener('DOMContentLoaded', renderAttendance);
