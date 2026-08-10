const taskInput =
        document.getElementById("taskInput");

    const categoryInput =
        document.getElementById("categoryInput");

    const priorityInput =
        document.getElementById("priorityInput");

    const addBtn =
        document.getElementById("addBtn");

    const searchInput =
        document.getElementById("searchInput");

    const filterInput =
        document.getElementById("filterInput");

    const categoryFilter =
        document.getElementById("categoryFilter");

    const priorityFilter =
        document.getElementById("priorityFilter");

    const sortInput =
        document.getElementById("sortInput");

    const taskList =
        document.getElementById("taskList");

    const emptyMessage =
        document.getElementById("emptyMessage");

    const totalCount =
        document.getElementById("totalCount");

    const activeCount =
        document.getElementById("activeCount");

    const completedCount =
        document.getElementById("completedCount");

    const progressPercent =
        document.getElementById("progressPercent");

    const progressText =
        document.getElementById("progressText");

    const progressFill =
        document.getElementById("progressFill");

    const clearCompletedBtn =
        document.getElementById("clearCompletedBtn");

    const clearAllBtn =
        document.getElementById("clearAllBtn");

    const exportBtn =
        document.getElementById("exportBtn");

    const importInput =
        document.getElementById("importInput");


    // Load tasks

    let tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];


    // Make old tasks compatible

    tasks = tasks.map((task, index) => ({

        id:
            task.id ||
            Date.now() + index,

        text:
            task.text || "",

        completed:
            Boolean(task.completed),

        category:
            task.category ||
            "Personal",

        priority:
            task.priority ||
            "medium",

        createdAt:
            task.createdAt ||
            Date.now()

    }));


    saveTasks();


    // Save

    function saveTasks() {

        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );

    }


    // Add Task

    function addTask() {

        const text =
            taskInput.value.trim();


        if (!text) {

            alert(
                "Please enter a task."
            );

            taskInput.focus();

            return;
        }


        tasks.push({

            id: Date.now(),

            text: text,

            completed: false,

            category:
                categoryInput.value,

            priority:
                priorityInput.value,

            createdAt: Date.now()

        });


        saveTasks();

        taskInput.value = "";

        renderTasks();

        taskInput.focus();

    }


    // Render

    function renderTasks() {

        taskList.innerHTML = "";


        let filteredTasks =
            [...tasks];


        // Search

        const search =
            searchInput.value
                .toLowerCase()
                .trim();


        if (search) {

            filteredTasks =
                filteredTasks.filter(task =>
                    task.text
                        .toLowerCase()
                        .includes(search)
                );

        }


        // Status filter

        if (filterInput.value === "active") {

            filteredTasks =
                filteredTasks.filter(
                    task => !task.completed
                );

        }


        if (filterInput.value === "completed") {

            filteredTasks =
                filteredTasks.filter(
                    task => task.completed
                );

        }


        // Category

        if (
            categoryFilter.value !== "all"
        ) {

            filteredTasks =
                filteredTasks.filter(
                    task =>
                        task.category ===
                        categoryFilter.value
                );

        }


        // Priority

        if (
            priorityFilter.value !== "all"
        ) {

            filteredTasks =
                filteredTasks.filter(
                    task =>
                        task.priority ===
                        priorityFilter.value
                );

        }


        // Sorting

        if (sortInput.value === "newest") {

            filteredTasks.sort(
                (a, b) =>
                    b.createdAt -
                    a.createdAt
            );

        }


        if (sortInput.value === "oldest") {

            filteredTasks.sort(
                (a, b) =>
                    a.createdAt -
                    b.createdAt
            );

        }


        if (sortInput.value === "alphabetical") {

            filteredTasks.sort(
                (a, b) =>
                    a.text.localeCompare(
                        b.text
                    )
            );

        }


        if (sortInput.value === "priority") {

            const priorityOrder = {

                high: 1,

                medium: 2,

                low: 3

            };


            filteredTasks.sort(
                (a, b) =>
                    priorityOrder[a.priority] -
                    priorityOrder[b.priority]
            );

        }


        // Empty message

        if (filteredTasks.length === 0) {

            emptyMessage.style.display =
                "block";

        } else {

            emptyMessage.style.display =
                "none";

        }


        // Display tasks

        filteredTasks.forEach(task => {

            const li =
                document.createElement("li");


            li.className = "task";


            if (task.completed) {

                li.classList.add(
                    "completed"
                );

            }


            li.innerHTML = `

                <div class="task-left">

                    <input
                        type="checkbox"
                        ${
                            task.completed
                                ? "checked"
                                : ""
                        }
                    >

                    <div class="task-info">

                        <div class="task-title">
                            ${escapeHTML(task.text)}
                        </div>

                        <div class="task-meta">

                            <span class="category">
                                ${escapeHTML(task.category)}
                            </span>

                            <span class="priority ${task.priority}">
                                ${getPriorityText(task.priority)}
                            </span>

                        </div>

                    </div>

                </div>


                <div class="actions">

                    <button
                        class="edit-btn"
                        title="Edit"
                    >
                        ✏️
                    </button>

                    <button
                        class="delete-btn"
                        title="Delete"
                    >
                        🗑️
                    </button>

                </div>

            `;


            // Checkbox

            li.querySelector(
                'input[type="checkbox"]'
            ).addEventListener(
                "change",
                () => toggleTask(task.id)
            );


            // Edit

            li.querySelector(
                ".edit-btn"
            ).addEventListener(
                "click",
                () => editTask(task.id)
            );


            // Delete

            li.querySelector(
                ".delete-btn"
            ).addEventListener(
                "click",
                () => deleteTask(task.id)
            );


            taskList.appendChild(li);

        });


        updateStatistics();

    }


    // Statistics

    function updateStatistics() {

        const total =
            tasks.length;


        const completed =
            tasks.filter(
                task => task.completed
            ).length;


        const active =
            total - completed;


        const percentage =
            total === 0
                ? 0
                : Math.round(
                    (completed / total) * 100
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


    // Toggle

    function toggleTask(id) {

        const task =
            tasks.find(
                task => task.id === id
            );


        if (!task) return;


        task.completed =
            !task.completed;


        saveTasks();

        renderTasks();

    }


    // Edit

    function editTask(id) {

        const task =
            tasks.find(
                task => task.id === id
            );


        if (!task) return;


        const updatedText =
            prompt(
                "Edit task:",
                task.text
            );


        if (updatedText === null) {

            return;

        }


        const trimmedText =
            updatedText.trim();


        if (!trimmedText) {

            alert(
                "Task cannot be empty."
            );

            return;

        }


        task.text =
            trimmedText;


        saveTasks();

        renderTasks();

    }


    // Delete

    function deleteTask(id) {

        const confirmed =
            confirm(
                "Are you sure you want to delete this task?"
            );


        if (!confirmed) return;


        tasks =
            tasks.filter(
                task => task.id !== id
            );


        saveTasks();

        renderTasks();

    }


    // Clear completed

    clearCompletedBtn.addEventListener(
        "click",
        () => {

            const completed =
                tasks.filter(
                    task => task.completed
                );


            if (completed.length === 0) {

                alert(
                    "There are no completed tasks."
                );

                return;

            }


            const confirmed =
                confirm(
                    `Delete ${completed.length} completed task(s)?`
                );


            if (!confirmed) return;


            tasks =
                tasks.filter(
                    task => !task.completed
                );


            saveTasks();

            renderTasks();

        }
    );


    // Delete all

    clearAllBtn.addEventListener(
        "click",
        () => {

            if (tasks.length === 0) {

                alert(
                    "There are no tasks."
                );

                return;

            }


            const confirmed =
                confirm(
                    "Delete ALL tasks? This cannot be undone."
                );


            if (!confirmed) return;


            tasks = [];


            saveTasks();

            renderTasks();

        }
    );


    // Export

    exportBtn.addEventListener(
        "click",
        () => {

            if (tasks.length === 0) {

                alert(
                    "There are no tasks to export."
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
                document.createElement("a");


            link.href = url;

            link.download =
                "my-tasks.json";


            document.body.appendChild(
                link
            );


            link.click();


            link.remove();


            URL.revokeObjectURL(
                url
            );

        }
    );


    // Import

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

                            throw new Error(
                                "Invalid format"
                            );

                        }


                        const validTasks =
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

                                        completed:
                                            Boolean(
                                                task.completed
                                            ),

                                        category:
                                            task.category ||
                                            "Personal",

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
                            validTasks.length === 0
                        ) {

                            alert(
                                "No valid tasks found."
                            );

                            return;

                        }


                        const replace =
                            confirm(
                                "Press OK to REPLACE your current tasks.\n\n" +
                                "Press Cancel to ADD the imported tasks."
                            );


                        if (replace) {

                            tasks =
                                validTasks;

                        } else {

                            tasks = [
                                ...tasks,
                                ...validTasks
                            ];

                        }


                        saveTasks();

                        renderTasks();


                        alert(
                            `${validTasks.length} task(s) imported successfully.`
                        );


                    } catch (error) {

                        alert(
                            "Could not import this file. Please select a valid task JSON file."
                        );

                    }

                };


            reader.readAsText(file);

            importInput.value = "";

        }
    );


    // Search

    searchInput.addEventListener(
        "input",
        renderTasks
    );


    // Filters

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


    // Add button

    addBtn.addEventListener(
        "click",
        addTask
    );


    // Enter

    taskInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                addTask();

            }

        }
    );


    // Helpers

    function getPriorityText(priority) {

        if (priority === "high") {

            return "🔴 High";

        }


        if (priority === "medium") {

            return "🟡 Medium";

        }


        if (priority === "low") {

            return "🟢 Low";

        }


        return "Medium";

    }


    function escapeHTML(text) {

        const div =
            document.createElement("div");


        div.textContent =
            text;


        return div.innerHTML;

    }


    // Start app

    renderTasks();