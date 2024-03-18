import React, { useContext } from "react";
import TodosContext from "../Context/todosContext";
import sprite from "../Icons/sprite.svg";
import ModalEdit from "./ModalEdit";

const Todo = (props) => {
  const { onDelete, onComplete, onCancel, onEdit } = useContext(TodosContext);
  const todo = props.todo;

  let classes = `todo ${
    todo.status === "SUCCESSFUL" ? "todo--completed" : ""
  } ${todo.status === "CANCELED" ? "todo--canceled" : ""}`;

  return (
    <div
      className={classes}
      style={
        todo.isChanging
          ? {
              // position: "relative",
              filter: "blur(.7px)",
            }
          : {}
      }
    >
      {todo.isChanging && (
        <div className="spinner-container spinner-container__todo">
          <svg className="spinner" viewBox="0 0 50 50">
            <circle
              className="spinner-path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke-width="5"
            ></circle>
          </svg>
        </div>
      )}

      <div className="todo__body">
        <p className="todo__date">{todo.date}</p>
        <div className="todo__content">{todo.newValue}</div>
      </div>

      <div className="todo__icons">
        <span
          className="icon-container icon-container--red"
          onClick={() => onDelete(todo)}
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
          onClick={() => onCancel(todo)}
        >
          <svg className="icon">
            <use href={sprite + "#cross"}></use>
          </svg>
        </span>
        <span
          className="icon-container icon-container--green"
          onClick={() => onComplete(todo)}
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
