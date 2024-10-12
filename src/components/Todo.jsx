import React from "react"

class Todo extends React.PureComponent {
    render() {
        const { todo, onTodoChecked, onDelete } = this.props
        return (
            <li className={`flex flex-col todo justify-center px-3 rounded-lg text-md text-white bg-black h-auto w-full my-2 ${todo.checked && 'bg-[rgb(60,60,60)]'}`}>
                <div className="flex justify-between items-start py-2">
                    <div className="flex gap-2 w-3/5">
                        <input
                            className="cursor-pointer appearance-none min-w-6 min-h-6 max-w-6 max-h-6 border border-white rounded-full checked:bg-white checked:border-transparent focus:outline-none mt-2"
                            type="checkbox"
                            checked={todo.checked}
                            onChange={(e) => {
                                onTodoChecked(todo.id, e)
                            }} />
                        <div>
                            <p className={`text-lg ${todo.checked && 'line-through'}`}>{todo.title}</p>
                            <p className={`description hidden ${todo.checked && 'line-through'}`}>{todo.body}</p>
                            <p className="severity">Severity: {todo.severity}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end p-1">
                        <span className="date-create mb-1">
                            {new Date(todo.createdAt).toLocaleString()}
                        </span>
                        <button onClick={() => {
                            onDelete(todo.id)
                        }} className="delete-btn rounded-2xl text-white">Delete</button>
                    </div>
                </div>
            </li>
        )
    }
}

export default Todo