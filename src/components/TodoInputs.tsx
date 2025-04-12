import { useState } from "react"

interface TodoInputsProps {
    onAdd: (title: string, desc: string, isCompleted: boolean) => void
}

const TodoInputs = ({ onAdd }: TodoInputsProps) => {
    const [newTitle, setNewTitle] = useState<string>("")
    const [newDesc, setNewDesc] = useState<string>("")

    const handleAddClick = () => {
        if (newTitle.trim() !== "") {
            onAdd(newTitle, newDesc)
            setNewTitle("")
            setNewDesc("")
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleAddClick()
        }
    }
    return (

        <div className="text-start flex justify-between items-center">

            <div className="flex flex-col">
                <label className="font-semibold">Task</label>
                <input
                    type="text"
                    placeholder="What's the task title?"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    className="outline-none bg-bg3 p-1.5 text-lg mt-3 w-[250px]"
                />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold">Description</label>
                <input
                    type="text"
                    placeholder="What's the task description?"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    className="outline-none bg-bg3 p-1.5 text-lg mt-3 w-[250px]"
                />
            </div>
            <div className="mt-10">
                <button
                    className="w-[60px] bg-emr rounded-xs text-lg cursor-pointer p-1.5 hover:bg-emr-dark"
                    onClick={handleAddClick}
                >
                    Add
                </button>
            </div>
        </div>
    )
};

export default TodoInputs