const tasks = [
    {
        title: "Apprendre mon cours de JavaScript",
        priority: 1
    },
    {
        title: "Créer mon compte Github",
        priority: 2
    },
    {
        title: "Répondre à mes emails",
        priority: 3
    }
];

document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('task-list');
    const taskForm = document.getElementById('task-form');
    const deleteTasksButton = document.getElementById('delete-tasks');
    const notification = document.getElementById('notification');

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `priority-${task.priority}`;

            const label = document.createElement('label');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.dataset.index = index;
            checkbox.addEventListener('change', function () {
                if (checkbox.checked) {
                    li.classList.add('completed');
                } else {
                    li.classList.remove('completed');
                }
            });

            const text = document.createTextNode(task.title);

            label.appendChild(checkbox);
            label.appendChild(text);
            li.appendChild(label);
            taskList.appendChild(li);
        });
    }

    function showNotification(message) {
        notification.textContent = message;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const titleInput = document.getElementById('task-title');
        const priorityInput = document.getElementById('task-priority');

        const newTask = {
            title: titleInput.value,
            priority: parseInt(priorityInput.value)
        };

        tasks.push(newTask);
        renderTasks();

        taskForm.reset();
    });

    deleteTasksButton.addEventListener('click', function () {
        const checkboxes = taskList.querySelectorAll('input[type="checkbox"]:checked');
        const count = checkboxes.length;
        checkboxes.forEach(checkbox => {
            const index = checkbox.dataset.index;
            tasks.splice(index, 1);
        });
        renderTasks();

        if (count > 0) {
            showNotification(`${count} tâche(s) supprimée(s) avec succès`);
        }
    });

    renderTasks();
});
