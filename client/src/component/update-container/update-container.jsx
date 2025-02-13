import React, { useState } from "react";
import "./update-container.css";

function UpdateContainer({ selectedNote, onUpdate }) {
  const [title, setTitle] = useState(selectedNote.title);
  const [description, setDescription] = useState(selectedNote.description);
  const [status, setStatus] = useState(selectedNote.status);
  const [openModel, setOpenModel] = useState(false);

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${selectedNote.id}`,
        {
          method: "PUT",
          credentials: "include", // Include cookies
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description, status }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      console.log(result);

      setOpenModel(false);
      onUpdate(); // Refresh notes after update
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleModel = () => {
    setOpenModel(!openModel);
  };

  return (
    <React.Fragment>
      {!openModel && (
        <div>
          <button onClick={handleModel}>update</button>
        </div>
      )}
      {openModel && (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          ></textarea>
          {/* <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select> */}
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleUpdate}>x</button>
        </div>
      )}
    </React.Fragment>
  );
}

export default UpdateContainer;
