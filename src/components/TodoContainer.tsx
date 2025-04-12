import TodoInputs from "./TodoInputs"
import { useState } from "react"
import TodoItems from "./TodoItems"
import TodoCompletedItems from "./TodoCompletedItems"

const TodoContainer = () => {
    const [isCompleteScreen, setIsCompleteScreen] = useState<boolean>(false)

    return (
        <div className="p-[5%] bg-bg2 w-[700px] shadow-xl/50">
            <div className="pb-3 mb-5 border-b-2 border-white/25">
                <TodoInputs />
            </div>

            <div className="flex items-center justify-start">
                <button 
                    className={`cursor-pointer p-2 w-[60px] rounded-xs ${!isCompleteScreen ? "bg-emr" : "bg-bg3"}`}
                    onClick={()=>setIsCompleteScreen(false)}
                >
                    Todo
                </button>
                <button 
                    className={`cursor-pointer p-2 rounded-xs ${isCompleteScreen ? "bg-emr" : "bg-bg3"}`}
                    onClick={()=>setIsCompleteScreen(true)}
                >
                    Completed
                </button>
            </div>

            {isCompleteScreen
                ? <TodoCompletedItems />
                : <TodoItems />
            } 
        </div>
    )
}

export default TodoContainer