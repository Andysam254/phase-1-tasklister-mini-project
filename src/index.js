document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const userInput = document.getElementById('userInput');
    const durationInput = document.getElementById('durationInput');
    const dateInput = document.getElementById('dateInput');
    const priorityInput = document.getElementById('priorityInput');
    const taskList = document.getElementById('taskList');
  
    let tasks = [];
    let sortOrder = 'asc';
  
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const task = {
            id: Date.now(),
            text: taskInput.value,
            user: userInput.value,
            duration: durationInput.value,
            date: dateInput.value,
            priority: priorityInput.value,
        };
  
        tasks.push(task);
        renderTasks();
        taskForm.reset();
    });
  
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.classList.add('task', task.priority);
            li.innerHTML = `
                <span>${task.text} (User: ${task.user}, Duration: ${task.duration}, Due: ${task.date})</span>
                <div class="task-buttons">
                    <button onclick="editTask(${task.id})">Edit</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }
  
    window.deleteTask = function(id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    };
  
    window.editTask = function(id) {
        const task = tasks.find(task => task.id === id);
        if (task) {
            taskInput.value = task.text;
            userInput.value = task.user;
            durationInput.value = task.duration;
            dateInput.value = task.date;
            priorityInput.value = task.priority;
            deleteTask(id); // Remove the task before re-adding it
        }
    };
  
    document.getElementById('sortAsc').addEventListener('click', () => {
        tasks.sort((a, b) => a.priority.localeCompare(b.priority));
        renderTasks();
    });
  
    document.getElementById('sortDesc').addEventListener('click', () => {
        tasks.sort((a, b) => b.priority.localeCompare(a.priority));
        renderTasks();
        sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        renderTasks();erR
    });
  });
  
  
  