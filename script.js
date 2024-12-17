// Get DOM elements
const taskInput = document.getElementById("new-task");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Predefined tasks for 4 weeks (simple structure for demo)
const weeklyTasks = [
  // Week 1 Tasks
  ["Tailor resume for Technical Support role", 
   "Optimize LinkedIn headline and summary", 
   "Write a generic cover letter for Technical Support roles",
   "Set up job alerts on LinkedIn, Naukri, and Indeed"],
  // Week 2 Tasks
  ["Enroll in Google UX Design Certificate on Coursera", 
   "Learn Figma Basics on YouTube", 
   "Apply to 10 jobs today", 
   "Complete Udemy QA Manual Testing Course"],
  // Week 3 Tasks
  ["Add a project to GitHub portfolio", 
   "Update GitHub with CRUD app", 
   "Practice common interview questions", 
   "Conduct mock interview with a friend"],
  // Week 4 Tasks
  ["Follow up on job applications", 
   "Engage with 5 LinkedIn posts", 
   "Send 20 LinkedIn connection requests", 
   "Practice explaining projects in interviews"]
];

// Load tasks for the current day from localStorage or initialize
let tasks = JSON.parse(localStorage.getItem("tasks")) || preloadTasksForToday();
let today = new Date().toDateString();

// Preload tasks based on the current day
function preloadTasksForToday() {
  const dayOfWeek = new Date().getDay(); // Sunday=0, Monday=1, ...
  
  // Rest on Sunday, otherwise load tasks for the current week
  if (dayOfWeek === 0) return [];
  const currentWeekIndex = Math.floor(dayOfWeek / 7); // Week 1-4
  
  return weeklyTasks[currentWeekIndex].map(task => ({
    text: task,
    completed: false
  }));
}

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="${task.completed ? "completed" : ""}" onclick="toggleTask(${index})">
        ${task.text}
      </span>
      <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// Add task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = "";
    updateLocalStorage();
    renderTasks();
  }
}

// Toggle task completion
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  updateLocalStorage();
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  updateLocalStorage();
  renderTasks();
}

// Carry forward incomplete tasks to the next day
function carryForwardTasks() {
  const lastVisit = localStorage.getItem("lastVisit");
  
  if (lastVisit !== today) {
    tasks = tasks.filter(task => !task.completed); // Carry forward only incomplete tasks
    localStorage.setItem("lastVisit", today);
    updateLocalStorage();
  }
}

// Update localStorage
function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Initialize
carryForwardTasks();
renderTasks();

// Event listeners
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});
