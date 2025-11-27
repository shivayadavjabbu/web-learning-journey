// task manager with array objects


const taskManager = {
    tasks: [], 

    // add a new task 

    addTask : function(title, description, priority = "medium"){
        const newTask = {
            id : Date.now(), 
            title : title, 
            description : description,
            priority : priority,
            isCompleted : false, 
            createdAt : new Date().toLocaleDateString(),
            dueDate : null
        }; 

        this.tasks.push(newTask); 

        console.log("The new task is successfully pused");
    }, 

    displayAllTasks : function() {
        console.log("/n === ALL TASKS"); 

        if(this.tasks.length === 0) {
            console.log("No tasks added yet!"); 
            return; 
        }

        this.tasks.forEach((task, index) => {
            console.log(`${index + 1}.${task.title} ${task.description} ${task.priority} ${task.isCompleted}`); 
        }); 
    }, 

    findTaskById : function(id) {
        return this.tasks.find(task => task.id === id); 
    }, 

    completeTask : function(id){
        const task = this.findTaskById(id); 

        if(task) {
            task.isCompleted = true; 
            console.log(`Task ${task.title} is completed!`); 
        } else {
            console.log("Task is not found!"); 
        }
    }, 

    getTasksByPriority : function(priority) {
        return this.tasks.filter(task => task.priority === priority); 
    }

}; 

taskManager.addTask("Learn JavaScript", "Complete all assignments", "High");
taskManager.addTask("Go for a walk", "30 minutes in the park", "Low");
taskManager.addTask("Read book", "Chapter 3-4", "Medium");

taskManager.displayAllTasks();

// Complete a task
const firstTaskId = taskManager.tasks[0].id;
taskManager.completeTask(firstTaskId);

taskManager.displayAllTasks();

// Show high priority tasks
console.log("\n=== HIGH PRIORITY TASKS ===");
const highPriorityTasks = taskManager.getTasksByPriority("High");
console.log(highPriorityTasks);