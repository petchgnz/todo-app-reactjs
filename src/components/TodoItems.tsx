import { FiTrash2 as Bin } from "react-icons/fi";
import { IoMdCheckmark as CheckMark } from "react-icons/io";

interface TodoItems {
    title: string,
    desc: string,
    isCompleted: boolean,
    onCheckmark: () => void,
    onDeleteTodos: () => void
}

const TodoItems = ({ title, desc, onCheckmark, onDeleteTodos, isCompleted }: TodoItems) => {

    return (
        <div className="">
            <div className="flex items-center justify-between text-start p-5 bg-bg3 mt-5 rounded-xs shadow-xl">
                <div className="">
                    {isCompleted ?
                        (
                            <div className="font-bold text-2xl capitalize text-emr/75 mb-1.5 line-through">
                                {title}
                            </div>

                        )
                        :
                        (
                            <div className="font-bold text-2xl capitalize text-emr mb-1.5">
                                {title}
                            </div>
                        )
                    }
                    <div className="text-base max-w-[450px] capitalize text-gray-300">
                        {desc}
                    </div>
                </div>
                <div className="flex gap-5 text-4xl">
                    <Bin
                        className="transition-all ease-in-out cursor-pointer hover:text-red-500"
                        onClick={onDeleteTodos}
                    />

                    {!isCompleted ?
                        (
                            <CheckMark
                                className="transition-all ease-in-out cursor-pointer hover:text-green-500"
                                onClick={onCheckmark}
                            />
                        )
                        : ("")
                    }

                </div>
            </div>

        </div>
    )
}

export default TodoItems