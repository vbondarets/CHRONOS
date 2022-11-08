import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/UI/Navbar/Navbar';
import './styles/app.css'
import { IsAuthCheck } from './utils/IsAuthCheck';


function App() {
  return (
      <BrowserRouter>
        <Navbar />
        {IsAuthCheck()}
        <AppRouter />
      </BrowserRouter>
  )
}

export default App;
