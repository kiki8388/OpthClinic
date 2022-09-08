import { TextField } from '@mui/material';
import React, { Component } from 'react'
import { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import DoctorHome from '../Home/DoctorHome';
import NavBar from '../NavBar/NavBarStart';
import { useCookies } from 'react-cookie';

const LoginDoctor = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        showPassword: (false)
    });

    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const navigate = useNavigate();

    const path = window.location.pathname.split('/');

    const handleClickShowPassword = () => {
        setLoginData({
            ...loginData,
            showPassword: !loginData.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    function refreshPage() {
        window.location.reload(false);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const newLogin = { loginData };
        try {
            const response = await axios.post('https://localhost:44345/api/login/doctor', newLogin.loginData,)
            setLoginData({
                email: '',
                password: ''
            });
            setCookie('jwt', response.data, {path: '/'});
            navigate(`/doctor`);
            //refreshPage();
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
            }
            else {
                console.log(`ERROR: ${error.message}`);
            }
        }
    }

    return (
        <>
            <NavBar />
            <div className='registerBody'>
                <div className='registerForm'>
                    <form onSubmit={handleLogin}>
                        <b>DOCTOR LOGIN FORM</b>
                        <TextField
                            id='email'
                            label="E-mail"
                            type='text'
                            variant='outlined'
                            required
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        />
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                label="Password"
                                type={loginData.showPassword ? 'text' : 'password'}
                                required
                                autoComplete='none'
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {loginData.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <div className='registerButton'>
                            <Button variant="contained" color="primary" type="submit">
                                Log in
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='backButton'>
                <Button variant="contained" style={{ width: "15%" }} onClick={() => navigate(-1)}>Back</Button>
            </div>
            <Routes>
                <Route path="/doctor/*" element={<DoctorHome />} />
            </Routes>
        </>
    )
}

export default LoginDoctor;