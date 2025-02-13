import React, { useEffect, useState } from "react";
import "./notes-container.css";
import UpdateContainer from "../update-container/update-container";
import DeleteContainer from "../delete-container/delete-container";
import { useNavigate } from "react-router-dom";

function NotesContainer() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModel, setOpenModel] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const navigate = useNavigate();

  const modelHandle = (note) => {
    setSelectedNote(note);
    setOpenModel(true);
  };

  const closeModal = () => {
    setOpenModel(false);
    setSelectedNote(null);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tasks/", {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });

        if (response.status === 401) {
          navigate("/login")
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // setNotes(data);
        setNotes(
          data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        );
      } catch (err) {
        setError(err);
        console.error("Error fetching notes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [notes, selectedNote]);

  if (loading) {
    return <div>Loading notes...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div>
        {openModel && selectedNote && (
          <div className="noteModel">
            <div>
              <h2>{selectedNote.title}</h2>
              <p>{selectedNote.description}</p>
              <p>{selectedNote.status}</p>
              <button onClick={closeModal}>x</button>
              <DeleteContainer
                selectedNote={selectedNote}
                setOpenModel={setOpenModel}
              />
              <UpdateContainer selectedNote={selectedNote} />
            </div>
          </div>
        )}
      </div>
      <div>
        {notes.map((note) => (
          <div
            className="notes"
            onClick={() => modelHandle(note)}
            key={note.id}
          >
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <p>{note.status}</p>
            <p>{note.created_at}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesContainer;
