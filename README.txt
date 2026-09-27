STUDENT ATTENDANCE & RECORDS MANAGEMENT SYSTEM
Pure HTML / CSS / JavaScript — no server or database engine required.

HOW TO RUN
-----------
1. Unzip all files into one folder (keep them together).
2. Double-click index.html to open it in a browser (Chrome, Edge, or Firefox).
   No installation, server, or internet connection needed.

FILES
-----
index.html       Interface 1 - Login
signup.html      Interface 1b - Sign Up (create a new account)
students.html    Interface 2 - Student Registration (CRUD)
attendance.html  Interface 3 - Attendance Records (CRUD)
style.css        Shared styling for all interfaces
common.js        Shared helpers: login session guard, account storage, text-file import/export
login.js         Login logic
signup.js        Sign Up logic
students.js      Student CRUD logic
attendance.js    Attendance CRUD logic
users.txt        Reference copy of the seed account (username|password)
students.txt     Sample "database" of student records
attendance.txt   Sample "database" of attendance records

ACCOUNTS
--------
The app ships with one seed account:
  Username: admin
  Password: admin123

New accounts are created on the Sign Up page and saved in the browser
(localStorage), so they persist between visits on the same computer/browser.
There is no more manual users.txt import step on the Login page.

HOW THE .TXT "DATABASE" WORKS
------------------------------
A browser page cannot silently read or write files on your computer for
security reasons, so this project uses the standard, honest workaround:

  IMPORT  -> an <input type="file"> lets you pick a .txt file from disk.
             JavaScript reads it, splits it into lines, and loads the
             records into the on-screen table.

  EXPORT  -> a button packages the current in-memory records back into
             pipe-delimited (|) text and triggers a download, saving a
             fresh copy of the .txt file to your computer.

Each interface starts pre-loaded with the sample data shown above so you
can demo Add/View/Update/Delete immediately without importing anything.
To prove the text-file persistence for your professor:
  1. Add/Update/Delete a few records on screen.
  2. Click "Export / Save" — a new students.txt or attendance.txt downloads.
  3. Open that downloaded file in Notepad to show the changes were saved
     in plain pipe-delimited text.
  4. Reload the page and use "Import" to load that file back in.

RECORD FORMATS (pipe-delimited)
--------------------------------
users.txt:      username|password
students.txt:   StudentID|FullName|Age|Gender|Course|Section|ContactNumber
attendance.txt: StudentID|Date|Status|TimeIn|TimeOut

CHECKLIST COVERAGE
-------------------
[x] 3+ interfaces      -> Login, Student Registration, Attendance
[x] 5+ inputs           -> Student form has 7 inputs; Attendance form has 5
[x] .txt as database    -> students.txt, attendance.txt, users.txt
[x] CRUD                -> Add/Record, view (table), Update, Delete on both
                           Student Registration and Attendance screens
[x] Easy to demo         -> pre-loaded sample data, click-to-edit rows,
                           plain-language buttons, no setup required
