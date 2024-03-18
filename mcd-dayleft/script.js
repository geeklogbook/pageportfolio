document.addEventListener("DOMContentLoaded", function() {
    const courses = [
        {
            "name": "Introduccion a la programacion en Python",
            "tasks": [
                { "week": 1, "name": "Tarea semana 1", "start_date": "3/18/2024", "end_date": "3/25/2024" },
                { "week": 2, "name": "Tarea semana 2", "start_date": "3/25/2024", "end_date": "4/1/2024" },
                { "week": 3, "name": "Tarea semana 3", "start_date": "4/1/2024", "end_date": "4/8/2024" },
                { "week": 4, "name": "Tarea semana 4", "start_date": "4/8/2024", "end_date": "4/15/2024" },
                { "week": 5, "name": "Tarea semana 5", "start_date": "4/15/2024", "end_date": "4/22/2024" },
                { "week": 6, "name": "Tarea semana 6", "start_date": "4/22/2024", "end_date": "4/29/2024" },
                { "week": 7, "name": "Tarea semana 7", "start_date": "4/29/2024", "end_date": "5/6/2024" },
                { "week": 8, "name": "Tarea semana 8", "start_date": "5/6/2024", "end_date": "5/13/2024" }
            ]
        },
        {
            "name": "Ingenieria de Datos",
            "tasks": [
                { "week": 1, "name": "Tarea semana 1" },
                { "week": 2, "name": "Tarea semana 2" },
                { "week": 3, "name": "Tarea semana 3" },
                { "week": 4, "name": "Tarea semana 4" },
                { "week": 5, "name": "Tarea semana 5" },
                { "week": 6, "name": "Tarea semana 6" },
                { "week": 7, "name": "Tarea semana 7" },
                { "week": 8, "name": "Tarea semana 8" }
            ]
        }
    ];

    const tasks = [];
    courses.forEach(course => {
        course.tasks.forEach(task => {
            tasks.push({
                course: course.name,
                week: task.week,
                task: task.name,
                start_date: task.start_date || "",
                end_date: task.end_date || ""
            });
        });
    });

    const tasksContainer = document.getElementById("tasks");
    const currentDayElement = document.getElementById("currentDay");

    function updateTasks() {
        const currentDate = new Date();
        const currentDay = currentDate.toLocaleDateString("es-AR");
        currentDayElement.textContent = `Hoy es: ${currentDay}`;

        tasks.forEach(task => {
            if (task.start_date && task.end_date) {
                const startDate = new Date(task.start_date);
                const endDate = new Date(task.end_date);
                const daysRemaining = Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24));
                task.days_remaining = daysRemaining;
            } else {
                task.days_remaining = "N/A";
            }
        });

        tasks.sort((a, b) => {
            if (typeof a.days_remaining === "number" && typeof b.days_remaining === "number") {
                return a.days_remaining - b.days_remaining;
            } else {
                return 0;
            }
        });

        tasksContainer.innerHTML = "";
        tasks.forEach(task => {
            const taskElement = document.createElement("div");
            taskElement.classList.add("task");
            taskElement.innerHTML = `
                <div class="task-title">${task.course} - ${task.task}</div>
                <div class="task-dates">Inicio: ${task.start_date} - Fin: ${task.end_date}</div>
                <div class="task-days-remaining">Días restantes: ${task.days_remaining}</div>
            `;
            if (typeof task.days_remaining === "number") {
                if (task.days_remaining <= 7) {  // Cambio a <= para que sea rojo si faltan 7 días exactamente
                    taskElement.classList.add("red");
                } else if (task.days_remaining <= 20) {
                    taskElement.classList.add("yellow");
                } else {
                    taskElement.classList.add("green");
                }
            }
            tasksContainer.appendChild(taskElement);
        });
    }

    updateTasks();
    setInterval(updateTasks, 60000);
});