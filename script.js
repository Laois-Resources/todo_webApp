/* =========================================
   CATEGORY CONFIGURATION
========================================= */

const categories = [
    "Personal",
    "Work",
    "Study",
    "Shopping",
    "Duties",
    "Appointments",
    "Reminders",
    "Other"
];


/* =========================================
   CATEGORY ICONS
========================================= */

const categoryIcons = {

    Personal:
        "👤",

    Work:
        "💼",

    Study:
        "📚",

    Shopping:
        "🛒",

    Duties:
        "📝",

    Appointments:
        "📅",

    Reminders:
        "🔔",

    Other:
        "📌"

};


/* =========================================
   ELEMENTS
========================================= */

const taskInput =
    document.getElementById(
        "taskInput"
    );

const categoryInput =
    document.getElementById(
        "categoryInput"
    );

const priorityInput =
    document.getElementById(
        "priorityInput"
    );

const addBtn =
    document.getElementById(
        "addBtn"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

const filterInput =
    document.getElementById(
        "filterInput"
    );

const categoryFilter =
    document.getElementById(
        "categoryFilter"
    );

const priorityFilter =
    document.getElementById(
        "priorityFilter"
    );

const sortInput =
    document.getElementById(
        "sortInput"
    );

const taskList =
    document.getElementById(
        "taskList"
    );

const emptyMessage =
    document.getElementById(
        "emptyMessage"
    );

const totalCount =
    document.getElementById(
        "totalCount"
    );

const activeCount =
    document.getElementById(
        "activeCount"
    );

const completedCount =
    document.getElementById(
        "completedCount"
    );

const progressPercent =
    document.getElementById(
        "progressPercent"
    );

const progressText =
    document.getElementById(
        "progressText"
    );

const progressFill =
    document.getElementById(
        "progressFill"
    );

const clearCompletedBtn =
    document.getElementById(
        "clearCompletedBtn"
    );

const clearAllBtn =
    document.getElementById(
        "clearAllBtn"
    );

const exportBtn =
    document.getElementById(
        "exportBtn"
    );

const importInput =
    document.getElementById(
        "importInput"
    );

const themeBtn =
    document.getElementById(
        "themeBtn"
    );

const toastContainer =
    document.getElementById(
        "toastContainer"
    );


/* =========================================
   LOAD TASKS
========================================= */

let tasks =
    JSON.parse(
        localStorage.getItem(
            "tasks"
        )
    ) || [];


/*
    Upgrade old tasks automatically.
*/

tasks =
    tasks.map(
        (task, index) => ({

            id:
                task.id ||
                Date.now() +
                index,

            text:
                task.text ||
                "",

            description:
                task.description ||
                "",

            completed:
                Boolean(
                    task.completed
                ),

            category:
                categories.includes(
                    task.category
                )
                    ? task.category
                    : "Personal",

            priority:
                [
                    "low",
                    "medium",
                    "high"
                ].includes(
                    task.priority
                )
                    ? task.priority
                    : "medium",

            dueDate:
                task.dueDate ||
                "",

            createdAt:
                task.createdAt ||
                Date.now()

        })
    );


saveTasks();


/* =========================================
   SAVE
========================================= */

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


/* =========================================
   TOAST
========================================= */

function showToast(
    message,
    type = "success"
) {

    const toast =
        document.createElement(
            "div"
        );

    toast.className =
        `toast ${type}`;

    toast.textContent =
        message;


    toastContainer.appendChild(
        toast
    );


    setTimeout(
        () => {

            toast.remove();

        },
        2800
    );

}


/* =========================================
   CATEGORY HTML
========================================= */

function getCategoryOptions(
    selectedCategory
) {

    return categories
        .map(
            category => `

                <option
                    value="${escapeAttribute(
                        category
                    )}"
                    ${
                        selectedCategory ===
                        category
                            ? "selected"
                            : ""
                    }
                >
                    ${
                        categoryIcons[
                            category
                        ] || "📌"
                    }
                    ${escapeHTML(
                        category
                    )}
                </option>

            `
        )
        .join("");

}


/* =========================================
   ADD TASK
========================================= */

function addTask() {

    const text =
        taskInput.value.trim();


    if (!text) {

        showToast(
            "Please enter a task.",
            "error"
        );

        taskInput.focus();

        return;

    }


    tasks.push({

        id:
            Date.now(),

        text:
            text,

        description:
            "",

        completed:
            false,

        category:
            categoryInput.value,

        priority:
            priorityInput.value,

        dueDate:
            "",

        createdAt:
            Date.now()

    });


    saveTasks();

    taskInput.value = "";

    renderTasks();

    taskInput.focus();


    showToast(
        "Task added successfully."
    );

}


/* =========================================
   RENDER TASKS
========================================= */

function renderTasks() {

    taskList.innerHTML = "";


    let filtered =
        [...tasks];


    /* =====================================
       SEARCH
    ===================================== */

    const search =
        searchInput.value
            .trim()
            .toLowerCase();


    if (search) {

        filtered =
            filtered.filter(
                task =>

                    task.text
                        .toLowerCase()
                        .includes(search)

                    ||

                    task.description
                        .toLowerCase()
                        .includes(search)

                    ||

                    task.category
                        .toLowerCase()
                        .includes(search)
            );

    }


    /* =====================================
       STATUS
    ===================================== */

    if (
        filterInput.value ===
        "active"
    ) {

        filtered =
            filtered.filter(
                task =>
                    !task.completed
            );

    }


    if (
        filterInput.value ===
        "completed"
    ) {

        filtered =
            filtered.filter(
                task =>
                    task.completed
            );

    }


    /* =====================================
       CATEGORY
    ===================================== */

    if (
        categoryFilter.value !==
        "all"
    ) {

        filtered =
            filtered.filter(
                task =>
                    task.category ===
                    categoryFilter.value
            );

    }


    /* =====================================
       PRIORITY
    ===================================== */

    if (
        priorityFilter.value !==
        "all"
    ) {

        filtered =
            filtered.filter(
                task =>
                    task.priority ===
                    priorityFilter.value
            );

    }


    /* =====================================
       SORTING
    ===================================== */

    switch (
        sortInput.value
    ) {

        case "newest":

            filtered.sort(
                (a, b) =>
                    b.createdAt -
                    a.createdAt
            );

            break;


        case "oldest":

            filtered.sort(
                (a, b) =>
                    a.createdAt -
                    b.createdAt
            );

            break;


        case "alphabetical":

            filtered.sort(
                (a, b) =>
                    a.text.localeCompare(
                        b.text
                    )
            );

            break;


        case "priority":

            const order = {

                high: 1,

                medium: 2,

                low: 3

            };


            filtered.sort(
                (a, b) =>
                    order[a.priority] -
                    order[b.priority]
            );

            break;


        case "due":

            filtered.sort(
                (a, b) => {

                    if (
                        !a.dueDate
                    ) {

                        return 1;

                    }


                    if (
                        !b.dueDate
                    ) {

                        return -1;

                    }


                    return (
                        new Date(
                            a.dueDate
                        ) -

                        new Date(
                            b.dueDate
                        )
                    );

                }
            );

            break;

    }


    /* =====================================
       EMPTY MESSAGE
    ===================================== */

    emptyMessage.style.display =
        filtered.length
            ? "none"
            : "block";


    /* =====================================
       CREATE TASKS
    ===================================== */

    filtered.forEach(
        task => {

            const li =
                document.createElement(
                    "li"
                );


            li.className =
                "task";


            li.dataset.id =
                task.id;


            li.classList.add(
                `${task.priority}-priority`
            );


            if (
                task.completed
            ) {

                li.classList.add(
                    "completed"
                );

            }


            if (
                isOverdue(task)
            ) {

                li.classList.add(
                    "overdue"
                );

            }


            const categoryIcon =
                categoryIcons[
                    task.category
                ] || "📌";


            li.innerHTML = `

                <div class="task-left">

                    <input
                        type="checkbox"
                        class="task-checkbox"
                        ${
                            task.completed
                                ? "checked"
                                : ""
                        }
                    >


                    <div class="task-info">

                        <div class="task-title">

                            ${escapeHTML(
                                task.text
                            )}

                        </div>


                        ${
                            task.description
                                ? `

                                <div class="task-description">

                                    ${escapeHTML(
                                        task.description
                                    )}

                                </div>

                                `
                                : ""
                        }


                        <div class="task-meta">


                            <span
                                class="badge category-badge"
                            >

                                ${categoryIcon}

                                ${escapeHTML(
                                    task.category
                                )}

                            </span>


                            <span
                                class="badge ${
                                    task.priority ===
                                    "high"

                                        ? "priority-high"

                                        : task.priority ===
                                          "medium"

                                        ? "priority-medium"

                                        : "priority-low"
                                }"
                            >

                                ${getPriorityText(
                                    task.priority
                                )}

                            </span>


                            ${
                                task.dueDate

                                    ? `

                                    <span
                                        class="badge due-date ${
                                            isOverdue(
                                                task
                                            )
                                                ? "overdue-date"
                                                : ""
                                        }"
                                    >

                                        ${
                                            isOverdue(
                                                task
                                            )
                                                ? "⚠️ Overdue"
                                                : "📅"
                                        }

                                        ${formatDate(
                                            task.dueDate
                                        )}

                                    </span>

                                    `

                                    : ""
                            }


                        </div>

                    </div>

                </div>


                <div class="task-actions">


                    <button
                        class="icon-btn edit-btn"
                        title="Edit task"
                    >

                        ✏️

                    </button>


                    <button
                        class="icon-btn delete-btn"
                        title="Delete task"
                    >

                        🗑️

                    </button>


                </div>

            `;


            /* =================================
               CHECKBOX
            ================================= */

            li.querySelector(
                ".task-checkbox"
            ).addEventListener(
                "change",
                () =>
                    toggleTask(
                        task.id
                    )
            );


            /* =================================
               EDIT
            ================================= */

            li.querySelector(
                ".edit-btn"
            ).addEventListener(
                "click",
                () =>
                    startEditing(
                        task.id
                    )
            );


            /* =================================
               DELETE
            ================================= */

            li.querySelector(
                ".delete-btn"
            ).addEventListener(
                "click",
                () =>
                    deleteTask(
                        task.id
                    )
            );


            taskList.appendChild(
                li
            );

        }
    );


    updateStatistics();

}


/* =========================================
   INLINE EDIT
========================================= */

function startEditing(id) {

    const task =
        tasks.find(
            item =>
                item.id === id
        );


    if (!task) return;


    const li =
        document.querySelector(
            `.task[data-id="${id}"]`
        );


    if (!li) return;


    li.innerHTML = `

        <div class="edit-panel">


            <input
                class="edit-title"
                value="${escapeAttribute(
                    task.text
                )}"
                placeholder="Task name"
            >


            <textarea
                class="edit-description"
                placeholder="Add notes (optional)"
            >${escapeHTML(
                task.description
            )}</textarea>


            <div class="edit-row">


                <!-- CATEGORY -->

                <select
                    class="edit-category"
                >

                    ${getCategoryOptions(
                        task.category
                    )}

                </select>


                <!-- PRIORITY -->

                <select
                    class="edit-priority"
                >

                    <option
                        value="low"
                        ${
                            task.priority ===
                            "low"
                                ? "selected"
                                : ""
                        }
                    >
                        🟢 Low
                    </option>


                    <option
                        value="medium"
                        ${
                            task.priority ===
                            "medium"
                                ? "selected"
                                : ""
                        }
                    >
                        🟡 Medium
                    </option>


                    <option
                        value="high"
                        ${
                            task.priority ===
                            "high"
                                ? "selected"
                                : ""
                        }
                    >
                        🔴 High
                    </option>

                </select>


                <!-- DUE DATE -->

                <input
                    type="date"
                    class="edit-due-date"
                    value="${escapeAttribute(
                        task.dueDate
                    )}"
                >

            </div>


            <div class="edit-actions">


                <button
                    class="cancel-edit-btn"
                >
                    Cancel
                </button>


                <button
                    class="save-edit-btn"
                >
                    💾 Save Changes
                </button>


            </div>


        </div>

    `;


    const title =
        li.querySelector(
            ".edit-title"
        );


    const description =
        li.querySelector(
            ".edit-description"
        );


    title.focus();


    /* =====================================
       SAVE
    ===================================== */

    li.querySelector(
        ".save-edit-btn"
    ).addEventListener(
        "click",
        () => {

            saveEdit(
                id,
                li
            );

        }
    );


    /* =====================================
       CANCEL
    ===================================== */

    li.querySelector(
        ".cancel-edit-btn"
    ).addEventListener(
        "click",
        () => {

            renderTasks();

        }
    );


    /* =====================================
       ENTER = SAVE
    ===================================== */

    title.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Enter"
            ) {

                event.preventDefault();

                saveEdit(
                    id,
                    li
                );

            }


            if (
                event.key ===
                "Escape"
            ) {

                renderTasks();

            }

        }
    );


    /* =====================================
       ESCAPE DESCRIPTION
    ===================================== */

    description.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                renderTasks();

            }

        }
    );

}


/* =========================================
   SAVE EDIT
========================================= */

function saveEdit(
    id,
    li
) {

    const task =
        tasks.find(
            item =>
                item.id === id
        );


    if (!task) return;


    const title =
        li.querySelector(
            ".edit-title"
        ).value.trim();


    if (!title) {

        showToast(
            "Task name cannot be empty.",
            "error"
        );

        return;

    }


    task.text =
        title;


    task.description =
        li.querySelector(
            ".edit-description"
        ).value.trim();


    const selectedCategory =
        li.querySelector(
            ".edit-category"
        ).value;


    task.category =
        categories.includes(
            selectedCategory
        )
            ? selectedCategory
            : "Personal";


    task.priority =
        li.querySelector(
            ".edit-priority"
        ).value;


    task.dueDate =
        li.querySelector(
            ".edit-due-date"
        ).value;


    saveTasks();

    renderTasks();


    showToast(
        "Task updated."
    );

}


/* =========================================
   TOGGLE TASK
========================================= */

function toggleTask(id) {

    const task =
        tasks.find(
            item =>
                item.id === id
        );


    if (!task) return;


    task.completed =
        !task.completed;


    saveTasks();

    renderTasks();


    showToast(
        task.completed
            ? "Task completed ✓"
            : "Task marked as active"
    );

}


/* =========================================
   DELETE TASK
========================================= */

function deleteTask(id) {

    const task =
        tasks.find(
            item =>
                item.id === id
        );


    if (!task) return;


    const li =
        document.querySelector(
            `.task[data-id="${id}"]`
        );


    if (!li) return;


    /*
        Save original HTML
        in case user cancels.
    */

    const original =
        li.innerHTML;


    li.innerHTML = `

        <div style="
            display:flex;
            align-items:center;
            justify-content:space-between;
            width:100%;
            gap:15px;
        ">


            <div>

                <strong>
                    Delete this task?
                </strong>


                <div style="
                    color:var(--muted);
                    font-size:13px;
                    margin-top:4px;
                ">

                    ${escapeHTML(
                        task.text
                    )}

                </div>

            </div>


            <div style="
                display:flex;
                gap:7px;
            ">


                <button
                    class="cancel-edit-btn"
                >
                    Cancel
                </button>


                <button
                    class="save-edit-btn"
                >
                    Delete
                </button>


            </div>


        </div>

    `;


    /* =====================================
       CANCEL DELETE
    ===================================== */

    li.querySelector(
        ".cancel-edit-btn"
    ).addEventListener(
        "click",
        () => {

            li.innerHTML =
                original;

            renderTasks();

        }
    );


    /* =====================================
       CONFIRM DELETE
    ===================================== */

    li.querySelector(
        ".save-edit-btn"
    ).addEventListener(
        "click",
        () => {

            tasks =
                tasks.filter(
                    item =>
                        item.id !== id
                );


            saveTasks();

            renderTasks();


            showToast(
                "Task deleted."
            );

        }
    );

}


/* =========================================
   STATISTICS
========================================= */

function updateStatistics() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task =>
                task.completed
        ).length;


    const active =
        total -
        completed;


    const percentage =
        total === 0
            ? 0
            : Math.round(
                (
                    completed /
                    total
                ) * 100
            );


    totalCount.textContent =
        total;


    activeCount.textContent =
        active;


    completedCount.textContent =
        completed;


    progressPercent.textContent =
        percentage + "%";


    progressText.textContent =
        percentage + "%";


    progressFill.style.width =
        percentage + "%";

}


/* =========================================
   CLEAR COMPLETED
========================================= */

clearCompletedBtn.addEventListener(
    "click",
    () => {

        const completed =
            tasks.filter(
                task =>
                    task.completed
            );


        if (
            completed.length ===
            0
        ) {

            showToast(
                "No completed tasks.",
                "error"
            );

            return;

        }


        tasks =
            tasks.filter(
                task =>
                    !task.completed
            );


        saveTasks();

        renderTasks();


        showToast(
            `${completed.length} completed task(s) removed.`
        );

    }
);


/* =========================================
   CLEAR ALL
========================================= */

clearAllBtn.addEventListener(
    "click",
    () => {

        if (
            tasks.length ===
            0
        ) {

            showToast(
                "There are no tasks.",
                "error"
            );

            return;

        }


        const button =
            clearAllBtn;


        const original =
            button.textContent;


        button.textContent =
            "Click again to confirm";


        button.style.background =
            "#dc2626";

        button.style.color =
            "white";


        const cancel =
            () => {

                button.textContent =
                    original;

                button.style.background =
                    "";

                button.style.color =
                    "";

                button.onclick =
                    null;

            };


        button.onclick =
            () => {

                tasks = [];


                saveTasks();

                renderTasks();

                cancel();


                showToast(
                    "All tasks deleted."
                );

            };


        setTimeout(
            cancel,
            3000
        );

    }
);


/* =========================================
   EXPORT
========================================= */

exportBtn.addEventListener(
    "click",
    () => {

        if (
            tasks.length ===
            0
        ) {

            showToast(
                "There are no tasks to export.",
                "error"
            );

            return;

        }


        const data =
            JSON.stringify(
                tasks,
                null,
                2
            );


        const blob =
            new Blob(
                [data],
                {
                    type:
                        "application/json"
                }
            );


        const url =
            URL.createObjectURL(
                blob
            );


        const link =
            document.createElement(
                "a"
            );


        link.href =
            url;


        link.download =
            "my-tasks.json";


        link.click();


        URL.revokeObjectURL(
            url
        );


        showToast(
            "Tasks exported."
        );

    }
);


/* =========================================
   IMPORT
========================================= */

importInput.addEventListener(
    "change",
    event => {

        const file =
            event.target.files[0];


        if (!file) return;


        const reader =
            new FileReader();


        reader.onload =
            function(e) {

                try {

                    const imported =
                        JSON.parse(
                            e.target.result
                        );


                    if (
                        !Array.isArray(
                            imported
                        )
                    ) {

                        throw new Error();

                    }


                    const valid =
                        imported
                            .map(
                                (task, index) => ({

                                    id:
                                        task.id ||
                                        Date.now() +
                                        index,

                                    text:
                                        String(
                                            task.text ||
                                            ""
                                        ).trim(),

                                    description:
                                        String(
                                            task.description ||
                                            ""
                                        ),

                                    completed:
                                        Boolean(
                                            task.completed
                                        ),

                                    category:
                                        categories.includes(
                                            task.category
                                        )
                                            ? task.category
                                            : "Personal",

                                    priority:
                                        [
                                            "low",
                                            "medium",
                                            "high"
                                        ].includes(
                                            task.priority
                                        )
                                            ? task.priority
                                            : "medium",

                                    dueDate:
                                        task.dueDate ||
                                        "",

                                    createdAt:
                                        task.createdAt ||
                                        Date.now()

                                })
                            )
                            .filter(
                                task =>
                                    task.text
                            );


                    if (
                        valid.length ===
                        0
                    ) {

                        throw new Error();

                    }


                    /*
                        Add imported tasks
                        to existing tasks.
                    */

                    tasks = [
                        ...tasks,
                        ...valid
                    ];


                    saveTasks();

                    renderTasks();


                    showToast(
                        `${valid.length} task(s) imported.`
                    );


                } catch {

                    showToast(
                        "Invalid task file.",
                        "error"
                    );

                }

            };


        reader.readAsText(
            file
        );


        importInput.value =
            "";

    }
);


/* =========================================
   DARK MODE
========================================= */

let darkMode =
    localStorage.getItem(
        "darkMode"
    ) === "true";


function applyTheme() {

    document.body.classList.toggle(
        "dark",
        darkMode
    );


    themeBtn.textContent =
        darkMode
            ? "☀️"
            : "🌙";

}


themeBtn.addEventListener(
    "click",
    () => {

        darkMode =
            !darkMode;


        localStorage.setItem(
            "darkMode",
            darkMode
        );


        applyTheme();

    }
);


applyTheme();


/* =========================================
   SEARCH / FILTERS
========================================= */

searchInput.addEventListener(
    "input",
    renderTasks
);


filterInput.addEventListener(
    "change",
    renderTasks
);


categoryFilter.addEventListener(
    "change",
    renderTasks
);


priorityFilter.addEventListener(
    "change",
    renderTasks
);


sortInput.addEventListener(
    "change",
    renderTasks
);


/* =========================================
   ADD
========================================= */

addBtn.addEventListener(
    "click",
    addTask
);


taskInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Enter"
        ) {

            addTask();

        }

    }
);


/* =========================================
   HELPERS
========================================= */

function getPriorityText(
    priority
) {

    if (
        priority ===
        "high"
    ) {

        return "🔴 High";

    }


    if (
        priority ===
        "medium"
    ) {

        return "🟡 Medium";

    }


    return "🟢 Low";

}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(
    text
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        String(
            text
        );


    return div.innerHTML;

}


/* =========================================
   ESCAPE ATTRIBUTE
========================================= */

function escapeAttribute(
    text
) {

    return escapeHTML(
        text
    )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================
   FORMAT DATE
========================================= */

function formatDate(
    date
) {

    if (!date) return "";


    const d =
        new Date(
            date +
            "T00:00:00"
        );


    return d.toLocaleDateString(
        undefined,
        {
            day:
                "numeric",

            month:
                "short",

            year:
                "numeric"
        }
    );

}


/* =========================================
   IS OVERDUE
========================================= */

function isOverdue(
    task
) {

    if (
        !task.dueDate ||
        task.completed
    ) {

        return false;

    }


    const today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );


    const due =
        new Date(
            task.dueDate +
            "T00:00:00"
        );


    return due < today;

}


/* =========================================
   START
========================================= */

renderTasks();