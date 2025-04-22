import React from 'react'

import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import New3dPage from './Pages/New3dPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={`/3d-model/:modelId`} element={<New3dPage/>} />
    </Routes>
  )
}

export default App