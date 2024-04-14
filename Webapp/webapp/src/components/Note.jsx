import React from "react";
import "../styles/Note.css";

function Note({ note, onDelete }) {
  // Helper function to check if the date is valid
  function isValidDate(d) {
    return d instanceof Date && !isNaN(d.getTime());
  }

  // Log the date value
  

  // Attempt to parse the date


  // Check if 'created_at' is undefined or not in a valid format
  if (note.created_at === undefined || isNaN(date.getTime())) {
    console.error('Invalid date:', note.created_at);
  }

  // Format the date only if it's valid
 {/* const formattedDate = isValidDate(date)
    ? date.toLocaleDateString("en-IN", { timeZone: 'Asia/Kolkata' })
: 'Invalid date';*/}

  return (
    <div className="note-container">
      <p className="note-title">{note.title}</p>
      <p className="note-content">{note.message}</p>
      {/*<p className="note-date">{formattedDate}</p>*/}
      <button className="delete-button" onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </div>
  );
}

export default Note;
