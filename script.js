const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add("task");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <div class="task-left">
                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${index})"
                >
                <span class="task-text">${task.text}</span>
            </div>

            <div class="actions">
                <button class="edit-btn" onclick="editTask(${index})">
                    Edit
                </button>

                <button class="delete-btn" onclick="deleteTask(${index})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function addTask() {
    const text = taskInput.value.trim();

    if (!text) {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskInput.focus();
}

function editTask(index) {
    const updatedText = prompt(
        "Edit task:",
        tasks[index].text
    );

    if (updatedText === null) return;

    const trimmedText = updatedText.trim();

    if (!trimmedText) {
        alert("Task cannot be empty");
        return;
    }

    tasks[index].text = trimmedText;

    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    const confirmed = confirm(
        "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    tasks.splice(index, 1);

    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    renderTasks();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

renderTasks();

window.editTask = editTask;
window.deleteTask = deleteTask;
window.toggleTask = toggleTask;