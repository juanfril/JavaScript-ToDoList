"use strict";
d = document;

d.addEventListener("click", (e) => {
  //console.log(e.target);
  if (e.target.id === "add-button") {
    const itemText = toDoEntryBox.value;
    newToDoItem(itemText, false);
  }
  if (e.target.id === "clear-completed-button") {
    const completedItems = d.querySelectorAll(".completed");

    completedItems.forEach((item) => {
      item.remove();
    });
  }
  if (e.target.id === "empty-button") {
    const toDoItems = toDoList.children;
    while (toDoItems.length > 0) {
      toDoItems.item(0).remove();
    }
  }
  if (e.target.id === "save-button") {
    const toDos = [];

    for (let i = 0; i < toDoList.children.length; i++) {
      const toDo = toDoList.children.item(i);

      const toDoInfo = {
        task: toDo.innerText,
        completed: toDo.classList.contains("completed"),
      };

      toDos.push(toDoInfo);
    }

    localStorage.setItem("toDos", JSON.stringify(toDos));
  }
});

const newToDoItem = (itemText, completed) => {
  const toDoItem = document.createElement("li");
  const toDoText = document.createTextNode(itemText);
  toDoItem.appendChild(toDoText);

  if (completed) {
    toDoItem.classList.add("completed");
  }

  toDoList.appendChild(toDoItem);
  toDoItem.addEventListener("dblclick", () => {
    toDoItem.classList.toggle("completed");
  });
};

const toDoEntryBox = d.getElementById("todo-entry-box");
const toDoList = d.getElementById("todo-list");

function loadList() {
  if (localStorage.getItem("toDos") != null) {
    const toDos = JSON.parse(localStorage.getItem("toDos"));

    for (let i = 0; i < toDos.length; i++) {
      const toDo = toDos[i];
      newToDoItem(toDo.task, toDo.completed);
    }
  }
}

loadList();
