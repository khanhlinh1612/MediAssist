import React from 'react';
// import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavbarApp from './components/Navbar';
import Sidebar from './components/Sidebar';
import MedicalRecord from './components/MedicalRecord'
import FooterApp from './components/Footer'
import './App.css'
function App() {
  return (
    // <Router>
      <div className='app'>
        <NavbarApp />
        <div className='app-body'>
          <div className='sidebar'>
            <Sidebar />
          </div>
          <div className='main-content'>
            <MedicalRecord/>
          </div>

          {/* <Routes>
            <Route path="/profile-form" component={MedicalRecord} />

          </Routes> */}
        </div>
        <FooterApp />
      </div>
    // </Router>
  );
}

export default App;
