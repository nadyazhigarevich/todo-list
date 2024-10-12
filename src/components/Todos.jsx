import React from "react"
import Todo from "./Todo"

export class Todos extends React.PureComponent {
    render() {
        const { todos, onTodoChecked, onDelete } = this.props
        return (
            <div className="flex justify-center w-2/5">
                <ul className="w-full">
                    {todos.map((todo) => {
                        return (
                            <Todo
                                key={todo.id}
                                todo={todo}
                                onTodoChecked={onTodoChecked}
                                onDelete={onDelete}
                            />
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default Todos