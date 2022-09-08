import './App.css';
import NavBar from './components/NavBar/NavBar';
import NotExist from './components/NotExist/NotExist';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Start from './components/Login/Start';
import PatientHome from './components/Home/PatientHome';
import NurseHome from './components/Home/NurseHome';
import DoctorHome from './components/Home/DoctorHome';
import DirectorHome from './components/Home/DirectorHome';

function App() {
  return (
    <>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/patient/*" element={<PatientHome />} />
        <Route path="/nurse/*" element={<NurseHome />} />
        <Route path="/doctor/*" element={<DoctorHome />} />
        <Route path="/director/*" element={<DirectorHome />} />
        <Route path="*" element={<NotExist />} />
      </Routes>
    </>
  );
}

export default App;
