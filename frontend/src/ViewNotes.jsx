import React, { useState, useEffect } from "react";
import { getAllNotes, deleteNote } from "./api/notes";

export default function ViewNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await getAllNotes();
      if (response.success) {
        setNotes(response.data);
      } else {
        setError(response.message || "Failed to fetch notes");
      }
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError(err.response?.data?.message || "An error occurred while fetching notes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        const response = await deleteNote(id);
        if (response.success) {
          alert("Note deleted successfully!");
          // Refresh the notes list
          fetchNotes();
        } else {
          alert(response.message || "Failed to delete note");
        }
      } catch (error) {
        console.error("Error deleting note:", error);
        alert(error.response?.data?.message || "An error occurred while deleting the note");
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-8">
        <h2 className="text-xl font-bold mb-4">View Notes</h2>
        <p className="text-gray-600 mb-6">Loading notes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-8">
        <h2 className="text-xl font-bold mb-4">View Notes</h2>
        <p className="text-red-600">Error: {error}</p>
        <button
          onClick={fetchNotes}
          className="mt-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4">View Notes</h2>
      <p className="text-gray-600 mb-6">All your notes are displayed below</p>
      
      {notes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No notes found. Create your first note!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white p-4 rounded-md shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800">{note.title}</h3>
                  <p className="text-gray-600 mt-2">{note.description}</p>
                  <div className="text-xs text-gray-400 mt-2">
                    Created: {new Date(note.createdAt).toLocaleString()}
                    {note.updatedAt && note.updatedAt !== note.createdAt && (
                      <span>, Updated: {new Date(note.updatedAt).toLocaleString()}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="ml-4 px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}