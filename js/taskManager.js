class TaskManager {
  constructor(currentId = 0) {
    this.taskList = [];
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
    const container = document.querySelector('#card-container')
    //create card info
    const cardInfo = `
    <div class="col-10">
      <h2 class="card-title mb-3 display-4">${taskName}</h2>
      <p class="card-text">${description}</p>
      <h6 class="card-subtitle pb-3">Assigned To: ${assignedTo}</h6>
      <h6 class="card-subtitle pb-3">Due Date: ${dueDate}</h6>
      <h6 class="card-subtitle pb-3">Status: ${status}</h6>
    </div>
    <div class="col">
      <div class="row">
        <div class="col text-end">
          <button class="btn-close btn-close delete-btn"></button>
        </div>
      </div>
    </div>
    <input type="range" class="form-range slider" min="0" max="8" step="1" id="customRange1">`;
    //create card and add card info
    const card = document.createElement('div')
    card.classList.add("row", "bg-warning", "mb-4", "p-3", "task-card")
    //https://code-boxx.com/html-custom-data-attribute/
    card.dataset.taskId = taskId
    card.innerHTML = cardInfo

    //add card to container
    container.append(card)
    
    // console.log(container)
    // console.log(card)
    // console.log(cardInfo)
  }

  deleteTaskHtml(event) {
    if (event.target.classList.contains('delete-btn')) {
      event.target.parentElement.parentElement.parentElement.parentElement.remove()
    }
  }

  deleteTaskObject(event) {
    if (event.target.classList.contains('delete-btn')) {
      const cardTaskId = event.target.parentElement.parentElement.parentElement.parentElement.dataset.taskId
      tasks.taskList.forEach((element, index) => {
        if (element.id == cardTaskId) {
          //Test for delete
          console.log(tasks)
          tasks.taskList.splice(index, 1)
        }
      });
    }
  }
}
