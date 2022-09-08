import React from 'react'
import { useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import NavBar from '../NavBar/NavBarStart';

const DisplayLogin = () => {

    const navigate = useNavigate();

    const path = window.location.pathname.split('/');

    return (
        <>
            <NavBar />
            <div className='LoginChoose'>
                <div className='LoginHeader'>
                    <h3>Who are you?</h3>
                </div>
                <Fab variant="extended" style={{ width: "30%", backgroundColor: "#E63946", color: "#F1FAEE" }} onClick={() => navigate('patient')}>
                    <NavigationIcon sx={{ mr: 1 }} />
                    Patient
                </Fab>
                <Fab variant="extended" style={{ width: "30%", backgroundColor: "#E63946", color: "#F1FAEE", marginTop: "1%" }} onClick={() => navigate('nurse')}>
                    <NavigationIcon sx={{ mr: 1 }} />
                    Nurse
                </Fab>
                <Fab variant="extended" style={{ width: "30%", backgroundColor: "#E63946", color: "#F1FAEE", marginTop: "1%" }} onClick={() => navigate('doctor')}>
                    <NavigationIcon sx={{ mr: 1 }} />
                    Doctor
                </Fab>
                <Fab variant="extended" style={{ width: "30%", backgroundColor: "#E63946", color: "#F1FAEE", marginTop: "1%" }} onClick={() => navigate('director')}>
                    <NavigationIcon sx={{ mr: 1 }} />
                    Director
                </Fab>
            </div>
        </>
    )
}

export default DisplayLogin;