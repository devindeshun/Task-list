const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

let loadEventListeners = () => {
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
};

let getTasks = () => {
  // instantiate the variable tasks to be used to get tasks from local storage
  let tasks;
  localStorage.getItem("tasks") === null
    ? // If there is no such thing as tasks in local storage set tasks to an empty array
      (tasks = [])
    : // else get the key item pair of "tasks" and parse it into an array, assign it to tasks
      (tasks = JSON.parse(localStorage.getItem("tasks")));

  tasks.forEach((task) => {
    // Creates a text node of each task, creates a li with the className "collection-item" and appends the text node to the li
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));
    // Creates a link with the classNames "delete-item" and "secondary-content" and appends a cross icon from font-awesome for visuals, appends this to the li
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    // Appends each item to the ul stored in "taskList"
    taskList.appendChild(li);
  });
};

let storeTaskInLocalStorage = (task) => {
  // task is the value of the input that is submited
  // instantiate the variable tasks to be used to store new tasks into local storage
  let tasks;
  localStorage.getItem("tasks") === null
    ? // If there is no such thing as tasks in local storage set tasks to an empty array
      (tasks = [])
    : // else get the key item pair of "tasks" and parse it into an array, assign it to tasks
      (tasks = JSON.parse(localStorage.getItem("tasks")));
  // push the new task to the tasks array
  tasks.push(task);
  // change the tasks array back into a string and set that string equal to the "tasks" key.
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

let removeTaskFromLocalStorage = (taskItem) => {
  localStorage.getItem("tasks") === null
    ? // If there is no such thing as tasks in local storage set tasks to an empty array
    (tasks = [])
    : // else get the key item pair of "tasks" and parse it into an array, assign it to tasks
    (tasks = JSON.parse(localStorage.getItem("tasks")));

  tasks.forEach((task, index) => {
    // Loops through the array and removes the selected task
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  // Returns the tasks to a string and sets it back to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

let clearTasksFromLocalStorage = () => {
  localStorage.clear(); // Clears the local storage, simply.
};

let addTask = (e) => {
  if (taskInput.value === "") {
    alert("Add a task!");
  } else {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement("a");
    link.className = "delete-item secondary-content";

    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    taskList.appendChild(li);

    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = "";
  }

  e.preventDefault();
};

let removeTask = (e) => {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
};

let clearTasks = () => {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearTasksFromLocalStorage();
};

let filterTasks = (e) => {
  let text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach((task) => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
};

loadEventListeners();
