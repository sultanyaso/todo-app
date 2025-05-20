import React, { useState } from "react";

function TodoApp() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAdd = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task }]);
    setTask("");
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>

      <div className="flex mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          className="flex-grow border rounded px-2 py-1"
        />
        <button
          onClick={handleAdd}
          className="ml-2 px-4 py-1 bg-blue-500 text-white rounded"
        >
          Add
        </button>
      </div>

      <ul className="list-disc list-inside">
        {tasks.map((t, index) => (
          <li key={index}>{t.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
