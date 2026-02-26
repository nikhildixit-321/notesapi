import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AddNote from './AddNote'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <AddNote/>
    </div>
  )
}

export default App
