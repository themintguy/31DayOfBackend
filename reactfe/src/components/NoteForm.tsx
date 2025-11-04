import  { useState } from "react";

function NoteForm() {
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const newNote = { body, topic };

    // For now, just log it to the console
    console.log("New Note:", newNote);

    // Optionally, reset the form
    setBody("");
    setTopic("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Body:
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Topic:
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </label>
      </div>

      <button type="submit">Add Note</button>
    </form>
  );
}

export default NoteForm;
