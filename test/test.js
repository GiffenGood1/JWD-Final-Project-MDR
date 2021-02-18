const { assert } = require("chai");

// const { expect } = require("chai");

// const { spies } = require("chai-spies")

// // const assert = require("assert");

// const TaskManager = require("../js/taskManager");

const chai = require("chai"),
  spies = require("chai-spies");

// const jsdom = require("../node_modules/jsdom");
// const { JSDOM } = jsdom;

chai.use(spies);

const expect = chai.expect;
const TaskManager = require("../js/taskManager");
// const { beforeEach } = require("mocha");

describe("TaskManager", () => {
  describe("#constructor", () => {
    describe("when initializing a new TaskManager", () => {
      it("should create an empty tasks array", () => {
        const taskManager = new TaskManager();
        //assert.isArray(taskManager.taskList); // check if is array

        //expect(taskManager.taskList).to.be.eql([]); // deep equal (checks if whats inside the array/objects are equal)

        assert.deepStrictEqual(taskManager.taskList, []); // deep equal (checks if whats inside the array/objects are equal)
      });

      it("should create a tasks array with the input array", () => {
        task = [
          {
            id: 1,
            taskName: "taskName",
            description: "description",
            assignedTo: "assignedTo",
            dueDate: "dueDate",
            status: "status",
          },
        ];
        const taskManager = new TaskManager(task);

        assert.deepStrictEqual(taskManager.taskList, task); // deep equal (checks if whats inside the array/objects are equal)
      });

      it("should set the currentId to the passed in number", () => {
        const taskManager = new TaskManager([], 2);
        assert.strictEqual(taskManager.currentId, 2);
      });
    });
  });

  describe("#addTask", () => {
    describe("when adding a new task to TaskManager", () => {
      it("should create a tasks array", () => {
        const taskManager = new TaskManager();

        task = [
          {
            id: taskManager.currentId + 1,
            taskName: "taskName",
            description: "description",
            assignedTo: "assignedTo",
            dueDate: "dueDate",
            status: "status",
          },
        ];

        taskManager.addTask(
          "taskName",
          "description",
          "assignedTo",
          "dueDate",
          "status"
        );
        assert.deepStrictEqual(taskManager.taskList, task);
      });

      it("should increment currentId by 1", () => {
        const taskManager = new TaskManager();
        const beforeCurrentId = taskManager.currentId;

        taskManager.addTask(
          "taskName",
          "description",
          "assignedTo",
          "dueDate",
          "status"
        );
        const afterCurrentId = taskManager.currentId;

        assert.strictEqual(beforeCurrentId + 1, afterCurrentId);
      });
    });
  });
  describe("#deleteTaskObject", () => {
    describe("when delete a task", () => {
      it("should splice task out of taskList", () => {});

      it("should increment currentId by 1", () => {});
    });
  });
  describe("#save", () => {
    describe("when tasks exist in the task manager", () => {
      it("should store tasks in local storage", () => {
        global.localStorage = {}
        const taskManager = new TaskManager();
        task = 
          {
            id: taskManager.currentId + 1,
            taskName: "taskName",
            description: "description",
            assignedTo: "assignedTo",
            dueDate: "dueDate",
            status: "status",
          }
        

        taskManager.addTask(
          "taskName",
          "description",
          "assignedTo",
          "dueDate",
          "status"
        );

        const tasksJson = JSON.stringify([task])

        chai.spy.on(localStorage, "setItem", () => {});

        taskManager.save();

        expect(localStorage.setItem).to.have.been.called.with(
          "taskList",
          tasksJson
        );
        chai.spy.restore() 
      });
    });
  });
});
