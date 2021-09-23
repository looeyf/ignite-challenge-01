import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState(false);

  function handleCreateNewTask() {
    if (!newTaskTitle) {
      setError(true);
      return;
    } else if (error && newTaskTitle) {
      setError(false);
    }

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      isComplete: false,
    };

    setTasks((state) => [...state, newTask]);
    setNewTaskTitle("");
  }

  function handleToggleTaskCompletion(id: number) {
    const mappedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            isComplete: !task.isComplete,
          }
        : task
    );

    setTasks(mappedTasks);
  }

  function handleRemoveTask(id: number) {
    setTasks((state) => state.filter((task) => task.id !== id));
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            id="taskInput"
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
            className={error ? "input-error" : ""}
            onKeyPress={(key) => {
              if (key.key === "Enter") {
                handleCreateNewTask();
              }
            }}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div className={task.isComplete ? "completed" : ""} data-testid="task">
                <label className="checkbox-container">
                  <input type="checkbox" readOnly checked={task.isComplete} onClick={() => handleToggleTaskCompletion(task.id)} />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
