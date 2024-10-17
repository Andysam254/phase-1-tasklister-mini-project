document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#create-task-form");
    const sortSelect = document.querySelector("#sort-tasks");
    let tasks = []; // Array to hold all tasks

    // Add event listener for form submission
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      
      // Get values from the form
      const taskDescription = document.querySelector("#new-task-description").value.trim();
      const taskUser = document.querySelector("#task-user").value.trim();
      const taskDuration = document.querySelector("#task-duration").value.trim();
      const taskDueDate = document.querySelector("#task-due-date").value;
      const taskPriority = document.querySelector("#task-priority").value;

      // Simple validation: Ensure all fields are filled
      if (!taskDescription || !taskUser || !taskDuration || !taskDueDate || !taskPriority) {
        alert("All fields are required!");
        return;
      }

      // Create task object
      const task = {
        description: taskDescription,
        user: taskUser,
        duration: taskDuration,
        dueDate: taskDueDate,
        priority: taskPriority
      };

      // Add task to task array
      tasks.push(task);
      
      // Display tasks
      displayTasks(tasks);
      
      // Reset form after submission
      form.reset();
    });

    // Listen for changes in the sort dropdown
    sortSelect.addEventListener("change", function() {
      displayTasks(tasks);
    });

    // Function to display tasks
    function displayTasks(taskList) {
      const taskListElement = document.querySelector("#tasks");
      taskListElement.innerHTML = ""; // Clear existing tasks

      // Sort tasks based on the selected sorting option
      const sortOrder = sortSelect.value;
      const sortedTasks = [...taskList]; // Make a copy of the task array to sort

      // Priority mapping for sorting
      const priorityMap = {
        high: 1,
        medium: 2,
        low: 3
      };

      // Sort tasks by priority (ascending or descending)
      if (sortOrder === "ascending") {
        sortedTasks.sort((a, b) => priorityMap[a.priority.toLowerCase()] - priorityMap[b.priority.toLowerCase()]);
      } else if (sortOrder === "descending") {
        sortedTasks.sort((a, b) => priorityMap[b.priority.toLowerCase()] - priorityMap[a.priority.toLowerCase()]);
      }

      // Create task elements and append to list
      sortedTasks.forEach(task => {
        const newTask = document.createElement("li");
        newTask.innerHTML = `
          <strong>Description:</strong> ${task.description} <br>
          <strong>User:</strong> ${task.user} <br>
          <strong>Duration:</strong> ${task.duration} <br>
          <strong>Due Date:</strong> ${task.dueDate} <br>
          <strong>Priority:</strong> ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        `;

        // Color-code tasks based on priority
        switch (task.priority.toLowerCase()) {
          case "high":
            newTask.style.color = "red";
            break;
          case "medium":
            newTask.style.color = "green";
            break;
          case "low":
            newTask.style.color = "blue";
            break;
          default:
            newTask.style.color = "black";
        }

        // Create delete button for each task
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", function() {
          tasks = tasks.filter(t => t !== task); // Remove task from array
          displayTasks(tasks); // Update the task display
        });

        newTask.appendChild(deleteButton);
        taskListElement.appendChild(newTask);
      });
    }
});
