import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom';

import Signup from './Components/Signup'
import Login from './Components/Login'
import Face1 from './Components/Face1'
import ChallengeSetup from '../src/'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
      <Routes>
        <Route path="/" element={<Face1 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/challenge' element={<challenge-side/>}/>
      </Routes>
    </>
  )
}

export default App