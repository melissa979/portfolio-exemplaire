const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

loadTasks();

// ========== AJOUTER UNE TÂCHE ==========
function addTask() {
    const text = taskInput.value.trim();
    if (text === "") {
        taskInput.classList.add("shake");
        setTimeout(() => taskInput.classList.remove("shake"), 400);
        return;
    }

    const task = {
        text: text,
        time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
        date: new Date().toLocaleDateString("fr-FR"),
        done: false
    };

    let tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
    taskInput.value = "";
    taskInput.focus();
}

// ========== LOCALSTORAGE ==========
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

// ========== AFFICHER LES TÂCHES ==========
function loadTasks() {
    taskList.innerHTML = "";
    let tasks = getTasks();

    updateStats(tasks);
    updateClearBtn(tasks);

    if (tasks.length === 0) {
        taskList.innerHTML = `<li class="empty-msg">✨ Aucune tâche pour le moment !</li>`;
        return;
    }

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.done) li.classList.add("done");

        li.innerHTML = `
            <div class="task-text">${escapeHTML(task.text)}</div>
            <div class="time">📅 ${task.date} à ${task.time}</div>
            <div class="actions">
                <button class="btn-done" onclick="toggleTask(${index})" title="${task.done ? 'Réouvrir' : 'Terminer'}">
                    ${task.done ? "↩ Réouvrir" : "✔ Terminer"}
                </button>
                <button class="btn-delete" onclick="deleteTask(${index}, this)" title="Supprimer">
                    ✖ Supprimer
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// ========== TOGGLE / DELETE ==========
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
    }, 300);
}

function clearAll() {
    if (confirm("Supprimer toutes les tâches ?")) {
        localStorage.removeItem("tasks");
        loadTasks();
    }
}

// ========== STATS ==========
function updateStats(tasks) {
    const stats = document.getElementById("task-stats");
    if (!stats || tasks.length === 0) {
        if (stats) stats.textContent = "";
        return;
    }
    const done = tasks.filter(t => t.done).length;
    stats.textContent = `${done} / ${tasks.length} tâche${tasks.length > 1 ? "s" : ""} terminée${done > 1 ? "s" : ""}`;
}

function updateClearBtn(tasks) {
    const btn = document.getElementById("btn-clear");
    if (btn) btn.style.display = tasks.length > 0 ? "block" : "none";
}

// ========== SECURITE XSS ==========
function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

// ========== MODE NUIT ==========
function toggleTheme() {
    document.body.classList.toggle("dark");
    const btn = document.querySelector(".toggle-theme");
    btn.textContent = document.body.classList.contains("dark") ? "☀️ Mode jour" : "🌙 Mode nuit";
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

// Charger le thème sauvegardé
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    const btn = document.querySelector(".toggle-theme");
    if (btn) btn.textContent = "☀️ Mode jour";
}

// ========== ENTER KEY ==========
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") addTask();
});

// ========== INTRO PRESENTATION ==========
document.addEventListener("DOMContentLoaded", () => {
    const title = document.getElementById("intro-title");
    const desc = document.getElementById("intro-desc");
    const overlay = document.getElementById("intro-overlay");

    if (!overlay) return;

    const titleText = "📝 To-Do List";
    const descText = "Une application simple et intuitive pour organiser vos tâches quotidiennes, enregistrées automatiquement grâce au stockage local. Idéale pour les étudiants et toute personne qui aime s'organiser.";

    let i = 0, j = 0;

    function typeTitle() {
        if (i < titleText.length) {
            title.textContent += titleText.charAt(i++);
            setTimeout(typeTitle, 50);
        } else {
            setTimeout(typeDesc, 300);
        }
    }

    function typeDesc() {
        if (j < descText.length) {
            desc.textContent += descText.charAt(j++);
            setTimeout(typeDesc, 12);
        }
    }

    typeTitle();

    setTimeout(() => {
        overlay.style.transition = "opacity 0.5s ease";
        overlay.style.opacity = "0";
        overlay.style.pointerEvents = "none";
        setTimeout(() => overlay.remove(), 500);
    }, 5000);
});