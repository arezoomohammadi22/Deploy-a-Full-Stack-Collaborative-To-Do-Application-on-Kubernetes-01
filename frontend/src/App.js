import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = () => {
    fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask }),
    })
      .then((res) => res.json())
      .then((task) => setTasks([...tasks, task]));
    setNewTask("");
  };

  const toggleTask = (id) => {
    fetch(`/api/tasks/${id}`, { method: "PUT" })
      .then((res) => res.json())
      .then((updatedTask) =>
        setTasks(
          tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          )
        )
      );
  };

  return (
    <div className="App">
      <h1>Collaborative To-Do App</h1>
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
    </div>
  );
}

export default App;
