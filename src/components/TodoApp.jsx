import React, { useState } from "react";

function TodoApp() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAdd = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task }]);
    setTask("");
  };

  const handleDelete = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    if (editIndex === index) {
      setEditIndex(null);
      setEditText("");
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  const handleSave = (index) => {
    const newTasks = [...tasks];
    newTasks[index].text = editText.trim() === "" ? newTasks[index].text : editText;
    setTasks(newTasks);
    setEditIndex(null);
    setEditText("");
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>

      <div className="input-row">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map((t, index) => (
          <li key={index} className="task-item">
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleSave(index)} className="save-btn">Save</button>
                <button onClick={() => setEditIndex(null)} className="cancel-btn">Cancel</button>
              </>
            ) : (
              <>
                <span>{t.text}</span>
                <button onClick={() => handleEdit(index)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(index)} className="delete-btn">Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
