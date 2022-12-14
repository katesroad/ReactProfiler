import React from "react";

const DEFAULT_TODO = {
  name: "",
  status: "",
};

const Todo = ({ name, status }) => (
  <div
    className="todo"
    style={{ display: "flex", justifyContent: "space-around" }}
  >
    <div className="todo__name">Name:{name}</div>
    <div className="todo__status">Status:{status}</div>
  </div>
);

const MemorizedTodo = React.memo(Todo);

const TodoList = ({ todos }) => (
  <section>
    <h4>Todo list</h4>
    <ul style={{ listStyle: "none", margin: 0 }}>
      {todos.map((todo) => (
        <li key={todo.name} style={{ marginBottom: "1rem" }}>
          <MemorizedTodo {...todo} />
        </li>
      ))}
    </ul>
  </section>
);

const MemorizedTodoList = React.memo(TodoList);

const PageHeader = () => (
  <header>
    <h4>
      Profiler Example <br />
      <small>page header</small>
    </h4>
  </header>
);

const MemorizedTPageHeader = React.memo(PageHeader);

const AddTodoForm = ({ onAddTodo }) => {
  const [newTodo, setNewTodo] = React.useState(DEFAULT_TODO);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTodo.name && newTodo.status) {
      onAddTodo(newTodo);
      setNewTodo(DEFAULT_TODO);
    }
  };

  return (
    <section>
      <h4>Add new Todo</h4>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="todoName">Name:</label>
          <input
            value={newTodo.name}
            type="text"
            name="todoName"
            id="todoName"
            onChange={(e) =>
              setNewTodo({
                ...newTodo,
                name: e.target.value,
              })
            }
          />
        </p>
        <p>
          <label htmlFor="todoStatus">Status:</label>
          <input
            value={newTodo.status}
            id="todoStatus"
            type="text"
            name="status"
            onChange={(e) =>
              setNewTodo({
                ...newTodo,
                status: e.target.value,
              })
            }
          />
        </p>
        <p>
          <button type="submit">Add</button>
        </p>
      </form>
    </section>
  );
};

const MemorizedAddTodoForm = React.memo(AddTodoForm);

const HomePage = () => {
  const [todos, setTodos] = React.useState([]);

  const handleAddTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <>
      <MemorizedTPageHeader />
      <MemorizedAddTodoForm onAddTodo={handleAddTodo} />
      <hr />
      {todos.length ? (
        <MemorizedTodoList todos={todos} />
      ) : (
        <p>You do not have any todo atm.</p>
      )}
    </>
  );
};

export default HomePage;
