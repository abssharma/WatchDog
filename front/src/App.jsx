import React from 'react'
import { useState } from 'react'

import './App.css'

import Navbar from './components/Navbar'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Detection from './pages/Detection'
import Report from './pages/Report'
import Game from './pages/Game'


const App = () => {
  return (
    <main className = "bg-slate-300/20">
      <Router>
        <Navbar />
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/detection" element = {<Detection />} />
          <Route path = "/report" element = {<Report />} />
          <Route path = "/game" element = {<Game />} />
        </Routes>
      </Router>
    </main>
  )
}
export default App
