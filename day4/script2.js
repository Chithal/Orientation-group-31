
/* ---------- PAGE SWITCH ---------- */

function showPage(page){
    document.getElementById("gpa").style.display="none";
    document.getElementById("timer").style.display="none";
    
    document.getElementById(page).style.display="block";
    
    // Update active button state if needed
}

/* ---------- DARK MODE ---------- */

function toggleDark(){
    document.body.classList.toggle("dark");
}

/* ---------- GPA CALCULATOR ---------- */

let courses = [];

function addCourse(){
    const creditInput = document.getElementById("credits");
    const gradeInput = document.getElementById("grade");
    const credit = parseFloat(creditInput.value);
    const grade = parseFloat(gradeInput.value);

    if (isNaN(credit) || isNaN(grade)) {
        alert("Please enter valid numbers for both credits and grade.");
        return;
    }

    if (grade < 0 || grade > 4) {
        alert("Grade should be between 0 and 4.");
        return;
    }

    courses.push({credit, grade});

    // Clear inputs
    creditInput.value = "";
    gradeInput.value = "";
    
    updateCourseList();
    document.getElementById("result").innerText = "Course added!";
}

function updateCourseList() {
    const list = document.getElementById("course-list");
    if (!list) return;
    
    list.innerHTML = "";
    courses.forEach((c, index) => {
        const item = document.createElement("div");
        item.style.fontSize = "12px";
        item.style.margin = "5px 0";
        item.innerText = `Course ${index + 1}: ${c.credit} credits, Grade: ${c.grade}`;
        list.appendChild(item);
    });
}

function calculate(){
    if (courses.length === 0) {
        document.getElementById("result").innerText = "No courses added yet.";
        return;
    }

    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(c => {
        totalPoints += c.credit * c.grade;
        totalCredits += c.credit;
    });

    if (totalCredits === 0) {
        document.getElementById("result").innerText = "Overall GPA: 0.00";
    } else {
        let gpa = totalPoints / totalCredits;
        document.getElementById("result").innerText = "Overall GPA: " + gpa.toFixed(2);
    }
}

function resetGPA() {
    courses = [];
    document.getElementById("course-list").innerHTML = "";
    document.getElementById("result").innerText = "GPA: 0.00";
}

/* ---------- POMODORO TIMER ---------- */

let timeRemaining = 1500; // 25 minutes
let timerInterval = null;

function startTimer(){
    if(timerInterval) return;

    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        if(timeRemaining <= 0){
            clearInterval(timerInterval);
            timerInterval = null;
            
            // Play bell sound
            const bell = document.getElementById("bell-sound");
            if (bell) {
                bell.play().catch(e => console.log("Audio play failed:", e));
            }
            
            // Notification
            if (Notification.permission === "granted") {
                new Notification("Study Timer", { body: "Time is up! Take a break." });
            }
            alert("⏰ Time is up! Take a break.");
        }
    }, 1000);
}

function resetTimer(){
    clearInterval(timerInterval);
    timerInterval = null;
    timeRemaining = 1500;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    let m = Math.floor(timeRemaining / 60);
    let s = timeRemaining % 60;
    document.getElementById("time").innerText = 
        String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}

// Request notification permission on load
if (window.Notification && Notification.permission !== "denied") {
    Notification.requestPermission();
}
