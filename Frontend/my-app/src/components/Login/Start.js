import React from 'react'
import { useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import { Route, Routes } from 'react-router-dom';
import NavBar from '../NavBar/NavBarStart';

const Login = () => {

    const navigate = useNavigate();

    const path = window.location.pathname.split('/');

    return (
        <>
            <NavBar />
            <div className='LoginChoose'>
                <div className='StartHeader'>
                    <h3>Welcome to Opth Clinic</h3>
                </div>
                <Fab variant="extended" style={{ width: "30%", backgroundColor: "#E63946", color: "#F1FAEE" }} onClick={() => navigate('login')}>
                    <NavigationIcon sx={{ mr: 1 }} />
                    Log in
                </Fab>
            </div>
            <Routes>
                <Route path="login/*" element={<Login />} />  
            </Routes>
        </>
    )
}

export default Login;