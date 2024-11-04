import React, { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SpeechPage from './pages/SpeechPage';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login'
import Fork from './pages/Fork';
import { TokenProvider } from './context/TokenContext';
import Pricing from './pages/Pricing';
import ResetPassword from './components/ResetPassword';
import NewPassword from './components/NewPassword';

function App() {
  

  return (
    <React.Fragment>
      <TokenProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/speechApp' element={<Fork />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/password-change' element={<NewPassword />} />
        </Routes>
      </BrowserRouter>
      </TokenProvider>
    </React.Fragment>
  );
}

export default App;
