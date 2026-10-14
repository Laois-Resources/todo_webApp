const categories = ["Personal", "Work", "Study", "Shopping", "Duties", "Appointments", "Reminders", "Other"];
const categoryIcons = { Personal: "👤", Work: "💼", Study: "📚", Shopping: "🛒", Duties: "📝", Appointments: "📅", Reminders: "🔔", Other: "📌" };

const taskInput = document.getElementById("taskInput");
const categoryInput = document.getElementById("categoryInput");
const priorityInput = document.getElementById("priorityInput");
const dueDateInput = document.getElementById("dueDateInput");
const recurringInput = document.getElementById("recurringInput");
const effortInput = document.getElementById("effortInput");
const addBtn = document.getElementById("addBtn");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortInput = document.getElementById("sortInput");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const totalCount = document.getElementById("totalCount");
const activeCount = document.getElementById("activeCount");
const completedCount = document.getElementById("completedCount");
const progressPercent = document.getElementById("progressPercent");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const exportBtn = document.getElementById("exportBtn");
const importInput = document.getElementById("importInput");
const themeBtn = document.getElementById("themeBtn");
const toastContainer = document.getElementById("toastContainer");
const pillButtons = document.querySelectorAll(".pill-btn");

let currentPillFilter = "all";
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks = tasks.map((task, index) => ({
    id: task.id || Date.now() + index,
    text: task.text || "",
    description: task.description || "",
    completed: Boolean(task.completed),
    category: categories.includes(task.category) ? task.category : "Personal",
    priority: ["low", "medium", "high"].includes(task.priority) ? task.priority : "medium",
    dueDate: task.dueDate || "",
    recurring: ["none", "daily", "weekly", "monthly"].includes(task.recurring) ? task.recurring : "none",
    effort: task.effort || "",
    subtasks: Array.isArray(task.subtasks) ? task.subtasks : [],
    createdAt: task.createdAt || Date.now()
}));

saveTasks();

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showToast(message, type = "success", undoCallback = null) {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    const textSpan = document.createElement("span");
    textSpan.textContent = message;
    toast.appendChild(textSpan);

    if (undoCallback) {
        const undoBtn = document.createElement("button");
        undoBtn.className = "toast-undo-btn";
        undoBtn.textContent = "Undo";
        undoBtn.onclick = () => {
            undoCallback();
            toast.remove();
        };
        toast.appendChild(undoBtn);
    }

    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}

function getCategoryOptions(selectedCategory) {
    return categories.map(category => `
        <option value="${escapeAttribute(category)}" ${selectedCategory === category ? "selected" : ""}>
            ${categoryIcons[category] || "📌"} ${escapeHTML(category)}
        </option>
    `).join("");
}

function addTask() {
    const text = taskInput.value.trim();
    if (!text) {
        showToast("Please enter a task title.", "error");
        taskInput.focus();
        return;
    }

    tasks.push({
        id: Date.now(),
        text: text,
        description: "",
        completed: false,
        category: categoryInput.value,
        priority: priorityInput.value,
        dueDate: dueDateInput.value,
        recurring: recurringInput.value,
        effort: effortInput.value.trim(),
        subtasks: [],
        createdAt: Date.now()
    });

    saveTasks();
    taskInput.value = "";
    effortInput.value = "";
    dueDateInput.value = "";
    recurringInput.value = "none";
    renderTasks();
    taskInput.focus();
    showToast("Task added successfully.");
}

function handleRecurringTask(task) {
    if (task.recurring === "none" || !task.dueDate) return;
    const currentDue = new Date(task.dueDate + "T00:00:00");
    if (task.recurring === "daily") currentDue.setDate(currentDue.getDate() + 1);
    if (task.recurring === "weekly") currentDue.setDate(currentDue.getDate() + 7);
    if (task.recurring === "monthly") currentDue.setMonth(currentDue.getMonth() + 1);

    const nextDateStr = currentDue.toISOString().split("T")[0];
    tasks.push({
        ...task,
        id: Date.now(),
        completed: false,
        dueDate: nextDateStr,
        createdAt: Date.now()
    });
}

function renderTasks() {
    let filtered = [...tasks];

    const search = searchInput.value.trim().toLowerCase();
    if (search) {
        filtered = filtered.filter(task => 
            task.text.toLowerCase().includes(search) ||
            task.description.toLowerCase().includes(search) ||
            task.category.toLowerCase().includes(search) ||
            task.subtasks.some(sub => sub.text.toLowerCase().includes(search))
        );
    }

    // Pill Filter Logic
    if (currentPillFilter === "active") {
        filtered = filtered.filter(task => !task.completed);
    } else if (currentPillFilter === "completed") {
        filtered = filtered.filter(task => task.completed);
    } else if (currentPillFilter === "high") {
        filtered = filtered.filter(task => task.priority === "high");
    } else if (currentPillFilter === "today") {
        const todayStr = new Date().toISOString().split("T")[0];
        filtered = filtered.filter(task => task.dueDate === todayStr);
    }

    if (categoryFilter.value !== "all") {
        filtered = filtered.filter(task => task.category === categoryFilter.value);
    }

    switch (sortInput.value) {
        case "newest":
            filtered.sort((a, b) => b.createdAt - a.createdAt);
            break;
        case "oldest":
            filtered.sort((a, b) => a.createdAt - b.createdAt);
            break;
        case "alphabetical":
            filtered.sort((a, b) => a.text.localeCompare(b.text));
            break;
        case "priority":
            const order = { high: 1, medium: 2, low: 3 };
            filtered.sort((a, b) => order[a.priority] - order[b.priority]);
            break;
        case "due":
            filtered.sort((a, b) => {
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return new Date(a.dueDate) - new Date(b.dueDate);
            });
            break;
    }

    emptyMessage.style.display = filtered.length ? "none" : "block";
    renderList(filtered);
    updateStatistics();
}

function renderList(filtered) {
    taskList.innerHTML = "";
    filtered.forEach((task) => {
        const li = document.createElement("li");
        li.className = `task ${task.priority}-priority`;
        li.dataset.id = task.id;

        if (task.completed) li.classList.add("completed");
        if (isOverdue(task)) li.classList.add("overdue");

        const categoryIcon = categoryIcons[task.category] || "📌";
        const subtasksHTML = task.subtasks.map((sub, sIdx) => `
            <div class="subtask-item">
                <input type="checkbox" class="sub-checkbox" data-tid="${task.id}" data-sidx="${sIdx}" ${sub.completed ? "checked" : ""}>
                <span class="${sub.completed ? "sub-completed" : ""}">${escapeHTML(sub.text)}</span>
            </div>
        `).join("");

        li.innerHTML = `
            <div class="task-left">
                <input type="checkbox" class="task-checkbox" ${task.completed ? "checked" : ""}>
                <div class="task-info">
                    <div class="task-title">${escapeHTML(task.text)}</div>
                    ${task.description ? `<div class="task-description">${escapeHTML(task.description)}</div>` : ""}
                    ${task.subtasks.length ? `<div class="subtasks-container">${subtasksHTML}</div>` : ""}
                    <div class="task-meta">
                        <span class="badge category-badge">${categoryIcon} ${escapeHTML(task.category)}</span>
                        <span class="badge priority-${task.priority}">${getPriorityText(task.priority)}</span>
                        ${task.dueDate ? `<span class="badge due-date ${isOverdue(task) ? "overdue-date" : ""}">${isOverdue(task) ? "⚠️ Overdue" : "📅"} ${formatDate(task.dueDate)}</span>` : ""}
                        ${task.effort ? `<span class="badge effort-badge">⏱️ ${escapeHTML(task.effort)}</span>` : ""}
                        ${task.recurring !== "none" ? `<span class="badge recurring-badge">🔁 ${task.recurring}</span>` : ""}
                    </div>
                </div>
            </div>
            <div class="task-actions">
                <button class="icon-btn edit-btn" title="Edit task">✏️</button>
                <button class="icon-btn delete-btn" title="Delete task">🗑️</button>
            </div>
        `;

        li.querySelector(".task-checkbox").addEventListener("change", () => toggleTask(task.id));
        li.querySelector(".edit-btn").addEventListener("click", () => startEditing(task.id));
        li.querySelector(".delete-btn").addEventListener("click", () => deleteTask(task.id));

        li.querySelectorAll(".sub-checkbox").forEach(chk => {
            chk.addEventListener("change", (e) => {
                const sIdx = parseInt(e.target.dataset.sidx);
                task.subtasks[sIdx].completed = e.target.checked;
                saveTasks();
                renderTasks();
            });
        });

        taskList.appendChild(li);
    });
}

function startEditing(id) {
    const task = tasks.find(item => item.id === id);
    if (!task) return;

    const li = document.querySelector(`.task[data-id="${id}"]`);
    if (!li) return;

    li.innerHTML = `
        <div class="edit-panel">
            <input class="edit-title" value="${escapeAttribute(task.text)}" placeholder="Task name">
            <textarea class="edit-description" placeholder="Add description notes...">${escapeHTML(task.description)}</textarea>
            
            <div style="font-weight: 600; font-size: 13px; margin-top: 4px;">Subtasks:</div>
            <div class="edit-subtasks-list">
                ${task.subtasks.map((sub, sIdx) => `
                    <div style="display:flex; gap:6px; align-items:center;">
                        <input type="text" class="edit-sub-input" data-sidx="${sIdx}" value="${escapeAttribute(sub.text)}">
                        <button type="button" class="icon-btn remove-sub-btn" data-sidx="${sIdx}">✕</button>
                    </div>
                `).join("")}
            </div>
            <button type="button" class="header-btn" id="addSubRowBtn" style="font-size: 12px; padding: 5px;">+ Add Subtask</button>

            <div class="edit-row" style="margin-top: 6px;">
                <select class="edit-category">${getCategoryOptions(task.category)}</select>
                <select class="edit-priority">
                    <option value="low" ${task.priority === "low" ? "selected" : ""}>🟢 Low</option>
                    <option value="medium" ${task.priority === "medium" ? "selected" : ""}>🟡 Medium</option>
                    <option value="high" ${task.priority === "high" ? "selected" : ""}>🔴 High</option>
                </select>
                <input type="date" class="edit-due-date" value="${escapeAttribute(task.dueDate)}">
                <input type="text" class="edit-effort" value="${escapeAttribute(task.effort)}" placeholder="Est (e.g. 30m)">
                <select class="edit-recurring">
                    <option value="none" ${task.recurring === "none" ? "selected" : ""}>🔁 None</option>
                    <option value="daily" ${task.recurring === "daily" ? "selected" : ""}>Daily</option>
                    <option value="weekly" ${task.recurring === "weekly" ? "selected" : ""}>Weekly</option>
                    <option value="monthly" ${task.recurring === "monthly" ? "selected" : ""}>Monthly</option>
                </select>
            </div>

            <div class="edit-actions">
                <button class="cancel-edit-btn">Cancel</button>
                <button class="save-edit-btn">💾 Save Changes</button>
            </div>
        </div>
    `;

    const title = li.querySelector(".edit-title");
    title.focus();

    li.querySelector("#addSubRowBtn").addEventListener("click", () => {
        task.subtasks.push({ text: "New Subtask", completed: false });
        startEditing(id);
    });

    li.querySelectorAll(".remove-sub-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const sIdx = parseInt(e.target.dataset.sidx);
            task.subtasks.splice(sIdx, 1);
            startEditing(id);
        });
    });

    li.querySelector(".save-edit-btn").addEventListener("click", () => saveEdit(id, li));
    li.querySelector(".cancel-edit-btn").addEventListener("click", renderTasks);
}

function saveEdit(id, li) {
    const task = tasks.find(item => item.id === id);
    if (!task) return;

    const title = li.querySelector(".edit-title").value.trim();
    if (!title) {
        showToast("Task name cannot be empty.", "error");
        return;
    }

    task.text = title;
    task.description = li.querySelector(".edit-description").value.trim();
    task.category = li.querySelector(".edit-category").value;
    task.priority = li.querySelector(".edit-priority").value;
    task.dueDate = li.querySelector(".edit-due-date").value;
    task.recurring = li.querySelector(".edit-recurring").value;
    task.effort = li.querySelector(".edit-effort").value.trim();

    const subInputs = li.querySelectorAll(".edit-sub-input");
    subInputs.forEach(inp => {
        const sIdx = parseInt(inp.dataset.sidx);
        if (task.subtasks[sIdx]) {
            task.subtasks[sIdx].text = inp.value.trim();
        }
    });

    saveTasks();
    renderTasks();
    showToast("Task updated successfully.");
}

function toggleTask(id) {
    const task = tasks.find(item => item.id === id);
    if (!task) return;

    task.completed = !task.completed;
    if (task.completed) {
        handleRecurringTask(task);
    }

    saveTasks();
    renderTasks();
    showToast(task.completed ? "Task marked completed ✓" : "Task marked active");
}

function deleteTask(id) {
    const taskIndex = tasks.findIndex(item => item.id === id);
    if (taskIndex === -1) return;

    const removedTask = tasks[taskIndex];
    tasks.splice(taskIndex, 1);
    saveTasks();
    renderTasks();

    showToast("Task deleted.", "success", () => {
        tasks.splice(taskIndex, 0, removedTask);
        saveTasks();
        renderTasks();
        showToast("Deletion undone.");
    });
}

function updateStatistics() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    totalCount.textContent = total;
    activeCount.textContent = active;
    completedCount.textContent = completed;
    progressPercent.textContent = percentage + "%";
    progressText.textContent = percentage + "%";
    progressFill.style.width = percentage + "%";
}

pillButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        pillButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentPillFilter = btn.dataset.filter;
        renderTasks();
    });
});

clearCompletedBtn.addEventListener("click", () => {
    const completedTasks = tasks.filter(task => task.completed);
    if (completedTasks.length === 0) {
        showToast("No completed tasks to clear.", "error");
        return;
    }
    const backupTasks = [...tasks];
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
    showToast(`${completedTasks.length} completed task(s) cleared.`, "success", () => {
        tasks = backupTasks;
        saveTasks();
        renderTasks();
        showToast("Cleared tasks restored.");
    });
});

clearAllBtn.addEventListener("click", () => {
    if (tasks.length === 0) {
        showToast("No tasks available.", "error");
        return;
    }

    const backupTasks = [...tasks];
    tasks = [];
    saveTasks();
    renderTasks();
    showToast("All tasks deleted.", "success", () => {
        tasks = backupTasks;
        saveTasks();
        renderTasks();
        showToast("All tasks restored.");
    });
});

exportBtn.addEventListener("click", () => {
    if (tasks.length === 0) {
        showToast("No tasks to export.", "error");
        return;
    }
    const data = JSON.stringify(tasks, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tasks-backup.json";
    link.click();
    URL.revokeObjectURL(url);
    showToast("Tasks exported successfully.");
});

importInput.addEventListener("change", event => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (!Array.isArray(imported)) throw new Error();

            const valid = imported.map((task, index) => ({
                id: task.id || Date.now() + index,
                text: String(task.text || "").trim(),
                description: String(task.description || ""),
                completed: Boolean(task.completed),
                category: categories.includes(task.category) ? task.category : "Personal",
                priority: ["low", "medium", "high"].includes(task.priority) ? task.priority : "medium",
                dueDate: task.dueDate || "",
                recurring: ["none", "daily", "weekly", "monthly"].includes(task.recurring) ? task.recurring : "none",
                effort: task.effort || "",
                subtasks: Array.isArray(task.subtasks) ? task.subtasks : [],
                createdAt: task.createdAt || Date.now()
            })).filter(task => task.text);

            if (valid.length === 0) throw new Error();

            tasks = [...tasks, ...valid];
            saveTasks();
            renderTasks();
            showToast(`${valid.length} task(s) imported successfully.`);
        } catch {
            showToast("Invalid backup file format.", "error");
        }
    };
    reader.readAsText(file);
    importInput.value = "";
});

let darkMode = localStorage.getItem("darkMode") === "true";
function applyTheme() {
    document.body.classList.toggle("dark", darkMode);
    themeBtn.textContent = darkMode ? "☀️" : "🌙";
}
themeBtn.addEventListener("click", () => {
    darkMode = !darkMode;
    localStorage.setItem("darkMode", darkMode);
    applyTheme();
});
applyTheme();

searchInput.addEventListener("input", renderTasks);
categoryFilter.addEventListener("change", renderTasks);
sortInput.addEventListener("change", renderTasks);
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", event => {
    if (event.key === "Enter") addTask();
});

function getPriorityText(priority) {
    if (priority === "high") return "🔴 High";
    if (priority === "medium") return "🟡 Medium";
    return "🟢 Low";
}

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = String(text);
    return div.innerHTML;
}

function escapeAttribute(text) {
    return escapeHTML(text).replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function formatDate(date) {
    if (!date) return "";
    const d = new Date(date + "T00:00:00");
    return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

function isOverdue(task) {
    if (!task.dueDate || task.completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(task.dueDate + "T00:00:00");
    return due < today;
}

renderTasks();