const taskManager = {
    tasks : [], 

    //intitialize the load tasks from local storage
    init : function() {
        this.loadTasks(); 
        this.renderTasks(); 
    }, 

    //Load tasks from local storage
    loadTasks : function() {
        const savedTasks = localStorage.getItem('taskManagerTasks'); 
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks); 
            console.log('Tasks loaded from localStorage:', this.tasks.length); 
        }
    }, 

    // save tasks to localStorage
    saveTasks : function() {
        localStorage.setItem('taskManagerTasks', JSON.stringify(this.tasks)); 
        console.log('Task saved to localStorage'); 
    }, 

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
        this.savedTasks(); 
        this.renderTasks(); 
        return newTask;
    },

    completeTask : function(id) {
        const task = this.tasks.find(task => task.id === id); 
        if (task) {
            task.isCompleted = !task.isCompleted; // Toggle completion
            this.savedTasks(); 
            this.renderTasks(); 
            return; 
        }
    }, 

    deleteTask : function(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.savedTasks(); 
        this.renderTasks(); 
        return; 
    },

    updateTask : function(id, updates) {
        const taskIndex = this.tasks.findIndex(task => task.id === id); 
        if(taskIndex !== -1){
            this.tasks[taskIndex] = {
                ...this.tasks[taskIndex],  ...updates
            }; 
            this.savedTasks(); 
            this.renderTasks(); 
        }
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
    },

    editTask : function(id) {
        const task = this.tasks.find(task => task.id === id); 

        if(!task) return; 

        const newTitle = prompt('Edit task title :', task.title); 
        const newDesc = prompt('Edit task description :', task.description); 
        const newPriority = prompt('Edit priority (High/Medium/Low):', task.priority); 

        if (newTitle !== null) {
            this.updateTask(id, {
                title : newTitle, 
                description : newDesc, 
                priority : newPriority
            })
        }
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

function clearAllTasks() {
    if (confirm('Are you sure you want to delete all tasks ?')) {
        taskManager.tasks = []; 
        taskManager.saveTasks(); 
        taskManager.renderTasks();
    }
}

//New: Add Keyboard shortcut
document.getElementById('taskTitle').addEventListener('keypress', function(e)) {
    if(e.key === 'Enter') {
        addTaskFromInput(); 
    }
}

//initialize the task manager when page reloads
document.addEventListener('DOMContentLoaded', function() {
    taskManager.init(); 
});