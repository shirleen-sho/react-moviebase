import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import './App.css'

import NavbarMovie from './components/Navbar';
import FooterMovie from './components/Footer';
import AnimatedRoutes from './components/AnimatedRoutes';

function App() {
  return (
    <BrowserRouter>
      <NavbarMovie/>
      <AnimatedRoutes/>
      <FooterMovie/>
    </BrowserRouter>
  );
}

export default App;
