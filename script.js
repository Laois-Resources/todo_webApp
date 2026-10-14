const categories = ["Personal", "Work", "Study", "Shopping", "Duties", "Appointments", "Reminders", "Other"];
const categoryIcons = { Personal: "👤", Work: "💼", Study: "📚", Shopping: "🛒", Duties: "📝", Appointments: "📅", Reminders: "🔔", Other: "📌" };

const translations = {
    en: {
        appTitle: "My Tasks",
        appSubtitle: "Streamlined professional productivity",
        exportBtn: "📤 Export",
        importBtn: "📥 Import",
        statTotal: "Total",
        statActive: "Active",
        statDone: "Done",
        statProgress: "Progress",
        taskInputPlaceholder: "What needs to be done?",
        catPersonal: "👤 Personal",
        catWork: "💼 Work",
        catStudy: "📚 Study",
        catShopping: "🛒 Shopping",
        catDuties: "📝 Duties",
        catAppointments: "📅 Appointments",
        catReminders: "🔔 Reminders",
        catOther: "📌 Other",
        prioLow: "🟢 Low",
        prioMed: "🟡 Medium",
        prioHigh: "🔴 High",
        recNone: "🔁 None",
        recDaily: "Daily",
        recWeekly: "Weekly",
        recMonthly: "Monthly",
        effortPlaceholder: "Est. (e.g. 30m)",
        notifyMe: "🔔 Notify 1d before",
        addBtn: "+ Add Task",
        pillAll: "All",
        pillActive: "Active",
        pillDone: "Done",
        pillHigh: "🔴 High",
        pillToday: "📅 Due Today",
        searchPlaceholder: "Search tasks...",
        catFilterAll: "All Categories",
        sortNewest: "Newest First",
        sortOldest: "Oldest First",
        sortPriority: "Priority",
        sortAlpha: "A → Z",
        sortDue: "Due Date",
        progressHeader: "Overall Completion Progress",
        emptyTitle: "No tasks found",
        emptySub: "Add a new task above or clear your active filters.",
        clearDone: "🗑️ Clear Completed",
        clearAll: "Delete All Tasks",
        toastEnterTask: "Please enter a task title.",
        toastAdded: "Task added successfully.",
        toastCompleted: "Task marked completed ✓",
        toastActive: "Task marked active",
        toastDeleted: "Task deleted.",
        toastUndone: "Deletion undone.",
        toastCleared: "completed task(s) cleared.",
        toastRestored: "Cleared tasks restored.",
        toastAllDeleted: "All tasks deleted.",
        toastAllRestored: "All tasks restored.",
        toastNoCompleted: "No completed tasks to clear.",
        toastNoTasks: "No tasks available.",
        toastNoExport: "No tasks to export.",
        toastExported: "Tasks exported successfully.",
        toastImported: "task(s) imported successfully.",
        toastInvalidFile: "Invalid backup file format.",
        overdueLabel: "⚠️ Overdue",
        undoBtn: "Undo",
        editTitle: "Task name",
        editDesc: "Add description notes...",
        addSub: "+ Add Subtask",
        saveChanges: "💾 Save Changes",
        cancel: "Cancel"
    },
    ar: {
        appTitle: "مهامي",
        appSubtitle: "إنتاجية احترافية منظمة",
        exportBtn: "📤 تصدير",
        importBtn: "📥 استيراد",
        statTotal: "الإجمالي",
        statActive: "نشطة",
        statDone: "منجزة",
        statProgress: "التقدم",
        taskInputPlaceholder: "ما الذي يجب إنجازه؟",
        catPersonal: "👤 شخصي",
        catWork: "💼 عمل",
        catStudy: "📚 دراسة",
        catShopping: "🛒 تسوق",
        catDuties: "📝 واجبات",
        catAppointments: "📅 مواعيد",
        catReminders: "🔔 تذكيرات",
        catOther: "📌 أخرى",
        prioLow: "🟢 منخفضة",
        prioMed: "🟡 متوسطة",
        prioHigh: "🔴 عالية",
        recNone: "🔁 بدون تكرار",
        recDaily: "يومي",
        recWeekly: "أسبوعي",
        recMonthly: "شهري",
        effortPlaceholder: "الوقت (مثل 30د)",
        notifyMe: "🔔 تنبيه قبل يوم",
        addBtn: "+ إضافة مهمة",
        pillAll: "الكل",
        pillActive: "النشطة",
        pillDone: "المنجزة",
        pillHigh: "🔴 عالية",
        pillToday: "📅 مستحقة اليوم",
        searchPlaceholder: "بحث عن المهام...",
        catFilterAll: "جميع الفئات",
        sortNewest: "الأحدث أولاً",
        sortOldest: "الأقدم أولاً",
        sortPriority: "الأولوية",
        sortAlpha: "أ → ي",
        sortDue: "تاريخ الاستحقاق",
        progressHeader: "نسبة الإنجاز الإجمالية",
        emptyTitle: "لا توجد مهام",
        emptySub: "أضف مهمة جديدة أعلاه أو قم بتغيير الفلاتر.",
        clearDone: "🗑️ مسح المنجزة",
        clearAll: "حذف كل المهام",
        toastEnterTask: "الرجاء إدخال عنوان المهمة.",
        toastAdded: "تم إضافة المهمة بنجاح.",
        toastCompleted: "تم إكمال المهمة ✓",
        toastActive: "تم إرجاع المهمة للنشطة",
        toastDeleted: "تم حذف المهمة.",
        toastUndone: "تم التراجع عن الحذف.",
        toastCleared: "تم مسح المهمة/المهمات المنجزة.",
        toastRestored: "تم استعادة المهام الممسوحة.",
        toastAllDeleted: "تم حذف جميع المهام.",
        toastAllRestored: "تم استعادة جميع المهام.",
        toastNoCompleted: "لا توجد مهام منجزة لمسحها.",
        toastNoTasks: "لا توجد مهام متاحة.",
        toastNoExport: "لا توجد مهام لتصديرها.",
        toastExported: "تم تصدير المهام بنجاح.",
        toastImported: "تم استيراد المهمة/المهمات بنجاح.",
        toastInvalidFile: "تنسيق ملف النسخ الاحتياطي غير صالح.",
        overdueLabel: "⚠️ متأخرة",
        undoBtn: "تراجع",
        editTitle: "اسم المهمة",
        editDesc: "إضافة ملاحظات...",
        addSub: "+ إضافة مهمة فرعية",
        saveChanges: "💾 حفظ التغييرات",
        cancel: "إلغاء"
    }
};

let currentLang = localStorage.getItem("lang") || "en";

const taskInput = document.getElementById("taskInput");
const categoryInput = document.getElementById("categoryInput");
const priorityInput = document.getElementById("priorityInput");
const dueDateInput = document.getElementById("dueDateInput");
const recurringInput = document.getElementById("recurringInput");
const effortInput = document.getElementById("effortInput");
const notifyInput = document.getElementById("notifyInput");
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
const langBtn = document.getElementById("langBtn");
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
    notify: Boolean(task.notify),
    subtasks: Array.isArray(task.subtasks) ? task.subtasks : [],
    createdAt: task.createdAt || Date.now()
}));

saveTasks();

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function t(key) {
    return translations[currentLang][key] || translations["en"][key] || key;
}

function updateLanguageUI() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        el.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        el.placeholder = t(key);
    });
    langBtn.textContent = currentLang === "en" ? "🌐 العربية" : "🌐 English";
    localStorage.setItem("lang", currentLang);
    renderTasks();
}

function showToast(messageKey, type = "success", undoCallback = null, customText = null) {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    const textSpan = document.createElement("span");
    textSpan.textContent = customText || t(messageKey);
    toast.appendChild(textSpan);

    if (undoCallback) {
        const undoBtn = document.createElement("button");
        undoBtn.className = "toast-undo-btn";
        undoBtn.textContent = t("undoBtn");
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
        showToast("toastEnterTask", "error");
        taskInput.focus();
        return;
    }

    if (notifyInput.checked && "Notification" in window && Notification.permission !== "granted") {
        Notification.requestPermission();
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
        notify: notifyInput.checked,
        subtasks: [],
        createdAt: Date.now()
    });

    saveTasks();
    taskInput.value = "";
    effortInput.value = "";
    dueDateInput.value = "";
    recurringInput.value = "none";
    notifyInput.checked = false;
    renderTasks();
    taskInput.focus();
    showToast("toastAdded");
}

function checkTaskNotifications() {
    if (!("Notification" in window) || Notification.permission !== "granted") return;
    
    // Prevent midnight notifications by only triggering from 8 AM onwards
    const currentHour = new Date().getHours();
    if (currentHour < 8) return; 

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    tasks.forEach(task => {
        if (!task.completed && task.notify && task.dueDate === tomorrowStr) {
            const notifiedKey = `notified_${task.id}_${tomorrowStr}`;
            if (!localStorage.getItem(notifiedKey)) {
                new Notification("Task Reminder", {
                    body: `Reminder: "${task.text}" is due tomorrow!`,
                    icon: "https://i0.wp.com/thecontextofthings.com/wp-content/uploads/2016/06/task-list.jpg?fit=896%2C900&ssl=1"
                });
                localStorage.setItem(notifiedKey, "true");
            }
        }
    });
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
    checkTaskNotifications();
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
                        ${task.dueDate ? `<span class="badge due-date ${isOverdue(task) ? "overdue-date" : ""}">${isOverdue(task) ? t("overdueLabel") : "📅"} ${formatDate(task.dueDate)}</span>` : ""}
                        ${task.effort ? `<span class="badge effort-badge">⏱️ ${escapeHTML(task.effort)}</span>` : ""}
                        ${task.recurring !== "none" ? `<span class="badge recurring-badge">🔁 ${task.recurring}</span>` : ""}
                        ${task.notify ? `<span class="badge notify-badge" title="1-day prior notification enabled">🔔 Notify</span>` : ""}
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
            <input class="edit-title" value="${escapeAttribute(task.text)}" placeholder="${t("editTitle")}">
            <textarea class="edit-description" placeholder="${t("editDesc")}">${escapeHTML(task.description)}</textarea>
            
            <div style="font-weight: 600; font-size: 13px; margin-top: 4px;">Subtasks:</div>
            <div class="edit-subtasks-list">
                ${task.subtasks.map((sub, sIdx) => `
                    <div style="display:flex; gap:6px; align-items:center;">
                        <input type="text" class="edit-sub-input" data-sidx="${sIdx}" value="${escapeAttribute(sub.text)}">
                        <button type="button" class="icon-btn remove-sub-btn" data-sidx="${sIdx}">✕</button>
                    </div>
                `).join("")}
            </div>
            <button type="button" class="header-btn" id="addSubRowBtn" style="font-size: 12px; padding: 5px;">${t("addSub")}</button>

            <div class="edit-row" style="margin-top: 6px;">
                <select class="edit-category">${getCategoryOptions(task.category)}</select>
                <select class="edit-priority">
                    <option value="low" ${task.priority === "low" ? "selected" : ""}>🟢 Low</option>
                    <option value="medium" ${task.priority === "medium" ? "selected" : ""}>🟡 Medium</option>
                    <option value="high" ${task.priority === "high" ? "selected" : ""}>🔴 High</option>
                </select>
                <input type="date" class="edit-due-date" value="${escapeAttribute(task.dueDate)}">
                <input type="text" class="edit-effort" value="${escapeAttribute(task.effort)}" placeholder="Est">
                <select class="edit-recurring">
                    <option value="none" ${task.recurring === "none" ? "selected" : ""}>🔁 None</option>
                    <option value="daily" ${task.recurring === "daily" ? "selected" : ""}>Daily</option>
                    <option value="weekly" ${task.recurring === "weekly" ? "selected" : ""}>Weekly</option>
                    <option value="monthly" ${task.recurring === "monthly" ? "selected" : ""}>Monthly</option>
                </select>
            </div>
            
            <div style="margin-top: 6px;">
                <label style="font-size: 12px; display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
                    <input type="checkbox" class="edit-notify" ${task.notify ? "checked" : ""}> ${t("notifyMe")}
                </label>
            </div>

            <div class="edit-actions">
                <button class="cancel-edit-btn">${t("cancel")}</button>
                <button class="save-edit-btn">${t("saveChanges")}</button>
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
        showToast("toastEnterTask", "error");
        return;
    }

    task.text = title;
    task.description = li.querySelector(".edit-description").value.trim();
    task.category = li.querySelector(".edit-category").value;
    task.priority = li.querySelector(".edit-priority").value;
    task.dueDate = li.querySelector(".edit-due-date").value;
    task.recurring = li.querySelector(".edit-recurring").value;
    task.effort = li.querySelector(".edit-effort").value.trim();
    task.notify = li.querySelector(".edit-notify").checked;

    if (task.notify && "Notification" in window && Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    const subInputs = li.querySelectorAll(".edit-sub-input");
    subInputs.forEach(inp => {
        const sIdx = parseInt(inp.dataset.sidx);
        if (task.subtasks[sIdx]) {
            task.subtasks[sIdx].text = inp.value.trim();
        }
    });

    saveTasks();
    renderTasks();
    showToast("Task updated successfully.", "success", null, currentLang === "ar" ? "تم تحديث المهمة بنجاح." : "Task updated successfully.");
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
    showToast(task.completed ? "toastCompleted" : "toastActive");
}

function deleteTask(id) {
    const taskIndex = tasks.findIndex(item => item.id === id);
    if (taskIndex === -1) return;

    const removedTask = tasks[taskIndex];
    tasks.splice(taskIndex, 1);
    saveTasks();
    renderTasks();

    showToast("toastDeleted", "success", () => {
        tasks.splice(taskIndex, 0, removedTask);
        saveTasks();
        renderTasks();
        showToast("toastUndone");
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
        showToast("toastNoCompleted", "error");
        return;
    }
    const backupTasks = [...tasks];
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
    showToast("", "success", () => {
        tasks = backupTasks;
        saveTasks();
        renderTasks();
        showToast("toastRestored");
    }, `${completedTasks.length} ${t("toastCleared")}`);
});

clearAllBtn.addEventListener("click", () => {
    if (tasks.length === 0) {
        showToast("toastNoTasks", "error");
        return;
    }

    const backupTasks = [...tasks];
    tasks = [];
    saveTasks();
    renderTasks();
    showToast("toastAllDeleted", "success", () => {
        tasks = backupTasks;
        saveTasks();
        renderTasks();
        showToast("toastAllRestored");
    });
});

exportBtn.addEventListener("click", () => {
    if (tasks.length === 0) {
        showToast("toastNoExport", "error");
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
    showToast("toastExported");
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
                notify: Boolean(task.notify),
                subtasks: Array.isArray(task.subtasks) ? task.subtasks : [],
                createdAt: task.createdAt || Date.now()
            })).filter(task => task.text);

            if (valid.length === 0) throw new Error();

            tasks = [...tasks, ...valid];
            saveTasks();
            renderTasks();
            showToast("", "success", null, `${valid.length} ${t("toastImported")}`);
        } catch {
            showToast("toastInvalidFile", "error");
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

langBtn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "ar" : "en";
    updateLanguageUI();
});

searchInput.addEventListener("input", renderTasks);
categoryFilter.addEventListener("change", renderTasks);
sortInput.addEventListener("change", renderTasks);
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", event => {
    if (event.key === "Enter") addTask();
});

function getPriorityText(priority) {
    if (priority === "high") return currentLang === "ar" ? "🔴 عالية" : "🔴 High";
    if (priority === "medium") return currentLang === "ar" ? "🟡 متوسطة" : "🟡 Medium";
    return currentLang === "ar" ? "🟢 منخفضة" : "🟢 Low";
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
    return d.toLocaleDateString(currentLang === "ar" ? "ar-EG" : undefined, { day: "numeric", month: "short", year: "numeric" });
}

function isOverdue(task) {
    if (!task.dueDate || task.completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(task.dueDate + "T00:00:00");
    return due < today;
}

updateLanguageUI();