let subjects = JSON.parse(localStorage.getItem("subjects")) || [];

function addSubject() {

    const subject = document.getElementById("subject").value.trim();
    const difficulty = document.getElementById("difficulty").value;
    const hours = Number(document.getElementById("hours").value);
    const examDate = document.getElementById("examDate").value;

    if (subject === "" || hours <= 0 || examDate === "") {
        alert("Please enter all details.");
        return;
    }

    subjects.push({
        name: subject,
        difficulty: difficulty,
        hours: hours,
        examDate: examDate,
        completed: false
    });

    saveData();

    document.getElementById("subject").value = "";
    document.getElementById("hours").value = "";
    document.getElementById("examDate").value = "";

    displaySubjects();
    updateProgress();
    updateExamCountdown();
}


function displaySubjects() {

    const subjectList = document.getElementById("subjectList");

    if (subjects.length === 0) {
        subjectList.innerHTML =
            '<p class="empty">No subjects added yet.</p>';
        return;
    }

    subjectList.innerHTML = "";

    subjects.forEach((subject, index) => {

        const subjectDiv = document.createElement("div");

        subjectDiv.className = "subject-item";

        subjectDiv.innerHTML = `
            <strong>📚 ${subject.name}</strong>
            <span>Difficulty: ${subject.difficulty}</span><br>
            <span>Study Hours: ${subject.hours} hour(s)</span><br>
            <span>📅 Exam: ${subject.examDate}</span>

            <button onclick="completeSubject(${index})">
                ${subject.completed
                    ? "↩️ Mark as Pending"
                    : "☑️ Mark as Completed"}
            </button>

            <button onclick="deleteSubject(${index})">
                🗑️ Delete
            </button>
        `;

        subjectList.appendChild(subjectDiv);
    });
}


function completeSubject(index) {

    subjects[index].completed =
        !subjects[index].completed;

    saveData();

    displaySubjects();
    updateProgress();
    updateExamCountdown();
}


function deleteSubject(index) {

    const confirmDelete =
        confirm("Are you sure you want to delete this subject?");

    if (!confirmDelete) return;

    subjects.splice(index, 1);

    saveData();

    displaySubjects();
    updateProgress();
    updateExamCountdown();
}


function updateProgress() {

    const progressBar =
        document.getElementById("progress");

    const progressText =
        document.getElementById("progressText");

    if (subjects.length === 0) {

        progressBar.style.width = "0%";
        progressText.innerText = "0% Completed";

        return;
    }

    const completedSubjects =
        subjects.filter(
            subject => subject.completed
        ).length;

    const percentage = Math.round(
        (completedSubjects / subjects.length) * 100
    );

    progressBar.style.width = percentage + "%";

    progressText.innerText =
        percentage + "% Completed";
}


function updateExamCountdown() {

    const examInfo =
        document.getElementById("examInfo");

    const upcomingSubjects = subjects
        .filter(subject => !subject.completed)
        .sort(
            (a, b) =>
                new Date(a.examDate) -
                new Date(b.examDate)
        );

    if (upcomingSubjects.length === 0) {

        examInfo.innerText =
            "🎉 All subjects are completed!";

        return;
    }

    const nextExam = upcomingSubjects[0];

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const examDay =
        new Date(nextExam.examDate);

    examDay.setHours(0, 0, 0, 0);

    const difference =
        examDay.getTime() - today.getTime();

    const daysLeft =
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );

    if (daysLeft > 0) {

        examInfo.innerHTML = `
            📚 <strong>${nextExam.name}</strong><br>
            📅 Exam Date: ${nextExam.examDate}<br>
            ⏳ <strong>${daysLeft} days remaining</strong>
        `;

    } else if (daysLeft === 0) {

        examInfo.innerHTML = `
            📚 <strong>${nextExam.name}</strong><br>
            🔥 <strong>Exam is TODAY!</strong>
        `;

    } else {

        examInfo.innerHTML = `
            📚 <strong>${nextExam.name}</strong><br>
            ⚠️ Exam date has passed.
        `;
    }
}


function saveData() {

    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );
}


// Load saved data when website opens
displaySubjects();
updateProgress();
updateExamCountdown();