const tasks = new TaskManager();

const validate = (event) => {
  event.preventDefault();
  const name = document.querySelector("#task-name");
  const assignedTo = document.querySelector("#assigned");
  const status = document.querySelector("select");
  const dueDate = document.querySelector("#date");
  const description = document.querySelector("#exampleFormControlTextarea1");

  // Name Validation
  if (name.value.length < 1) {
    name.classList.add("is-invalid");
    name.classList.remove("is-valid");
  } else {
    name.classList.add("is-valid");
    name.classList.remove("is-invalid");
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
    name.classList.contains("is-valid") &&
    status.classList.contains("is-valid") &&
    assignedTo.classList.contains("is-valid") &&
    dueDate.classList.contains("is-valid")
  ) {
    // Add task from form to class

    tasks.addTask(
      name.value,
      description.value,
      assignedTo.value,
      dueDate.value,
      status.value
    );

    //  TASK TESTS
    console.log(tasks);

    //return form to default
    name.classList.remove("is-valid");
    assignedTo.classList.remove("is-valid");
    status.classList.remove("is-valid");
    dueDate.classList.remove("is-valid");
    description.classList.remove("is-valid");

    name.value = "";
    assignedTo.value = "";
    status.value = "Choose Status";
    dueDate.value = "";
    description.value = "";
  }
};

document.querySelector("#form-validate").addEventListener("submit", validate);
