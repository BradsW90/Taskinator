var formE1 = document.querySelector("#task-form");
var tasksToDoE1 = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentE1 = document.querySelector("#page-content");
var tasksInProgressE1 = document.querySelector("#tasks-in-progress");
var tasksCompletedE1 = document.querySelector("#tasks-completed");
var tasks = [];

var completeEditTask = function (taskName, taskType, taskId) {
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  for (i = 0; i < tasks.length; o++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  }

  alert("Task Updated!");

  formE1.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
};

var taskFormHandler = function (event) {
  event.preventDefault();

  var taskNameInput = document.querySelector("input[name ='task-name']").value;
  var taskTypeInput = document.querySelector("select[name ='task-type']").value;

  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }

  formE1.reset();

  var isEdit = formE1.hasAttribute("data-task-id");

  if (isEdit) {
    var taskId = formE1.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "to do",
    };

    createTaskE1(taskDataObj);
  }
};

var createTaskE1 = function (taskDataObj) {
  var listItemE1 = document.createElement("li");
  listItemE1.className = "task-item";
  listItemE1.setAttribute("data-task-id", taskIdCounter);

  var taskInfoE1 = document.createElement("div");
  taskInfoE1.className = "task-info";
  taskInfoE1.innerHTML =
    "<h3 class = 'task-name'>" +
    taskDataObj.name +
    "</h3><span class='task-type'>" +
    taskDataObj.type +
    "</span>";

  listItemE1.appendChild(taskInfoE1);

  taskDataObj.id = taskIdCounter;
  tasks.push(taskDataObj);

  var taskActionsE1 = createTaskActions(taskIdCounter);
  listItemE1.appendChild(taskActionsE1);

  tasksToDoE1.appendChild(listItemE1);

  taskIdCounter++;

  console.log(taskDataObj);
  console.log(taskDataObj.status);
};

var createTaskActions = function (taskId) {
  var actionContainerE1 = document.createElement("div");
  actionContainerE1.className = "task-actions";

  var editButtonE1 = document.createElement("button");
  editButtonE1.textContent = "Edit";
  editButtonE1.className = "btn edit-btn";
  editButtonE1.setAttribute("data-task-id", taskId);

  actionContainerE1.appendChild(editButtonE1);

  var deleteButtonE1 = document.createElement("button");
  deleteButtonE1.textContent = "Delete";
  deleteButtonE1.className = "btn delete-btn";
  deleteButtonE1.setAttribute("data-task-id", taskId);

  actionContainerE1.appendChild(deleteButtonE1);

  var statusSelectE1 = document.createElement("select");
  statusSelectE1.className = "select-status";
  statusSelectE1.setAttribute("name", "status-change");
  statusSelectE1.setAttribute("data-task-id", taskId);

  actionContainerE1.appendChild(statusSelectE1);

  var statusChoices = ["To Do", "In Progress", "Completed"];

  for (i = 0; i < statusChoices.length; i++) {
    var statusOptionE1 = document.createElement("option");
    statusOptionE1.textContent = statusChoices[i];
    statusOptionE1.setAttribute("value", statusChoices[i]);

    statusSelectE1.appendChild(statusOptionE1);
  }
  return actionContainerE1;
};

formE1.addEventListener("submit", taskFormHandler);

var deleteTask = function (taskId) {
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  taskSelected.remove();

  var updatedTaskArr = [];

  for (i = 0; i < tasks.length; i++) {
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }

  tasks = updatedTaskArr;
};

var editTask = function (taskId) {
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  var taskName = taskSelected.querySelector("h3.task-name").textContent;

  var taskType = taskSelected.querySelector("span.task-type").textContent;

  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  document.querySelector("#save-task").textContent = "Save Task";
  formE1.setAttribute("data-task-id", taskId);
};

var taskButtonHandler = function (event) {
  var targetE1 = event.target;

  if (targetE1.matches(".edit-btn")) {
    var taskId = targetE1.getAttribute("data-task-id");
    editTask(taskId);
  } else if (targetE1.matches(".delete-btn")) {
    var taskId = targetE1.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

var taskStatusChangeHandler = function (event) {
  var taskId = event.target.getAttribute("data-task-id");

  var statusValue = event.target.value.toLowerCase();

  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  if (statusValue === "to do") {
    tasksToDoE1.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    tasksInProgressE1.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    tasksCompletedE1.appendChild(taskSelected);
  }

  for (i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
  }
};

pageContentE1.addEventListener("click", taskButtonHandler);
pageContentE1.addEventListener("change", taskStatusChangeHandler);
