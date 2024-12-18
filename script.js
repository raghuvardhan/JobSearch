// Get DOM elements
const taskInput = document.getElementById("new-task");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

const dailyTasks = [["Continue applying to 10 jobs daily",
  "Send connection requests to 20 professionals every day",
  "Engage with 3-5 posts on LinkedIn daily to improve visibility",
  "Search and save 10 job posts",
]];

const weeklyTasks = [
"Tailor the resume for Technical Support Engineer role.",
"Create another tailored version for Technical Writer role.",
"Optimize LinkedIn headline and summary section",
"Add work experience with tailored descriptions",
"Add skills: HTML, CSS, JavaScript, SQL, Communication, Technical Writing",
"Connect with 20 professionals from Bangalore/technical roles (30 min",
"Set up job alerts for “Technical Support” and “Technical Writer” on:LinkedIn, Naukri, Indeed, and Shine",
"Write one generic cover letter for Technical Support roles",
"Write one generic cover letter for Technical Writer roles",
"Customize the cover letter slightly for each job application",
"Connect with recruiters and hiring managers on LinkedIn",
"Create a basic portfolio website to showcase her HTML/CSS/JS skills",
"Include 2-3 sample projects like:- Responsive personal website.- Simple CRUD app (similar to her internship work).",
"Share portfolio link on LinkedIn profile",
" Add a simple project to her GitHub",
  "Create a “Bug Tracker” web app using HTML, CSS, and JavaScript.",
" Update portfolio with project details and GitHub links (30 mins).",
" Practice Technical Support interview questions: - [Top 20 Questions](https://resources.workable.com/technical-support-interview-questions) (1 hour).",
" Learn to explain previous projects clearly:",
"    - Write 5-6 bullet points for each project describing:",
"        - What problem it solved",
"        - What tools/skills were used",
"        - What challenges she overcame (1 hour).",
" Practice soft skills answers for questions like “Tell me about yourself,” “Why this role?”",
"Follow up on all previously submitted applications via email or LinkedIn messages",
 "Conduct 1-2 mock interviews:",
 "Record answers to common interview questions and improve delivery",
];

// Load tasks for the current day from localStorage or initialize
let tasks = JSON.parse(localStorage.getItem("tasks")) || preloadTasksForToday();
let today = new Date().toDateString();

// Preload tasks based on the current day
function preloadTasksForToday() {
  const dayOfWeek = new Date().getDay(); // Sunday=0, Monday=1, ...
  
  if (dayOfWeek === 0) return [];
  return weeklyTasks.slice(0,3).map(task => ({
    text: task,
    completed: false
  }));
}

tasks.push(dailyTasks.map(task => ({text: task, completed: false})));

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
