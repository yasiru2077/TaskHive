import React, { useState } from "react";

function AddingButton() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending"); // Default status
  const [modelOpen, setModelOpen] = useState(false);

  const handleAddTask = async () => {
    if (!title.trim()) {
      alert("Title is required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description: description || null,
          status: status || "pending",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Task added successfully!");
        setTitle("");
        setDescription("");
        setStatus("pending"); // Reset fields
      } else {
        alert(`Error: ${data}`);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleModel = () => {
    setModelOpen(true);
  };

  const handleModelClose = () => {
    setModelOpen(!modelOpen);
  };

  console.log(modelOpen);

  return (
    <div>
      {!modelOpen && (
        <button onClick={handleModel} className="">
          +
        </button>
      )}

      {modelOpen && (
        <div>
          <button onClick={handleModelClose}>-</button>
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      )}
    </div>
  );
}

export default AddingButton;
