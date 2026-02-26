import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AddNote from './AddNote'
import ViewNotes from './ViewNotes'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Notes App</h1>
        <AddNote />
        <div className="mt-12">
          <ViewNotes />
        </div>
      </div>
    </div>
  )
}

export default App
