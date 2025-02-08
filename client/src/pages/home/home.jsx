import React, { useEffect, useState } from "react";

function Home() {
  //maxwidth,marginauto

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tasks/", {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        setNotes(data);
      } catch (err) {
        setError(err);
        console.error("Error fetching notes:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchNotes();
  }, []);
  

  if (loading) {
    return <div>Loading notes...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main>
      <section>Home</section>
      <section>
        {notes.map((note) => (
          <div key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.description}</p>
          </div>
        ))}
      </section>
      <section className="">add</section>
    </main>
  );
}

export default Home;
