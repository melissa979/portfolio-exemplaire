const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

loadTasks();

function addTask() {
    if (taskInput.value.trim() === "") return;

    const task = {
        text: taskInput.value,
        time: new Date().toLocaleTimeString(),
        done: false
    };

    let tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
    taskInput.value = "";
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function loadTasks() {
    taskList.innerHTML = "";
    let tasks = getTasks();

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.done) li.classList.add("done");

        li.innerHTML = `
            <div class="task-text">${task.text}</div>
            <div class="time">Créé à ${task.time}</div>
            <div class="actions">
                <button class="btn-done" onclick="toggleTask(${index})">
                    ✔ Terminer
                </button>
                <button class="btn-delete" onclick="deleteTask(${index}, this)">
                    ✖ Supprimer
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function toggleTask(index) {
    let tasks = getTasks();
    tasks[index].done = !tasks[index].done;
    saveTasks(tasks);
}

function deleteTask(index, btn) {
    const li = btn.closest("li");
    li.classList.add("fade-out");

    setTimeout(() => {
        let tasks = getTasks();
        tasks.splice(index, 1);
        saveTasks(tasks);
    }, 300);
}function toggleTheme() {
    document.body.classList.toggle("dark");
}taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});/* =========================
   INTRO PRESENTATION
========================= */

document.addEventListener("DOMContentLoaded", () => {
    const title = document.getElementById("intro-title");
    const desc = document.getElementById("intro-desc");
    const overlay = document.getElementById("intro-overlay");

    if (!overlay) return; // sécurité maximale

    const titleText = "📝 To-Do List";
    const descText =
        "Une application simple et intuitive pour organiser vos tâches quotidiennes, enregistrées automatiquement grâce au stockage local.Une application qui va s'ervire les etudiants les gens qui aime s'organiser";

    let i = 0;
    let j = 0;

    function typeTitle() {
        if (i < titleText.length) {
            title.textContent += titleText.charAt(i);
            i++;
            setTimeout(typeTitle, 45);
        } else {
            setTimeout(typeDesc, 250);
        }
    }

    function typeDesc() {
        if (j < descText.length) {
            desc.textContent += descText.charAt(j);
            j++;
            setTimeout(typeDesc, 10);
        }
    }

    typeTitle();

    // disparition après 2.8 secondes
    setTimeout(() => {
        overlay.style.opacity = "0";
        overlay.style.pointerEvents = "none";

        setTimeout(() => {
            overlay.remove();
        }, 500);
    }, 4900);
});