
    let subjects = [];

function addSubject() {

    const subjectInput = document.getElementById("subject");
    const difficultyInput = document.getElementById("difficulty");
    const hoursInput = document.getElementById("hours");
    const examDateInput = document.getElementById("examDate");

    const subject = subjectInput.value.trim();
    const difficulty = difficultyInput.value;
    const hours = Number(hoursInput.value);
    const examDate = examDateInput.value;

    if (subject === "" || hours <= 0 || examDate === "") {
        alert("Please enter subject, study hours and exam date.");
        return;
    }

    const newSubject = {
        name: subject,
        difficulty: difficulty,
        hours: hours,
        examDate: examDate,
        completed: false
    };

    subjects.push(newSubject);

    displaySubjects();
    updateProgress();
    updateExamCountdown();

    subjectInput.value = "";
    hoursInput.value = "";
    examDateInput.value = "";
}


function displaySubjects() {

    const subjectList = document.getElementById("subjectList");

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
                    ? "✅ Completed"
                    : "☑️ Mark as Completed"}
            </button>
        `;

        subjectList.appendChild(subjectDiv);
    });
}


function completeSubject(index) {

    subjects[index].completed = !subjects[index].completed;

    displaySubjects();
    updateProgress();
}


function updateProgress() {

    const progressBar = document.getElementById("progress");
    const progressText = document.getElementById("progressText");

    if (subjects.length === 0) {

        progressBar.style.width = "0%";
        progressText.innerText = "0% Completed";

        return;
    }

    const completedSubjects = subjects.filter(
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

    const examInfo = document.getElementById("examInfo");

    if (subjects.length === 0) {
        examInfo.innerText =
            "Add a subject with an exam date to see the countdown.";
        return;
    }

    // Find the nearest upcoming exam
    const upcomingSubjects = subjects
        .filter(subject => !subject.completed)
        .sort(
            (a, b) =>
                new Date(a.examDate) - new Date(b.examDate)
        );

    if (upcomingSubjects.length === 0) {
        examInfo.innerText =
            "🎉 All subjects are completed!";
        return;
    }

    const nextExam = upcomingSubjects[0];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const examDay = new Date(nextExam.examDate);
    examDay.setHours(0, 0, 0, 0);

    const difference =
        examDay.getTime() - today.getTime();

    const daysLeft =
        Math.ceil(difference / (1000 * 60 * 60 * 24));

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