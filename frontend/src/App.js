import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadTasks();
  }, [page]);

  const loadTasks = () => {
    fetch(`/api/tasks?page=${page}&search=${search}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load tasks");
        }
        return res.json();
      })
      .then((data) => {
        setTasks((prevTasks) => [...prevTasks, ...data.tasks]);
        setHasMore(data.hasMore);
      })
      .catch((err) => setError(err.message));
  };

  const addTask = () => {
    fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask }),
    })
      .then((res) => res.json())
      .then((task) => {
        setTasks([...tasks, task]);
        setNewTask("");
      })
      .catch((err) => setError("Failed to add task"));
  };

  const toggleTask = (id) => {
    fetch(`/api/tasks/${id}`, { method: "PUT" })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks(
          tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );
      })
      .catch((err) => setError("Failed to update task"));
  };

  const handleSearch = () => {
    setPage(1);
    setTasks([]);
    loadTasks();
  };

  return (
    <div className="App">
      <h1>Collaborative To-Do App</h1>
      {error && <div className="error">{error}</div>}
      <div>
        <input
          type="text"
          placeholder="Search tasks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="New task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} onClick={() => toggleTask(task.id)}>
            {task.completed ? <del>{task.title}</del> : task.title}
          </li>
        ))}
      </ul>
      {hasMore && (
        <button onClick={() => setPage((prevPage) => prevPage + 1)}>
          Load More
        </button>
      )}
    </div>
  );
}

export default App;
