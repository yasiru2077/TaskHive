import React, { useState } from "react";

function DeleteContainer({ selectedNote, onUpdate, setOpenModel }) {
  const [deleteAlert, setDeleteAlert] = useState(false);

  const handleDeleteAlert = () => {
    setDeleteAlert(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${selectedNote.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      alert("task successfully deleted");
      setOpenModel(false);
      onUpdate(); // Refresh notes after delete
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const closeDeleteAlert = () => {
    setDeleteAlert(false);
  };

  return (
    <div>
      {!deleteAlert && <button onClick={handleDeleteAlert}>delete</button>}
      {deleteAlert && (
        <div>
          <p>Do you want to delete this ?</p>
          <button onClick={handleDelete}>yes</button>
          <button onClick={closeDeleteAlert}>no</button>
        </div>
      )}
    </div>
  );
}

export default DeleteContainer;
