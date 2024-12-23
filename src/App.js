import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from '../src/components/Main';
import NavbarComponent  from '../src/components/Navbar';
import Numbers from './components/Numbers';
import Alphabet from './components/Alphabet';
import Words from './components/Words';

const App = () => {
  return (
    <Router>
      <NavbarComponent  />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path='/sayilar' element={<Numbers />} />
        <Route path='/alfabe' element={<Alphabet />} />
        <Route path='/kelimeler' element={<Words />} />
      </Routes>
    </Router>
  );
};

export default App;
