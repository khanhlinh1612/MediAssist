import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import 'boxicons';
import NavbarApp from './components/Navbar';
import FooterApp from './components/Footer';
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
import ShowHistory from './pages/History/ShowHistory/ShowHistory';
import HistoryDetail from './pages/History/HistoryDetail/HistoryDetail';
import DoctorDetail from './pages/Doctor/DoctorDetail/DoctorDetail';
import DoctorUpdate from './pages/Doctor/DoctorUpdate/DoctorUpdate';
import MedicalRecord from './pages/MedicalRecord/MedicalRecord';
import Modal from 'react-modal';
import './App.css';
import { UserContextProvider } from './context/UserContext';
import PrivateRoute from './shared-layout/PrivateRoute';

Modal.setAppElement('#root');

function App() {
  const location = useLocation();

  return (
    <UserContextProvider>
      <div className='app'>
        {location.pathname !== "/login" && <NavbarApp />}
        <div className="app-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/medical-record/:id" element={<PrivateRoute><MedicalRecord /></PrivateRoute>} />
            <Route path="/calendar" element={<PrivateRoute><Calendar /></PrivateRoute>} />
            <Route path="/posts/show" element={<PrivateRoute><ShowPost /></PrivateRoute>} />
            <Route path="/posts/create" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
            <Route path="/posts/:id" element={<PrivateRoute><PostDetail /></PrivateRoute>} />
            <Route path="/posts/edit/:id" element={<PrivateRoute><EditPost /></PrivateRoute>} />
            <Route path="/patients/show" element={<PrivateRoute><ShowPatient /></PrivateRoute>} />
            <Route path="/patients/create" element={<PrivateRoute><CreatePatient /></PrivateRoute>} />
            <Route path="/patients/:id" element={<PrivateRoute><UpdatePatient /></PrivateRoute>} />
            <Route path="/history/create" element={<PrivateRoute><CreateHistory /></PrivateRoute>} />
            <Route path="/history/:id" element={<PrivateRoute><HistoryDetail /></PrivateRoute>} />
            <Route path="/history/show" element={<PrivateRoute><ShowHistory /></PrivateRoute>} />
            <Route path="/infor" element={<PrivateRoute><DoctorDetail /></PrivateRoute>} />
            <Route path="/updateInfor" element={<PrivateRoute><DoctorUpdate /></PrivateRoute>} />
          </Routes>
        </div>
        {location.pathname !== "/login" && <FooterApp />}
      </div>
    </UserContextProvider>
  );
}

export default App;
