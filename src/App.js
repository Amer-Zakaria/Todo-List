import "./CSS/milligram.css";
import "./CSS/App.css";
import React, { useState } from "react";
import Todos from "./Components/Todos";
import TodosContext from "./Context/todosContext";
import ModalAdd from "./Components/ModalAdd";
import newDate from "./Utils/newDate";

function App() {
  const [todos, setTodos] = useState([]);
  const [modalAddVisibility, setModalAddVisibility] = useState(""); // First For Add Modal Second for Edit

  //Functions

  const handleDelete = (todoId) => {
    let newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
  };
  const handleComplete = (todoId) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) todo.status = "completed";
      return todo;
    });
    setTodos(newTodos);
  };
  const handleCancel = (todoId) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) todo.status = "canceled";
      return todo;
    });
    setTodos(newTodos);
  };
  const handleModalAddDone = (value) => {
    if (!/\S/.test(value)) return;
    const newTodos = todos;
    newTodos.push({
      value,
      newValue: value,
      date: newDate(),
      id: Math.random(),
      status: "uncompleted",
      modalEdit: "hidden",
    });
    setTodos(newTodos);
    setModalAddVisibility("");
  };
  const handleAdd = () => {
    setModalAddVisibility("active");
  };
  const handleModalAddCancel = () => {
    setModalAddVisibility("");
  };
  const handleModalEditDone = (todoId) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.value = todo.newValue;
        todo.date = newDate();
        todo.modalEdit = "hidden";
      }
      return todo;
    });
    setTodos(newTodos);
  };
  const handleEdit = (todoId) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) todo.modalEdit = "active";
      return todo;
    });
    setTodos(newTodos);
  };
  const handelModalEditCancel = (todoId) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.newValue = todo.value;
        todo.modalEdit = "";
      }
      return todo;
    });
    setTodos(newTodos);
  };
  const handleTodoChange = (todoId, changeitValue) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.newValue = changeitValue;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const todosCollection = {
    todos,
    onModalAddCancel: handleModalAddCancel,
    onModalAddDone: handleModalAddDone,
    onModalEditDone: handleModalEditDone,
    onModalEditCancel: handelModalEditCancel,
    onDelete: handleDelete,
    onCancel: handleCancel,
    onComplete: handleComplete,
    onEdit: handleEdit,
    onTodoChange: handleTodoChange,
    onAdd: handleAdd,
  };

  document.body.onkeydown = (e) => {
    if (e.target.classList.contains("modal__input")) return;
    if (e.key === " ") handleAdd();
  };

  return (
    <TodosContext.Provider value={todosCollection}>
      <div className="App">
        <h1>Todo List</h1>
        <Todos />
        {modalAddVisibility === "active" ? <ModalAdd /> : null}
      </div>
    </TodosContext.Provider>
  );
}

export default App;
