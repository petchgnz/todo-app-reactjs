import { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

export default function App() {
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    if (!newTitle.trim()) {
      alert("Task title and description cannot be empty!");
      return;
    }

    const newTodo = {
      id: Date.now(),
      title: newTitle,
      description: newDescription,
      isCompletedScreen: false,
    };

    setAllTodos([...allTodos, newTodo]);
    localStorage.setItem("todos", JSON.stringify([...allTodos, newTodo]));
    setNewTitle("");
    setNewDescription("");
  };

  const handleDeleteTodo = (index) => {
    const newTodoList = allTodos.filter((_, todoIndex) => todoIndex !== index);
    setAllTodos(newTodoList);
    localStorage.setItem("todos", JSON.stringify(newTodoList));
  };

  const handleDeleteCompletedTodo = (index) => {
    const newCompletedTodo = completedTodos.filter(
      (_, completedIndex) => completedIndex !== index
    );
    setCompletedTodos(newCompletedTodo);
    localStorage.setItem("completedTodos", JSON.stringify(newCompletedTodo));
  };

  const handleCompleted = (index) => {
    let now = new Date();
    let date = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let completedOn = `${date}/${month}/${year} ${h}:${m}`;

    let updatedTodo = [...allTodos];
    let completeTodo = {
      ...allTodos[index],
      isCompletedScreen: true,
      completedOn,
    };

    setCompletedTodos([...completedTodos, completeTodo]);
    updatedTodo.splice(index, 1);
    setAllTodos(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
    localStorage.setItem(
      "completedTodos",
      JSON.stringify([...completedTodos, completeTodo])
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleReset = () => {
    setAllTodos([]);
    setCompletedTodos([]);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todos"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));

    if (savedTodo) {
      setAllTodos(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  return (
    <div className="bg-bg1 w-screen h-screen text-white flex flex-col justify-center items-center shadow-2xl">
      <div className="text-2xl font-bold ">My Todos</div>

      {/* Container */}
      <div className="bg-bg2 m-5 p-[2%]">
        {/* todo-input */}
        <div className="min-w-[600px] h-auto grid gap-3 grid-cols-[1fr_1fr_80px] items-center border-b-2 border-white/25 pb-5 mb-5">
          {/* todo-input-items */}
          <div className="flex flex-col">
            <label className="font-bold mb-2 text-lg">Title</label>
            <input
              className="outline-none p-2 bg-white/10 text-white"
              placeholder="What's the task title?"
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e)}
              value={newTitle}
              type="text"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-bold mb-2 text-lg">Description</label>
            <input
              className="outline-none p-2 bg-white/10 text-white"
              placeholder="What's the task description?"
              onChange={(e) => setNewDescription(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e)}
              value={newDescription}
              type="text"
            />
          </div>

          <div className="flex justify-center mt-8">
            <button
              className="w-[60px] p-2 bg-emr cursor-pointer transition-all ease-in-out hover:bg-emr-dark rounded-xs"
              type="button"
              onClick={handleAddTodo}
            >
              Add
            </button>
          </div>
        </div>

        {/* todo-btn-area */}
        <div className="flex justify-between items-center">
          <div className="">
            <button
              className={`transition-all ease-in-out cursor-pointer w-[60px] p-2 ${
                !isCompletedScreen ? "bg-emr" : "bg-[#686868]"
              }`}
              onClick={() => setIsCompletedScreen(false)}
            >
              Todo
            </button>
            <button
              className={`transition-all ease-in-out cursor-pointer p-2 ${
                isCompletedScreen ? "bg-emr" : "bg-[#686868]"
              }`}
              onClick={() => setIsCompletedScreen(true)}
            >
              Completed
            </button>
          </div>
          <div className="">
            <button
              className="cursor-pointer bg-emr transition-all ease-in-out p-2 hover:bg-emr-dark rounded-xs"
              onClick={handleReset}
            >
              Reset Todos
            </button>
          </div>
        </div>

        {/* todo item*/}
        <div className="">
          {!isCompletedScreen
            ? allTodos.map((data, index) => {
                return (
                  <div className="todo-list-item" key={index}>
                    <div className="">
                      <h3 className="todo-item-title">{data.title}</h3>
                      <p className="todo-item-description">
                        {data.description}
                      </p>
                    </div>

                    <div className="todo-item-buttons">
                      <MdDeleteOutline
                        className="todo-item-button-bin"
                        onClick={() => handleDeleteTodo(index)}
                      />
                      <FaCheck
                        className="todo-item-button-check"
                        onClick={() => handleCompleted(index)}
                      />
                    </div>
                  </div>
                );
              })
            : completedTodos.map((data, index) => {
                return (
                  <div className="todo-list-item" key={index}>
                    <div className="">
                      <h3 className="todo-item-title">{data.title}</h3>
                      <p className="todo-item-description">
                        {data.description}
                      </p>
                      <p className="todo-item-description">
                        <small>Completed on: {data.completedOn}</small>
                      </p>
                    </div>

                    <div className="todo-item-buttons">
                      <MdDeleteOutline
                        className="todo-item-button-bin"
                        onClick={() => handleDeleteCompletedTodo(index)}
                      />
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
