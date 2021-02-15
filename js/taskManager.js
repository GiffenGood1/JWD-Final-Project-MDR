class TaskManager {
  constructor(taskList = [], currentId = 0) {
    this.taskList = taskList;
    this.currentId = currentId;
  }
  addTask(taskName, description, assignedTo, dueDate, status) {
    this.currentId++;
    this.taskList.push({
      id: this.currentId,
      taskName: taskName,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: status,
    });
  }
  createTaskHtml(taskName, description, assignedTo, dueDate, status, taskId) {
    //grab container
    const container = document.querySelector("#card-container");
    //convert date
    const dateSplittest = dueDate.split(/\D/);
    const dateValuetest = new Date(
      dateSplittest[0],
      --dateSplittest[1],
      dateSplittest[2]
    );
    const convertedDate = dateValuetest.toString().split("00:00:00");

    let sliderValue;
    if (status == "Complete") {
      sliderValue = 2;
    } else if (status == "In Progress") {
      sliderValue = 1;
    } else {
      sliderValue = 0;
    }

    //create card info
    const cardInfo = `
    <div class="col-10">
      <h2 class="card-title mb-3 display-4 fw-bold">${taskName}</h2>
      <p class="card-text">${description}</p>
      <h6 class="card-subtitle pb-3 fw-bold">Assigned To: <span class="card-text notbold">${assignedTo}</span></h6>
      <h6 class="card-subtitle pb-3 fw-bold">Due Date: <span class="card-text notbold">${convertedDate[0]}</span></h6>
      <h6 class="card-subtitle pb-3 fw-bold">Status: <span class="card-text notbold">${status}</span></h6>
    </div>
    <div class="col">
      <div class="row">
        <div class="col text-end">
          <button class="btn-close btn-close delete-btn"></button>
        </div>
      </div>
    </div>
    <input type="range" class="form-range slider" min="0" max="2" step="1" value="${sliderValue}" id="status-slider">`;
    //create card and add card info
    const card = document.createElement("div");
    if (status == "Complete") {
      card.classList.add("bg-info");
    }
    card.classList.add("row", "mb-4", "p-3", "task-card");
    //https://code-boxx.com/html-custom-data-attribute/

    card.dataset.status = status;
    card.dataset.taskId = taskId;
    card.innerHTML = cardInfo;

    //add card to container
    container.append(card);
  }

  deleteTaskHtml(event) {
    if (event.target.classList.contains("delete-btn")) {
      event.target.parentElement.parentElement.parentElement.parentElement.remove();
    }
  }

  deleteTaskObject(event) {
    // If Delete button is pressed
    if (event.target.classList.contains("delete-btn")) {
      const cardTaskId =
        event.target.parentElement.parentElement.parentElement.parentElement
          .dataset.taskId;

      tasks.taskList.forEach((element, index) => {
        console.log(element);
        if (element.id == cardTaskId) {
          tasks.taskList.splice(index, 1);
        }
      });
      this.save();
    }
  }

  changeStatusHTML(event) {
    if (event.target.classList.contains("slider")) {
      const parentTask =
        event.target.previousElementSibling.previousElementSibling
          .lastElementChild.firstElementChild;

      const card = event.target.parentElement;
      if (event.target.value == 2) {
        parentTask.innerText = "Complete";
        card.classList.add("bg-info");
        card.dataset.status = "Complete";
      } else if (event.target.value == 0) {
        parentTask.innerText = "Pending";
        card.classList.remove("bg-info");
        card.dataset.status = "Pending";
      } else {
        parentTask.innerText = "In Progress";
        card.classList.remove("bg-info");
        card.dataset.status = "In Progress";
      }
      // run on change
      this.checkDueDate();

      this.filter();
    }
  }

  changeStatusObject(event) {
    if (event.target.classList.contains("slider")) {
      const cardTaskId = event.target.parentElement.dataset.taskId;
      const card = event.target;
      tasks.taskList.forEach((task, index) => {
        if (task.id == cardTaskId) {
          if (event.target.value == 2) {
            tasks.taskList[index].status = "Complete";
          } else if (event.target.value == 0) {
            tasks.taskList[index].status = "Pending";
          } else {
            tasks.taskList[index].status = "In Progress";
          }
        }
      });
      this.save();
    }
  }

  save() {
    localStorage.setItem("taskList", JSON.stringify(this.taskList));
    localStorage.setItem("currentId", JSON.stringify(this.currentId));
  }

  checkDueDate() {
    // for tasks
    //if red overdue, orange 1-2, yellow 3-5 green 5 or more days, blue done
    this.taskList.forEach((task) => {
      // convert date to ms
      const dateSplit = task.dueDate.split(/\D/);
      const dateValue = new Date(dateSplit[0], --dateSplit[1], ++dateSplit[2]);
      const dateNow = Date.now();
      // convert and compare ms to days
      const milsec = dateValue - dateNow;
      const daysTillDue = milsec / 86400000;
      // grab cards
      const cardsList = Array.from(
        document.querySelector("#card-container").children
      );

      cardsList.forEach((card) => {
        if (task.id == card.dataset.taskId) {
          if (daysTillDue <= 0) {
            card.style.backgroundColor = "#d21919";
            card.dataset.dueDate = "Over Due";
          } else if (daysTillDue <= 2) {
            card.style.backgroundColor = "#fd7e14";
            card.dataset.dueDate = "Urgent";
          } else if (daysTillDue <= 5) {
            card.style.backgroundColor = "#ffc107";
            card.dataset.dueDate = "Coming Up";
          } else {
            card.style.backgroundColor = "#28a745";
            card.dataset.dueDate = "I Got Time";
          }
        }
      });
    });
  }

  filter() {
    // Filters cards by certain data-set parameters
    const statusFilter = document.querySelector("#status-filter").value;
    const dueDateFilter = document.querySelector("#due-date-filter").value;
    const cardsList = Array.from(
      document.querySelector("#card-container").children
    );
    // Filter by status

    //For each Card
    cardsList.forEach((card) => {
      //if first status filter is default
      if (statusFilter == "Default") {
        //if second status filter is default show everything
        if (dueDateFilter == "Default") {
          card.style.display = "flex";
          //if second status filter is complete dont show it
        } else if (card.dataset.status == "Complete") {
          card.style.display = "none";

          //if second status filter is equals a card show it
        } else if (card.dataset.dueDate == dueDateFilter) {
          card.style.display = "flex";
          // else dont show it
        } else {
          card.style.display = "none";
        }
        // if first status equals a card status show it
      } else if (card.dataset.status == statusFilter) {
        card.style.display = "flex";
        //and then if due date filter ...
        if (dueDateFilter == "Default") {
          card.style.display = "flex";
        } else if (card.dataset.status == "Complete") {
          card.style.display = "none";
        } else if (card.dataset.dueDate == dueDateFilter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
        // else show none
      } else {
        card.style.display = "none";
      }
    });
    // Filter by dueDate
    // cardsList.forEach((card) => {
    //   if (dueDateFilter == "Default") {
    //     card.style.display = "flex";
    //   } else if (card.dataset.status == "Complete") {
    //     card.style.display = "none";
    //   } else if (card.dataset.dueDate == dueDateFilter) {
    //     card.style.display = "flex";
    //   } else {
    //     card.style.display = "none";
    //   }
    // });
  }
}
