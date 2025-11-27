let taskTitle = "Learn JavaScript";
let taskDescription = "Complete assignments step by step";
let taskDueDate = "2024-12-31";
let isCompleted = false;
let taskPriority = "High";
let taskCategories = ["Study", "Programming", "Personal"];

function createTask(title, description, priority){
    return {
        title: title, 
        description: description, 
        priority: priority,
        isCompleted: false,
        createdAt: new Date().toLocaleDateString()
    };
}

function displayTask(task){
    console.log(`${task.title}`); 
    console.log(`${task.description}`);
    console.log(`${task.priority}`);
    console.log(`${task.isCompleted}`);
    console.log(`${task.createdAt}`);
    console.log("-----");
}

function updatePriority(task, priority){
    task.priority = priority; 
    console.log(`The ${task.title} priority is update to ${task.priority}`); 
    return task;
}

function completeTask(task){
    task.isCompleted = true; 
    return task; 
}

const task1 = createTask("Buy groceries", "Milk, Eggs, Bread", "Medium");
const task2 = createTask("Finish homework", "Math assignment chapter 5", "High");

displayTask(task1);
displayTask(task2);

// Mark first task as complete
completeTask(task1);
console.log("After completing task 1:");
displayTask(task1);