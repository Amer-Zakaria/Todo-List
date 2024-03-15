import React, { useContext } from "react";
import TodosContext from "../Context/todosContext";

const ModalEdit = (props) => {
  const todo = props.todo;
  const { onModalEditCancel, onModalEditDone, onTodoChange } =
    useContext(TodosContext);

  return (
    <React.Fragment>
      <div className="modal">
        <input
          type="text"
          className="modal__input"
          placeholder="Type any task..."
          value={todo.newValue}
          onChange={(e) => onTodoChange(todo.id, e.target.value)}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") onModalEditDone(todo);
          }}
        />
        <button
          className="modal__btn modal__cancel"
          onClick={() => onModalEditCancel(todo.id)}
        >
          Cancel
        </button>
        <button
          className="modal__btn modal__done"
          onClick={() => onModalEditDone(todo)}
        >
          Done
        </button>
      </div>
      <div className="overlay" onClick={() => onModalEditCancel(todo.id)}></div>
    </React.Fragment>
  );
};

export default ModalEdit;
