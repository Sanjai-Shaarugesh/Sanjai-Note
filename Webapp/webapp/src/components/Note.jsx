import React from "react";
import "../styles/Note.css";

function Note({ note, onDelete }) {
  // Helper function to check if the date is valid
  function isValidDate(d) {
    return d instanceof Date && !isNaN(d.getTime());
  }

  // Attempt to parse the date
  const date = isValidDate(new Date(note.created_at)) ? new Date(note.created_at) : null;

  return (
    <div className="note-container">
      <p className="note-title">{note.title}</p>
      <p className="note-content">{note.message}</p>
      <img className="img" src={note.note_image} alt="" />
      {/* Display the image */}
     
     
      
      {/* Uncomment the following line if you want to display the formatted date */}
      {/* <p className="note-date">{formattedDate}</p> */}
      <button className="delete-button" onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </div>
  );
}

export default Note;
