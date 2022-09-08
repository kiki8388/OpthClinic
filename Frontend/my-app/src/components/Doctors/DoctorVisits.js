import React from 'react'
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, Routes, Route } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import NavBarDoctor from '../NavBar/NavBarDoctor';
import NavBarPatient from '../NavBar/NavBarPatient';
import NavBar from '../NavBar/NavBar';
import { useCookies } from 'react-cookie';
import AuthProvider from '../Auth/AuthProvider';

const DoctorVisits = (doctors) => {
    const { id } = useParams();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const auth = AuthProvider();
    const navigate = useNavigate();
    const doctor = doctors.doctors.find(doctor => (doctor.id).toString() === id);
    const [doctorData, setDoctorData] = useState({});
    const [visits, setVisits] = useState([]);
    const [visitData, setVisitData] = useState({
        patientFirstName: '',
        patientLastName: '',
        patientEmail: '',
        doctorFirstName: '',
        doctorLastName: '',
        doctorEmail: '',
        date: '',
        editDate: '',
        room: '',
        type: ''
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

    function refreshPage() {
        window.location.reload(false);
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:44345/api/visits/${id}/delete`, { headers: auth })
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

    useEffect(() => {
        if (doctor) setDoctorData(doctor)
        const fetchVisits = async () => {
            try {
                const response = await axios.get(`https://localhost:44345/api/${doctor.id}/all_visits`, { headers: auth });
                setVisits(response.data);
            }
            catch (error) {
                if (error.response) {
                    console.log(error.response.data);
                }
                else {
                    console.log(`ERROR: ${error.message}`);
                }
            }
        }
        fetchVisits();
    }, [doctor])

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
                                        <TableCell align='center' colSpan={7}>
                                            <h3>DOCTOR {doctorData.firstName} {doctorData.lastName} VISITS</h3>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableHead>
                                    <TableRow style={{ backgroundColor: "#1D3557", color: "#F1FAEE" }}>
                                        <TableCell style={{ color: "#F1FAEE", width: "10%" }} align='center'>Id</TableCell>
                                        <TableCell style={{ color: "#F1FAEE", width: "25%" }} align="center">Doctor</TableCell>
                                        <TableCell style={{ color: "#F1FAEE", width: "25%" }} align="center">Date</TableCell>
                                        <TableCell style={{ color: "#F1FAEE", width: "10%" }} align="center">Duration (min)</TableCell>
                                        <TableCell style={{ color: "#F1FAEE", width: "10%" }} align="center">Room</TableCell>
                                        <TableCell style={{ color: "#F1FAEE", width: "10%" }} align="center">Details</TableCell>
                                        <TableCell style={{ color: "#F1FAEE", width: "10%" }} align="center">Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {visits.map((visit, index) => (
                                        <TableRow key={index}>
                                            <TableCell align='center'>{index + 1}</TableCell>
                                            <TableCell align="center">{visit.patientFirstName} {visit.patientLastName}</TableCell>
                                            <TableCell align="center">{visit.date}</TableCell>
                                            <TableCell align="center">{visit.duration}</TableCell>
                                            <TableCell align="center">{visit.room}</TableCell>
                                            <TableCell style={{ width: "10%" }} align="center">
                                                <Link to={`${visit.id}`}>
                                                    <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => navigate(`${visit.id}`)}>Details</Button>
                                                </Link>
                                            </TableCell>
                                            <TableCell style={{ width: "10%" }} align="center">
                                                <Button variant="contained" onClick={() => handleDelete(visit.id)}>Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className='registerNewUserButton'>
                        <Link style={{ width: "30%" }} to={`/${path[1]}/doctors/${doctorData.id}/visits/create`}><Button variant="contained">Create new visit</Button></Link>
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

export default DoctorVisits