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

const ChangePatientPassword = (patients) => {
    const { id } = useParams();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const auth = AuthProvider();
    const navigate = useNavigate();
    const patient = patients.patients.find(patient => (patient.id).toString() === id);
    const [patientData, setPatientData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        streetName: '',
        buildingNumber: '',
        postalCode: '',
        city: '',
        country: '',
        phone: '',
        name: '',
        description: '',
        recommendations: '',
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
        setPatientData({
            ...patientData,
            showPassword: !patientData.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowConfirmPassword = () => {
        setPatientData({
            ...patientData,
            showConfirmPassword: !patientData.showConfirmPassword,
        });
    };

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

    function refreshPage() {
        window.location.reload(false);
    }

    useEffect(() => {
        if (patient) setPatientData(patient)
    }, [patient]);

    const handleChangePassword = async (id) => {
        const newPatient = { patientData };
        try {
            await axios.put(`https://localhost:44345/api/patients/${id}/change_password`, newPatient.patientData, { headers: auth })
            setPatientData({
                password: '',
                confirmPassword: ''
            });
            navigate(`/${path[1]}/patients/${id}`);
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
                                            <h3>CHANGE PATIENT PASSWORD</h3>
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
                                                    type={patientData.showPassword ? 'text' : 'password'}
                                                    required
                                                    autoComplete='none'
                                                    value={patientData.password}
                                                    onChange={(e) => setPatientData({ ...patientData, password: e.target.value })}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                            >
                                                                {patientData.showPassword ? <VisibilityOff /> : <Visibility />}
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
                                                    type={patientData.showConfirmPassword ? 'text' : 'password'}
                                                    required
                                                    value={patientData.confirmPassword}
                                                    onChange={(e) => setPatientData({ ...patientData, confirmPassword: e.target.value })}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowConfirmPassword}
                                                                onMouseDown={handleMouseDownConfirmPassword}
                                                                edge="end"
                                                            >
                                                                {patientData.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                                            <Button variant="contained" onClick={() => navigate(`/${path[1]}/patients/${patient.id}`)}>Cancel</Button>
                                        </TableCell>
                                        <TableCell align='center' style={{ width: "33.33%" }}>
                                            <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => handleChangePassword(patient.id)}>Accept changes</Button>
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

export default ChangePatientPassword