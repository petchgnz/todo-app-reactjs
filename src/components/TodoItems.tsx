import { FiTrash2 as Bin } from "react-icons/fi";
import { IoMdCheckmark as CheckMark } from "react-icons/io";

interface TodoItems {
    title: string,
    desc: string,
    isCompleted: boolean,
}

const TodoItems = () => {
    return (
        <div className="flex items-center justify-between text-start p-5 bg-bg3 my-5">
            <div className="">
                <div className="font-bold text-2xl capitalize text-emr mb-1.5">
                    task 1
                </div>
                <div className="text-base max-w-[450px]">description</div>
            </div>

            <div className="flex gap-5 text-4xl">
                <Bin className="transition-all ease-in-out cursor-pointer hover:text-red-500"/>
                <CheckMark className="transition-all ease-in-out cursor-pointer hover:text-green-500"/>
            </div>
        </div>
    )
}

export default TodoItems