import React from "react"
import { v4 as uuidv4 } from "uuid"
import Chance from "chance"
import Form from "./components/Form"
import Todos from "./components/Todos"

const chance = new Chance()

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      todos: [],
      isFiltered: false,
      search: "",
      severityFilter: [],
    }
  }

  handleTodoAdd = (title, body, severity) => {
    this.setState({
      todos: [
        {
          id: uuidv4(),
          title,
          body,
          severity,
          checked: false,
          createdAt: new Date().toISOString(),
        },
        ...this.state.todos,
      ],
    })
  }

  generateMockTodos = () => {
    const newTodos = Array.from({ length: 1000 }).map(() => ({
      id: uuidv4(),
      title: chance.sentence({ words: 3 }),
      body: chance.paragraph(),
      severity: chance.pickone(["low", "medium", "high"]),
      checked: false,
      createdAt: new Date().toISOString(),
    }))

    this.setState((prevState) => ({
      todos: [...newTodos, ...prevState.todos],
    }))
  }

  handleTodoChecked = (id, e) => {
    const newTodos = this.state.todos.map((todo) =>
      todo.id === id ? { ...todo, checked: e.target.checked } : todo
    )
    this.setState({
      todos: newTodos.sort((a, b) => a.checked - b.checked),
    })
  }

  handleFilter = (e) => {
    this.setState({ isFiltered: e.target.checked })
  }

  handleSearch = (search) => {
    this.setState({ search })
  }

  handleSeverityFilter = (e) => {
    const { value, checked } = e.target

    this.setState(prevState => ({
      severityFilter: checked
        ? [...prevState.severityFilter, value]
        : prevState.severityFilter.filter(severity => severity !== value)
    }))
  }

  handleTodoDelete = (id) => {
    const newTodos = this.state.todos.filter((todo) => todo.id !== id)
    this.setState({
      todos: newTodos.sort((a, b) => a.checked - b.checked),
    })
  }

  filterTodos = () => {
    const { todos, search, severityFilter, isFiltered } = this.state
    return todos.filter(todo => {
      const searchLower = search.toLowerCase()
      const matchesSearch = todo.title.toLowerCase().includes(searchLower) ||
        todo.body.toLowerCase().includes(searchLower)
      const matchesSeverity = severityFilter.length === 0 || severityFilter.includes(todo.severity)
      return matchesSearch && matchesSeverity && (!isFiltered || !todo.checked)
    })
  }

  render() {
    const { todos } = this.state
    const filteredTodos = this.filterTodos()

    return (
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-semibold p-4 mt-10">TODO List</h1>
        <Form
          todos={todos}
          onTodoAdd={this.handleTodoAdd}
          onFilter={this.handleFilter}
          onSearch={this.handleSearch}
          onSeverityFilter={this.handleSeverityFilter}
          onGenerateMockTodos={this.generateMockTodos}
        />
        {todos.length > 0 && filteredTodos.length === 0 ? (
          <p className="mt-4 text-red-500">There are no results.</p>
        ) : (
          filteredTodos.length > 0 && (
            <Todos
              todos={filteredTodos}
              onTodoChecked={this.handleTodoChecked}
              onDelete={this.handleTodoDelete}
            />
          )
        )}
      </div>
    )
  }
}

export default App