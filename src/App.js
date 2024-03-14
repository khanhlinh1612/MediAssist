import React  from 'react';
import { Routes, Route} from 'react-router-dom';
import 'boxicons';
import { useLocation } from 'react-router-dom';
import NavbarApp from './components/Navbar';
import MedicalRecord from './pages/MedicalRecord/MedicalRecord'
import FooterApp from './components/Footer'
import HomePage from './pages/HomePage/HomePage';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Calendar from './pages/Calendar/Calendar';
import ShowPost from './pages/Post/ShowPost/ShowPost';
import CreatePost from './pages/Post/CreatePost/CreatePost';
import PostDetail from './pages/Post/PostDetail/PostDetail';
import EditPost from './pages/Post/EditPost/EditPost';
import CreatePatient from './pages/Patient/CreatePatient/CreatePatient';
import UpdatePatient from './pages/Patient/UpdatePatient/UpdatePatient';
import ShowPatient from './pages/Patient/ShowPatient/ShowPatient';
import CreateHistory from './pages/History/CreateHistory/CreateHistory';
import Modal from 'react-modal';
import './App.css'
import {UserContextProvider} from './UserContext';
Modal.setAppElement('#root');
function App() {

  const location = useLocation();

  return (
    <UserContextProvider>
      <div className='app'>
        {location.pathname!=="/login" && <NavbarApp />}
        <div className="app-content">
            <Routes>
              <Route exact path="/" element={<HomePage/>}/>
              <Route path="/login" element={<Login/>} />
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/profile-form" element={<MedicalRecord/>} />
              <Route path="/calendar" element={<Calendar/>} />
              <Route path="/posts/show" element={<ShowPost/>} />
              <Route path="/posts/create" element={<CreatePost/>} />
              <Route path="/posts/:id" element={<PostDetail/>} />
              <Route path="/posts/edit/:id" element={<EditPost/>} />
              <Route path="/patients/show" element={<ShowPatient/>} />
              <Route path="/patients/create" element={<CreatePatient/>}/>
              <Route path="/patients/:id" element={<UpdatePatient/>}/>
              <Route path="/history/create" element={<CreateHistory/>}/>

            </Routes>

        </div>

        {location.pathname!=="/login" &&<FooterApp /> }
      </div>
    </UserContextProvider>


  );
}

export default App;
