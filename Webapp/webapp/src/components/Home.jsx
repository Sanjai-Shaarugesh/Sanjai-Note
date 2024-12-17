import { useState, useEffect, useRef } from "react";
import { Upload, X } from 'lucide-react';
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import video from "../assets/color.mp4";

function Home() {
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [note_image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  {
    /*const [badge, setBadge] = useState("");*/
  }

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/note/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
      })
      .catch((err) => alert("server busy"));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/note/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);

    formData.append("message", message);

    if (note_image) {
      formData.append("note_image", note_image);
    }

    api
      .post("/api/note/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Failed to make note.");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <video className="videoTag" autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>

      <div>
        <div className="bag">
          <div>
            <h2 className="label ">Notes</h2>
            {notes.map((note) => (
              <Note note={note} onDelete={deleteNote} key={note.id} />
            ))}
          </div>
          <h2 className="font-sans text-white font-bold  text-center text-5xl my-20">Create a Note</h2>
          <form
            className=" align-content: center max-w-sm:50rem mx-auto "
            onSubmit={createNote}
          >
            <div className="max-w-sm:50rem  mx-auto">
              <label className="font-mono text-white font-bold">
                Title :
              </label>
              <br />
              <input
                type="text"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Title"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="content " className="font-mono text-white font-bold">Content</label>
              <br />
              <textarea
                type="text"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  font-mono ..."
                placeholder="content"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <br />

            <div 
              className="w-full max-w-xl mx-auto p-4 bg-black"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div 
                className={`
                  relative 
                  w-full 
                  h-[500px] 
                  rounded-2xl 
                  border-2 
                  ${isDragging 
                    ? 'border-emerald-600' 
                    : note_image 
                      ? 'border-transparent' 
                      : 'border-gray-800 hover:border-emerald-800'}
                  bg-gray-950 
                  flex 
                  items-center 
                  justify-center 
                  overflow-hidden 
                  group 
                  transition-all 
                  duration-500
                `}
              >
                {note_image ? (
                  <div className="relative w-full h-full flex items-center justify-center p-6">
                    <button 
                      type="button"
                      onClick={clearImage}
                      className="
                        absolute 
                        top-4 
                        right-4 
                        z-10 
                        bg-gray-800/70 
                        hover:bg-gray-700 
                        p-2 
                        rounded-full 
                        shadow-lg 
                        transition-all 
                        duration-300 
                        hover:scale-110
                      "
                    >
                      <X className="text-red-500" size={24} />
                    </button>
                    <img 
                      src={URL.createObjectURL(note_image)} 
                      alt="Uploaded" 
                      className="
                        max-w-full 
                        max-h-full 
                        object-contain 
                        rounded-xl 
                        shadow-2xl 
                        transition-transform 
                        duration-300 
                        group-hover:scale-105
                        brightness-90
                      "
                    />
                  </div>
                ) : (
                  <div 
                    className="
                      flex 
                      flex-col 
                      items-center 
                      justify-center 
                      text-center 
                      p-6 
                      space-y-4
                    "
                  >
                    <div 
                      className="
                        bg-emerald-900/30 
                        text-emerald-500 
                        p-6 
                        rounded-full 
                        mb-4 
                        transition-all 
                        duration-300 
                        group-hover:rotate-6 
                        group-hover:scale-110
                      "
                    >
                      <Upload size={48} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-200">
                      Drag and Drop or Click to Upload
                    </h3>
                    <p className="text-sm text-gray-500">
                      Supports: SVG, PNG, JPG, GIF (Max 800x400px)
                    </p>
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="
                        px-6 
                        py-3 
                        bg-emerald-800 
                        text-white 
                        rounded-lg 
                        hover:bg-emerald-700 
                        transition-colors 
                        flex 
                        items-center 
                        gap-2
                        shadow-lg
                        hover:shadow-emerald-500/50
                      "
                    >
                      <Upload size={20} />
                      Choose File
                    </button>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/svg+xml,image/png,image/jpeg,image/gif"
                />
              </div>
            </div>

            <div className=" container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
              <a  className="relative inline-flex items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group">
                <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
                <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                  <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
                  <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
                </span>
                <button type="submit" className="relative text-white">
                  Submit
                </button>
              </a>
            </div>

            <a href="/logout" className="link">
              <h1 className="link">Want to logout click here</h1>
            </a>

            <a href="https://sanjai-shaarugesh.netlify.app" className="link2">
              <h1 className="link2">This webapp is created by shaarugesh</h1>
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;