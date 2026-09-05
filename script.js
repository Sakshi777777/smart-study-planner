let subjects = [];

function addSubject() {

    const subjectInput = document.getElementById("subject");
    const difficultyInput = document.getElementById("difficulty");
    const hoursInput = document.getElementById("hours");

    const subject = subjectInput.value.trim();
    const difficulty = difficultyInput.value;
    const hours = Number(hoursInput.value);

    if (subject === "" || hours <= 0) {
        alert("Please enter subject name and valid study hours.");
        return;
    }

    const newSubject = {
        name: subject,
        difficulty: difficulty,
        hours: hours,
        completed: false
    };

    subjects.push(newSubject);

    displaySubjects();
    updateProgress();

    subjectInput.value = "";
    hoursInput.value = "";
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

            <button onclick="completeSubject(${index})">
                ${subject.completed ? "✅ Completed" : "☑️ Mark as Completed"}
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
