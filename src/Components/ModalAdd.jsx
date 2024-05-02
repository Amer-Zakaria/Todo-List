import React, { useContext } from "react";
import TodosContext from "../Context/todosContext";

const Modal = (props) => {
  const { onModalAddDone, onModalAddCancel, isLoading } =
    useContext(TodosContext);

  return (
    <React.Fragment>
      <div className={`modal`}>
        <input
          type="text"
          className="modal__input"
          placeholder="Type any task..."
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter")
              onModalAddDone(document.querySelector("input").value);
          }}
        />
        <button className="modal__btn modal__cancel" onClick={onModalAddCancel}>
          Cancel
        </button>
        <button
          disabled={isLoading}
          className="modal__btn modal__done"
          onClick={() => onModalAddDone(document.querySelector("input").value)}
        >
          Done
        </button>
      </div>
      <div className={`overlay`} onClick={onModalAddCancel}></div>
    </React.Fragment>
  );
};

export default Modal;
