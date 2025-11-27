const taskManager = {
    tasks : [], 

    addTask: function(title, description, priority = "Medium") {
        const newTask = {
            id: Date.now(),
            title: title,
            description: description,
            priority: priority,
            isCompleted: false,
            createdAt: new Date().toLocaleDateString()
        };
        this.tasks.push(newTask);
        this.renderTasks(); 
        return newTask;
    },

    completeTask : function(id) {
        const task = this.tasks.find(task => task.id === id); 

        if (task) {
            task.isCompleted = !task.isCompleted; // Toggle completion
            this.renderTasks(); 
            return; 
        }
    }, 

    deleteTask : function(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.renderTasks(); 
        return; 
    },

    renderTasks : function() {
        const taskList = document.getElementById('taskList'); 
        taskList.innerHTML = '<h2>Your Tasks</h2>';

        if(this.tasks.length === 0) {
            taskList.innerHTML += '<p>No tasks yet. Add one above!</p>';
            return; 
        }

        this.tasks.forEach(task => {
            const taskElement = document.createElement('div'); 
            taskElement.className = `task ${task.priority.toLowerCase()} ${task.isCompleted ? 'completed' : ''}`; 

            taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <div>
                    <span>Priority: ${task.priority}</span> | 
                    <span>Created: ${task.createdAt}</span>
            </div>

            <button onclick="taskManager.completeTask(${task.id})">
                    ${task.isCompleted ? 'Undo' : 'Complete'}
            </button>

            <button onclick="taskManager.deleteTask(${task.id})">Delete</button>
            `; 

            taskList.appendChild(taskElement); 
        })
    }
}; 

function addTaskFromInput() {
    const titleInput = document.getElementById('taskTitle'); 
    const descInput = document.getElementById('taskDescription');
    const prioritySelect = document.getElementById('taskPriority');

    if (titleInput.value.trim() === ''){
        alert('Please enter a task title!'); 
        return; 
    }

    taskManager.addTask(titleInput.value, descInput.value, prioritySelect.value); 

    // clear Inputs
    titleInput.value = ''; 
    descInput.value = ''; 
    titleInput.focus(); 
}


document.addEventListener('DOMContentLoaded', function() {
    taskManager.renderTasks();
});