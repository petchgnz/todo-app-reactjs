import { useEffect, useState } from "react"
import { TodoItemTypes } from "../type"

const TodoInputs = () => {
    const [allTodos, setAllTodos] = useState<TodoItemTypes[]>([])
    const [newTitle, setNewTitle] = useState<string>("")
    const [newDesc, setNewDesc] = useState<string>("")

    const handleAddTodo = () => {
        const newTodo: TodoItemTypes = {
            title: newTitle,
            desc: newDesc,
            isCompleted: false
        }

        setAllTodos([...allTodos, newTodo]);
        localStorage.setItem("todos", JSON.stringify([...allTodos, newTodo]))

    };

    const handleDeleteTodo = () => {

    };

    const handleCompleteTodo = () => {

    };

    useEffect(() => {

    }, []);

    return (

        <div className="text-start flex justify-between items-center">

            { }

            <div className="flex flex-col">
                <label className="font-semibold">Task</label>
                <input
                    type="text"
                    placeholder="What's the task title?"
                    className="outline-none bg-bg3 p-1.5 text-lg mt-3"
                />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold">Description</label>
                <input
                    type="text"
                    placeholder="What's the task description?"
                    className="outline-none bg-bg3 p-1.5 text-lg mt-3"
                />
            </div>
            <div className="mt-10">
                <button
                    className="w-[60px] bg-emr rounded-xs text-lg cursor-pointer p-1.5 hover:bg-emr-dark"
                >
                    Add
                </button>
            </div>
        </div>
    )
};

export default TodoInputs