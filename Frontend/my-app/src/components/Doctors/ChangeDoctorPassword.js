import React from 'react'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import NavBarDoctor from '../NavBar/NavBarDoctor';
import NavBarPatient from '../NavBar/NavBarPatient';
import NavBar from '../NavBar/NavBar';
import { useCookies } from 'react-cookie';
import AuthProvider from '../Auth/AuthProvider';

const ChangeDoctorPassword = (doctors) => {
    const { id } = useParams();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const auth = AuthProvider();
    const navigate = useNavigate();
    const doctor = doctors.doctors.find(doctor => (doctor.id).toString() === id);
    const [doctorData, setDoctorData] = useState({
        firstName: '',
        lastName: '',
        licenseId: '',
        email: '',
        phone: '',
        streetName: '',
        buildingNumber: '',
        postalCode: '',
        city: '',
        country: '',
        showPassword: false,
        showConfirmPassword: false
    });

    function ShowNavBar(path) {
        if ((path[1] == "patient"))
            return <NavBarPatient />;
        else if ((path[1] == "doctor"))
            return <NavBarDoctor />;
        else
            return <NavBar />;
    }

    const path = window.location.pathname.split('/');

    const handleClickShowPassword = () => {
        setDoctorData({
            ...doctorData,
            showPassword: !doctorData.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowConfirmPassword = () => {
        setDoctorData({
            ...doctorData,
            showConfirmPassword: !doctorData.showConfirmPassword,
        });
    };

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

    function refreshPage() {
        window.location.reload(false);
    }

    useEffect(() => {
        if (doctor) setDoctorData(doctor)
    }, [doctor]);

    const handleChangePassword = async (id) => {
        const newDoctor = { doctorData };
        try {
            await axios.put(`https://localhost:44345/api/director/doctors/${id}/change_password`, newDoctor.doctorData, { headers: auth })
            setDoctorData({
                password: '',
                confirmPassword: ''
            });
            navigate(`/${path[1]}/doctors/${id}`);
            refreshPage();
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
            {cookies.jwt &&
                <>
                    {ShowNavBar(path)}
                    <div className='userData'>
                        <TableContainer style={{ justifyContent: "center", justifyItems: "center", backgroundColor: "#A8DADC" }} sx={{ width: "80%" }} component={Paper}>
                            <Table>
                                <TableHead style={{ backgroundColor: "#457B9D" }}>
                                    <TableRow style={{ backgroundColor: "#457B9D" }}>
                                        <TableCell align='center' colSpan={3}>
                                            <h3>CHANGE DOCTOR PASSWORD</h3>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align='center'>Password</TableCell>
                                        <TableCell colSpan={2}>
                                            <FormControl variant="outlined">
                                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                                <OutlinedInput
                                                    id="password"
                                                    label="Password"
                                                    type={doctorData.showPassword ? 'text' : 'password'}
                                                    required
                                                    autoComplete='none'
                                                    value={doctorData.password}
                                                    onChange={(e) => setDoctorData({ ...doctorData, password: e.target.value })}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                            >
                                                                {doctorData.showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align='center'>Confirm password</TableCell>
                                        <TableCell colSpan={2}>
                                            <FormControl variant='outlined'>
                                                <InputLabel htmlFor="outlined-adornment-password">Confirm password</InputLabel>
                                                <OutlinedInput
                                                    id="confirmPassword"
                                                    label="Confirm password"
                                                    type={doctorData.showConfirmPassword ? 'text' : 'password'}
                                                    required
                                                    value={doctorData.confirmPassword}
                                                    onChange={(e) => setDoctorData({ ...doctorData, confirmPassword: e.target.value })}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowConfirmPassword}
                                                                onMouseDown={handleMouseDownConfirmPassword}
                                                                edge="end"
                                                            >
                                                                {doctorData.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ width: "33.33%" }} align='center'>
                                        </TableCell>
                                        <TableCell align='center' style={{ width: "33.33%" }}>
                                            <Button variant="contained" onClick={() => navigate(`/${path[1]}/doctors/${doctor.id}`)}>Cancel</Button>
                                        </TableCell>
                                        <TableCell align='center' style={{ width: "33.33%" }}>
                                            <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => handleChangePassword(doctor.id)}>Accept changes</Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                    <div className='backButton'>
                        <Button style={{ width: "15%" }} onClick={() => navigate(-1)} variant="contained">Back</Button>
                    </div>
                </>
            }
            {!cookies.jwt &&
                <>
                    {navigate("/")};
                </>
            }
        </>
    )
}

export default ChangeDoctorPassword