import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavbarApp from './components/Navbar';
import Sidebar from './components/Sidebar';
import MedicalRecord from './pages/MedicalRecord/MedicalRecord'
import FooterApp from './components/Footer'
import HomePage from './pages/Homepage';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import './App.css'
import { useEffect } from 'react';
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const location = useLocation();

  return (
      <div className='app'>
        {location.pathname!=="/login" && <NavbarApp />}
          <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/profile-form" element={<MedicalRecord/>} />

          </Routes>
        {location.pathname!=="/login" &&<FooterApp /> }
      </div>

  );
}

export default App;
