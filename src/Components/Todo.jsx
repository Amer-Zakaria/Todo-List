import React, { useContext } from "react";
import TodosContext from "../Context/todosContext";
import sprite from "../Icons/sprite.svg";
import ModalEdit from "./ModalEdit";

const Todo = (props) => {
  const { onDelete, onComplete, onCancel, onEdit } = useContext(TodosContext);
  const todo = props.todo;

  let classes = `todo ${todo.status === "completed" ? "todo--completed" : ""} ${
    todo.status === "canceled" ? "todo--canceled" : ""
  }`;

  return (
    <div className={classes}>
      <div className="todo__body">
        <p className="todo__date">{todo.date}</p>
        <div className="todo__content">{todo.newValue}</div>
      </div>
      <div className="todo__icons">
        <span
          className="icon-container icon-container--red"
          onClick={() => onDelete(todo.id)}
        >
          <svg className="icon">
            <use href={sprite + "#trash-solid"}></use>
          </svg>
        </span>
        <span
          className="icon-container icon-container--blue"
          onClick={() => onEdit(todo.id)}
        >
          <svg className="icon">
            <use href={sprite + "#pen-solid"}></use>
          </svg>
        </span>
        <span
          className="icon-container icon-container--red"
          onClick={() => onCancel(todo.id)}
        >
          <svg className="icon">
            <use href={sprite + "#cross"}></use>
          </svg>
        </span>
        <span
          className="icon-container icon-container--green"
          onClick={() => onComplete(todo.id)}
        >
          <svg className="icon">
            <use href={sprite + "#check2-all"}></use>
          </svg>
        </span>
      </div>
      {todo.modalEdit === "active" ? <ModalEdit todo={todo} /> : null}
    </div>
  );
};

export default Todo;
