import React from 'react'
import { useNavigate } from 'react-router-dom';
import LoginPatient from './LoginPatient';
import LoginNurse from './LoginNurse';
import LoginDoctor from './LoginDoctor';
import LoginDirector from './LoginDirector';
import { Route, Routes } from 'react-router-dom';
import DisplayLogin from './DisplayLogin';

const Login = () => {

    return (
        <>
            <Routes>
                <Route index element={<DisplayLogin />} />
                <Route path="patient/*" element={<LoginPatient />} />
                <Route path="nurse/*" element={<LoginNurse />} />
                <Route path="doctor/*" element={<LoginDoctor />} />
                <Route path="director/*" element={<LoginDirector />} />
            </Routes>
        </>
    )
}

export default Login;