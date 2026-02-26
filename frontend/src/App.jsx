import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AddNote from './AddNote'
import ViewNotes from './ViewNotes'
import EditNote from './EditNote'


function App() {
  const [count, setCount] = useState(0)
  const [editingNote, setEditingNote] = useState(null);

  const handleOpenEditModal = (note) => {
    setEditingNote(note);
  };

  const handleCloseEditModal = () => {
    setEditingNote(null);
  };

  // Make the openEditModal function available globally so ViewNotes can call it
  window.openEditModal = handleOpenEditModal;

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Notes App</h1>
        <AddNote />
        <div className="mt-12">
          <ViewNotes />
        </div>
        {editingNote && (
          <EditNote 
            note={editingNote} 
            onSave={handleCloseEditModal} 
            onCancel={handleCloseEditModal} 
          />
        )}
      </div>
    </div>
  )
}

export default App