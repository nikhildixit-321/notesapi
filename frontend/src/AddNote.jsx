import React, { useState } from "react";
import { createNote } from "./api/notes";

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!title || title.length < 5) {
      newErrors.title = "Title must be at least 5 characters.";
    }
    
    if (title && title.length > 32) {
      newErrors.title = "Title must be at most 32 characters.";
    }
    
    if (!description || description.length < 20) {
      newErrors.description = "Description must be at least 20 characters.";
    }
    
    if (description && description.length > 100) {
      newErrors.description = "Description must be at most 100 characters.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        const noteData = { title, description };
        const response = await createNote(noteData);
        
        if (response.success) {
          alert("Note submitted successfully!");
          // Reset form
          setTitle("");
          setDescription("");
          setErrors({});
        } else {
          alert(response.message || "Failed to submit note");
        }
      } catch (error) {
        console.error("Error submitting note:", error);
        alert(error.response?.data?.message || "An error occurred while submitting the note");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setErrors({});
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4">Add Note</h2>
      <p className="text-gray-600 mb-6">Enter note details below</p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className={`w-full px-3 py-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className={`w-full px-3 py-2 border rounded-md resize-none ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter description"
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500">Max 100 characters</span>
            <span className="text-xs text-gray-500">{description ? description.length : 0}/100</span>
          </div>
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>
        
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}