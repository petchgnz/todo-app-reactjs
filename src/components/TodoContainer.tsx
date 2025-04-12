import TodoInputs from "./TodoInputs"
import { useEffect, useState } from "react"
import TodoItems from "./TodoItems"
import { TodoItemTypes } from "../type"

const TodoContainer = () => {
    const [isCompleteScreen, setIsCompleteScreen] = useState<boolean>(false)
    const [allTodos, setAllTodos] = useState<TodoItemTypes[]>([])
    const [completedTodos, setCompletedTodos] = useState<TodoItemTypes[]>([])

    const handleAddTodo = (title: string, desc: string) => {
        const newTodo: TodoItemTypes = {
            id: Date.now(),
            title,
            desc,
            isCompleted: false,
        }
        setAllTodos([...allTodos, newTodo])
        localStorage.setItem("todos", JSON.stringify([...allTodos, newTodo]))
    }

    const handleCompleteTodo = (index: number) => {
        const updatedTodos = [...allTodos]
        const updatedCompleteTodo = {
            ...allTodos[index],
            isCompleted: true
        }

        updatedTodos.splice(index, 1)

        setAllTodos(updatedTodos)
        localStorage.setItem("todos", JSON.stringify(updatedTodos))

        setCompletedTodos([...completedTodos, updatedCompleteTodo])
        localStorage.setItem("completedTodos", JSON.stringify([...completedTodos, updatedCompleteTodo]))
    }

    const handleDeleteTodos = (index: number, isCompleted: boolean) => {
        if (isCompleted) {
            const updatedCompleteTodo = [...completedTodos]
            updatedCompleteTodo.splice(index, 1)

            setCompletedTodos(updatedCompleteTodo)
            localStorage.setItem("completedTodos", JSON.stringify(updatedCompleteTodo))

            console.log("Delete CompletedTodo");

        } else {
            const updatedTodos = [...allTodos]
            updatedTodos.splice(index, 1)

            setAllTodos(updatedTodos)
            localStorage.setItem("todos", JSON.stringify(updatedTodos))
            console.log("Delete AllTodos");
        }
    }

    useEffect(() => {
        const savedTodo = localStorage.getItem("todos")
        const savedCompletedTodo = localStorage.getItem("completedTodos")

        if (savedTodo) {
            const parse = JSON.parse(savedTodo)
            setAllTodos(parse)
        }
        if (savedCompletedTodo) {
            const parse = JSON.parse(savedCompletedTodo)
            setCompletedTodos(parse)
        }
    }, [])

    return (
        <div className="p-[5%] bg-bg2 w-[700px] shadow-xl/50">
            <div className="pb-3 mb-5 border-b-2 border-white/25">
                <TodoInputs onAdd={handleAddTodo} />
            </div>

            <div className="flex items-center justify-start">
                <button
                    className={`cursor-pointer p-2 w-[60px] rounded-xs ${!isCompleteScreen ? "bg-emr" : "bg-bg3"}`}
                    onClick={() => setIsCompleteScreen(false)}
                >
                    Todo
                </button>
                <button
                    className={`cursor-pointer p-2 rounded-xs ${isCompleteScreen ? "bg-emr" : "bg-bg3"}`}
                    onClick={() => setIsCompleteScreen(true)}
                >
                    Completed
                </button>
            </div>

            {isCompleteScreen
                ? (completedTodos.map((todo, index) => (
                    <TodoItems
                        key={index}
                        title={todo.title}
                        desc={todo.desc}
                        isCompleted={todo.isCompleted}
                        onDeleteTodos={() => handleDeleteTodos(index, todo.isCompleted ?? true)}
                    />
                )))
                : (
                    allTodos
                        .filter((todo) => !todo.isCompleted)
                        .map((todo, index) => (
                            <TodoItems
                                key={index}
                                title={todo.title}
                                desc={todo.desc}
                                isCompleted={todo.isCompleted}
                                onCheckmark={() => handleCompleteTodo(index)}
                                onDeleteTodos={() => handleDeleteTodos(index, todo.isCompleted ?? false)}
                            />
                        ))
                )
            }
        </div>
    )
}

export default TodoContainer