let tasks;
if (localStorage.taskList === undefined) {
  tasks = new TaskManager();
} else {
  tasks = new TaskManager(
    JSON.parse(localStorage.getItem("taskList")),
    parseInt(localStorage.getItem("currentId"))
  );
}

const form = document.querySelector("#form-validate");
const taskName = document.querySelector("#task-name");
const assignedTo = document.querySelector("#assigned");
const status = document.querySelector("select");
const dueDate = document.querySelector("#date");
const description = document.querySelector("#exampleFormControlTextarea1");
const cardContainer = document.querySelector("#card-container");
const formBtn = document.querySelector(".plus-icon");
const formContainer = document.querySelector(".task-form");

const validate = (event) => {
  event.preventDefault();

  // Name Validation
  if (taskName.value.length < 1) {
    taskName.classList.add("is-invalid");
    taskName.classList.remove("is-valid");
  } else {
    taskName.classList.add("is-valid");
    taskName.classList.remove("is-invalid");
  }

  // AssignedTo Validation
  if (assignedTo.value.length < 1) {
    assignedTo.classList.add("is-invalid");
    assignedTo.classList.remove("is-valid");
  } else {
    assignedTo.classList.add("is-valid");
    assignedTo.classList.remove("is-invalid");
  }

  // Status Validation

  if (status.value === "Choose Status") {
    status.classList.add("is-invalid");
    status.classList.remove("is-valid");
  } else {
    status.classList.add("is-valid");
    status.classList.remove("is-invalid");
  }

  // Date Validation

  // Split date input value and make into Date object form
  // (https://stackoverflow.com/questions/23641525/javascript-date-object-from-input-type-date)

  const dateSplit = dueDate.value.split(/\D/);
  const dateValue = new Date(dateSplit[0], --dateSplit[1], ++dateSplit[2]);
  // get current date
  const dateNow = Date.now();
  // compare current date with input date
  if (dateValue >= dateNow) {
    dueDate.classList.add("is-valid");
    dueDate.classList.remove("is-invalid");
  } else {
    dueDate.classList.add("is-invalid");
    dueDate.classList.remove("is-valid");
  }

  // Description Validation

  if (description.value.length < 1) {
    description.classList.add("is-invalid");
    description.classList.remove("is-valid");
  } else {
    description.classList.add("is-valid");
    description.classList.remove("is-invalid");
  }

  if (
    description.classList.contains("is-valid") &&
    taskName.classList.contains("is-valid") &&
    status.classList.contains("is-valid") &&
    assignedTo.classList.contains("is-valid") &&
    dueDate.classList.contains("is-valid")
  ) {
    // Add task from form to class

    tasks.addTask(
      taskName.value,
      description.value,
      assignedTo.value,
      dueDate.value,
      status.value
    );

    // Render task
    //cardContainer.append.(taskHtml);
    tasks.createTaskHtml(
      taskName.value,
      description.value,
      assignedTo.value,
      dueDate.value,
      status.value,
      tasks.currentId
    );

    tasks.save();

    // open and close form
    formBtn.classList.toggle("plus-icon-rotate-open");
    form.classList.toggle("display-none");
    formContainer.classList.toggle("pb-4");

    //  TASK TESTS
    console.log(tasks);
    // console.log(taskHtml);

    //return form to default
    taskName.classList.remove("is-valid");
    assignedTo.classList.remove("is-valid");
    status.classList.remove("is-valid");
    dueDate.classList.remove("is-valid");
    description.classList.remove("is-valid");

    taskName.value = "";
    assignedTo.value = "";
    status.value = "Choose Status";
    dueDate.value = "";
    description.value = "";
  }
};

// Submit Form Event
form.addEventListener("submit", validate);

// Clear Form Event

form.addEventListener("reset", (event) => {
  taskName.classList.remove("is-valid");
  taskName.classList.remove("is-invalid");
  assignedTo.classList.remove("is-valid");
  assignedTo.classList.remove("is-invalid");
  status.classList.remove("is-valid");
  status.classList.remove("is-invalid");
  dueDate.classList.remove("is-valid");
  dueDate.classList.remove("is-invalid");
  description.classList.remove("is-valid");
  description.classList.remove("is-invalid");
});

// Delete Task Event
const container = document.querySelector("#card-container");

container.addEventListener("click", (event) => {
  tasks.deleteTaskHtml(event);
  tasks.deleteTaskObject(event);
  tasks.save();
});

// toggle form open and close

formBtn.addEventListener("click", () => {
  formBtn.classList.toggle("plus-icon-rotate-open");
  form.classList.toggle("display-none");
  formContainer.classList.toggle("pb-4");
});

// Load tasks from storage

document.addEventListener("DOMContentLoaded", () => {
  tasks.taskList.forEach((task) => {
    tasks.createTaskHtml(
      task.taskName,
      task.description,
      task.assignedTo,
      task.dueDate,
      task.status,
      task.id
    );
  });
});

const hello = document.querySelector("#card-container").childNodes;
console.log(hello);

console.log(hello.length);
