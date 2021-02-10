class TaskManager {
  constructor(currentId = 0) {
    this.task = [];
    this.currentId = currentId;
  }
  addTask(taskName, description, assignedTo, dueDate, status) {
    this.currentId++;
    this.task.push({
      id: this.currentId,
      taskName: taskName,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: status,
    });
  }
  createTaskHtml(taskName, description, assignedTo, dueDate, status) {
    const html = `
    <div class="row bg-warning mb-4 p-3" style="border-radius: 20px;">
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
          <button class="btn-close btn-close"></button>
        </div>
      </div>
    </div>
    <input type="range" class="form-range slider" min="0" max="8" step="1" id="customRange1">
  </div>`;

    return html;
  }

  render() {
    //const tasksHtmlList = [];
  }
}
