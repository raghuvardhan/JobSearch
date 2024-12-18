// Get DOM elements
const taskInput = document.getElementById("new-task");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

const weeklyTasks = [
[
"Tailor the resume for Technical Support Engineer role.",
"Use action verbs and focus on support/troubleshooting tasks.",
"Highlight soft skills like communication and collaboration.",
"Spend 1 hour on this.",
"Create another tailored version for Technical Writer role.",
"Emphasize documentation experience.",
"Use this article for resume writing tips: [Technical Writing Resume Tips](https://zety.com/resume-examples/technical-writer).",
"Review both resumes for formatting, spelling, and grammar.",
"Use Grammarly for a quick check",
"Save resumes in PDF format. Name them properly (e.g., *Ramya_TechSupport.pdf*).",
"Optimize LinkedIn headline and summary section (1 hour).",
"Add work experience with tailored descriptions (1 hour).",
"Add skills: HTML, CSS, JavaScript, SQL, Communication, Technical Writing (30 mins).",
"Connect with 20 professionals from Bangalore/technical roles (30 min",
"Set up job alerts for “Technical Support” and “Technical Writer” on:LinkedIn, Naukri, Indeed, and Shine (1 hour).",
"Search and save 10 job posts (30 mins).",
"Write one generic cover letter for Technical Support roles (30 mins).",
"Use this free resource: [Cover Letter Example](https://zety.com/blog/cover-letter-for-support-jobs).",
"Write a similar cover letter tailored for Technical Writer roles (30 min",
"Apply to 10 jobs per day (2 hours).",
"Customize the cover letter slightly for each job application (30 mins).",
"Connect with recruiters and hiring managers on LinkedIn (30 mins).",
"Create a basic portfolio website to showcase her HTML/CSS/JS skills (3 hours).",
"Use [GitHub Pages](https://pages.github.com/) or [Netlify](https://www.netlify.com/).",
"Include 2-3 sample projects like:- Responsive personal website.- Simple CRUD app (similar to her internship work).",
"Share portfolio link on LinkedIn profile"],
["Continue applying to 10 jobs daily (2 hour)",
"Apply to 10 jobs per day"],
[" Add a simple project to her GitHub (3 hours total):",
"Create a “Bug Tracker” web app using HTML, CSS, and JavaScript.",
" Update portfolio with project details and GitHub links (30 mins).",
" Apply to 10 jobs daily (1.5 hours).",
" Practice Technical Support interview questions:",
"    - [Top 20 Questions](https://resources.workable.com/technical-support-interview-questions) (1 hour).",
" Learn to explain previous projects clearly:",
"    - Write 5-6 bullet points for each project describing:",
"        - What problem it solved",
"        - What tools/skills were used",
"        - What challenges she overcame (1 hour).",
" Practice soft skills answers for questions like “Tell me about yourself,” “Why this role?” (1 hour).",
" Apply to 10 jobs daily (1.5 hours)."
],
["Follow up on all previously submitted applications via email or LinkedIn messages (1.5 hours).",
 "Send connection requests to 20 professionals every day (30 mins).",
 "Engage with 3-5 posts on LinkedIn daily to improve visibility (30 mins).",
 "Apply to 10 jobs daily (1.5 hours).",
 "Conduct 1-2 mock interviews:",
 "   - Use platforms like [Pramp](https://www.pramp.com/) or ask friends to simulate interviews (1.5 hours).",
 "Record answers to common interview questions and improve delivery (1 hour).",
 "Apply to 10 jobs daily (1.5 hours)."
]];

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
