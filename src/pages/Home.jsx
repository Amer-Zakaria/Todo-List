import React, { useEffect, useState } from "react";
import Todos from "../Components/Todos";
import TodosContext from "../Context/todosContext";
import ModalAdd from "../Components/ModalAdd";
import newDate from "../Utils/getDate";
import http from "../httpService";
import getDate from "../Utils/getDate";
import User from "../Components/User";
import io from "socket.io-client";
import { getUser } from "../Utils/token";
import axios from "axios";

function Home() {
  const [isUpdated, setIsUpdated] = useState(false);
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalAddVisibility, setModalAddVisibility] = useState(""); // First For Add Modal Second for Edit

  useEffect(() => {
    const socket = io("ws://localhost:3001");

    socket.on("connect", () => {
      socket.emit("auth", getUser().id);
      axios.defaults.headers["socket-id"] = socket.id;
    });

    socket.on("TodoUpdated", (text) => {
      setIsUpdated((old) => !old);
    });
  }, []);

  //Handlers
  const handleDelete = async (todo) => {
    setTodos((todos) => todos.filter((t) => t.id !== todo.id));

    //store on the server
    await http.delete("/todos/" + todo.id).catch((e) => {
      // re-add the todo
      setTodos((todos) => [
        ...[...todos, todo].sort((a, b) =>
          new Date(a.rowDate).getTime() > new Date(b.rowDate).getTime() ? 1 : -1
        ),
      ]);
    });
  };
  const handleComplete = async (todo) => {
    setTodos((todos) =>
      todos.map((t) => {
        if (t.id === todo.id) {
          t.status = "SUCCESSFUL";
          t.isChanging = true;
        }
        return t;
      })
    );

    await http
      .patch("/todos/" + "SUCCESSFUL/" + todo.id)
      .then(() => {
        setTodos((todos) =>
          todos.map((t) => (t.id === todo.id ? { ...t, isChanging: false } : t))
        );
      })
      .catch((e) => {
        setTodos((todos) =>
          todos.map((t) =>
            t.id === todo.id
              ? { ...t, status: "ONGOING", isChanging: false }
              : t
          )
        );
      });
  };
  const handleCancel = async (todo) => {
    setTodos((todos) =>
      todos.map((t) => {
        if (t.id === todo.id) {
          t.status = "CANCELED";
          t.isChanging = true;
        }
        return t;
      })
    );

    await http
      .patch("/todos/" + "CANCELED/" + todo.id)
      .then(() => {
        setTodos((todos) =>
          todos.map((t) => (t.id === todo.id ? { ...t, isChanging: false } : t))
        );
      })
      .catch((e) => {
        setTodos((todos) =>
          todos.map((t) =>
            t.id === todo.id
              ? { ...t, status: "ONGOING", isChanging: false }
              : t
          )
        );
      });
  };
  const handleModalAddDone = async (value) => {
    if (!/\S/.test(value)) return;

    //store locally
    const tempId = -Math.floor(Math.random() * (1000 - 10) + 1);
    setTodos((todos) => [
      ...todos,
      {
        value,
        newValue: value,
        date: newDate(),
        rowDate: new Date().toISOString().replace("T", " "),
        id: tempId,
        status: "ONGOING",
        modalEdit: "hidden",
        isChanging: true,
      },
    ]);

    setModalAddVisibility("");

    //store on the server
    try {
      const todo = await http.post("/todos", { details: value });
      //change the id of the currently added user into the database id
      return setTodos((todos) =>
        todos.map((t) => {
          return t.id === tempId ? { ...t, id: todo.id, isChanging: false } : t;
        })
      );
    } catch (e) {
      // remove the todo on server error
      return setTodos((todos) => todos.filter((t) => t.id !== tempId));
    }
  };
  const handleAdd = () => {
    setModalAddVisibility("active");
    window.scrollTo(0, document.body.scrollHeight);
  };
  const handleModalAddCancel = () => {
    setModalAddVisibility("");
  };
  const handleModalEditDone = async (todo) => {
    if (!/\S/.test(todo.newValue)) return;
    if (todo.newValue === todo.value)
      return setTodos((todos) =>
        todos.map((t) => (t.id === todo.id ? { ...t, modalEdit: "hidden" } : t))
      );

    //Save the todo locally
    const oldValue = todo.value;
    setTodos((todos) =>
      todos.map((t) => {
        if (t.id === todo.id) {
          t.value = t.newValue;
          t.modalEdit = "hidden";
          t.isChanging = true;
        }
        return t;
      })
    );

    //Save the todo on the server
    try {
      await http.patch("/todos/" + todo.id, {
        details: todo.newValue,
      });

      setTodos((todos) =>
        todos.map((t) => (t.id === todo.id ? { ...t, isChanging: false } : t))
      );
    } catch (e) {
      // retrieve the old value, if error occured
      return setTodos((todos) =>
        todos.map((t) =>
          t.id === todo.id
            ? { ...t, newValue: oldValue, value: oldValue, isChanging: false }
            : t
        )
      );
    }
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
  const handleTodoChange = (todoId, changedValue) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.newValue = changedValue;
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
    isLoading,
  };

  useEffect(async () => {
    try {
      setIsLoading(true);
      const todos = await http.get("todos");
      setTodos(
        todos.map(({ id, details, addedAt, status }) => ({
          value: details,
          newValue: details,
          date: getDate(addedAt),
          rowDate: addedAt,
          id,
          status,
          modalEdit: "hidden",
          isChanging: false,
        }))
      );
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  }, [isUpdated]);

  document.body.onkeydown = (e) => {
    //prevent auto scroll when space bar pressed
    if (e.key === " " && !e.target.classList.contains("modal__input"))
      e.preventDefault();
  };

  document.body.onkeyup = (e) => {
    if (e.target.classList.contains("modal__input")) return;
    if (e.key === " ") handleAdd();
  };

  return (
    <TodosContext.Provider value={todosCollection}>
      {isLoading && (
        <div className="spinner-container spinner-container__app">
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

      <User />
      <h1 className="home__title">Todo List</h1>
      <Todos />
      {modalAddVisibility === "active" ? <ModalAdd /> : null}
    </TodosContext.Provider>
  );
}

export default Home;
