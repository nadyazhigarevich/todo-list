import React from "react"
import Filters from "./Filters"

export class Form extends React.Component {
    state = {
        error: null,
        title: "",
        body: "",
        severity: "low",
        search: "",
    }

    handleChangeTitle = (e) => this.setState({ title: e.target.value })

    handleChangeBody = (e) => this.setState({ body: e.target.value })

    handleChangeSeverity = (e) => this.setState({ severity: e.target.value })

    handleChangeSearch = (e) => {
        this.setState({ search: e.target.value })
        this.props.onSearch(e.target.value)
    }

    validateInput = (title, todos) => {
        const trimmedTitle = title.trim().replace(/\s+/g, ' ');
        if (trimmedTitle.length > 36) {
            throw new Error('Title is too long (more than 36 symbols).')
        }
        if (trimmedTitle.length < 3) {
            throw new Error('Title must contain minimum 3 symbols.')
        }
        if (todos.map(todo => todo.title).includes(trimmedTitle)) {
            throw new Error('Task with this title already exists.')
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        try {
            const { title, body, severity } = this.state
            const { todos } = this.props
            this.validateInput(title, todos)
            this.props.onTodoAdd(title, body, severity)
            this.setState({ title: "", body: "", severity: "low", error: null })
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    render() {
        const { title, body, error, severity, search } = this.state
        const severities = ["low", "medium", "high"]

        return (
            <div className='w-2/5 mb-10'>
                <form className="flex flex-col items-center p-5 rounded shadow-2xl" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={this.handleChangeSearch}
                        className="p-2 mb-4 border rounded w-full"
                    />
                    <input
                        className="p-3 outline-none border rounded-t-lg w-full"
                        value={title}
                        type="text"
                        placeholder="Enter task title"
                        onChange={this.handleChangeTitle}
                    />
                    <textarea
                        className="p-3 outline-none border border-t-0 w-full resize-none"
                        value={body}
                        placeholder="Enter task description"
                        onChange={this.handleChangeBody}
                    />
                    <select
                        className="p-3 outline-none border border-t-0 rounded-b-lg w-full"
                        value={severity}
                        onChange={this.handleChangeSeverity}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <Filters severities={severities} onSeverityFilter={this.props.onSeverityFilter} onFilter={this.props.onFilter}/>
                    <button className="rounded w-full bg-black px-3 py-2 text-white" type="submit">Add Task</button>
                    <button
                        className="mt-4 p-2 bg-blue-500 text-white rounded"
                        type="button"
                        onClick={this.props.onGenerateMockTodos}
                    >
                        Сгенерировать 1000 задач
                    </button>
                    {error && <p className="m-2">{error}</p>}
                </form>
            </div>
        )
    }
}

export default Form