import React, { useContext } from "react";
import Todo from "./Todo";
import sprite from "../Icons/sprite.svg";
import TodosContext from "../Context/todosContext";

function Todos(props) {
  const { todos, onAdd } = useContext(TodosContext);

  return (
    <div className="container todos">
      <div>
        {todos.length === 0 ? <p>prees the plus sing to add a todo</p> : null}
        {todos.map((todo) => {
          return <Todo key={todo.id} todo={todo} />;
        })}
      </div>
      <div className="todos__add">
        <span
          className="icon-container icon-container--green icon-container--large"
          onClick={onAdd}
        >
          <svg className="icon">
            <use href={sprite + "#plus"}></use>
          </svg>
        </span>
      </div>
    </div>
  );
}

export default Todos;
