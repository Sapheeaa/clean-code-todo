//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.

const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const incompleteTaskHolder = document.getElementById("incompleteTasks");
const completedTasksHolder = document.getElementById("completed-tasks");

const createCheckbox = function () {
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  return checkBox;
};

const createLabel = function (taskString) {
  const label = document.createElement("label");
  label.innerText = taskString;
  label.className = "task";
  return label;
};

const createEditInput = function () {
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "task";
  return editInput;
};

const createEditButton = function () {
  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "edit";
  return editButton;
};

const createDeleteButton = function () {
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete";
  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);
  return deleteButton;
};

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");

  listItem.appendChild(createCheckbox());
  listItem.appendChild(createLabel(taskString));
  listItem.appendChild(createEditInput());
  listItem.appendChild(createEditButton());
  listItem.appendChild(createDeleteButton());

  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit");
  const isEditMode = listItem.classList.contains("editMode");
  if (isEditMode) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const taskCompleted = function () {
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

const bindEventsToTasks = function (tasksHolder, eventHandler) {
  for (let i = 0; i < tasksHolder.children.length; i++) {
    bindTaskEvents(tasksHolder.children[i], eventHandler);
  }
};

bindEventsToTasks(incompleteTaskHolder, taskCompleted);
bindEventsToTasks(completedTasksHolder, taskIncomplete);
