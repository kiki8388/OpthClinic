import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NavBarDoctor from '../NavBar/NavBarDoctor';
import NavBarPatient from '../NavBar/NavBarPatient';
import NavBar from '../NavBar/NavBar';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useCookies } from 'react-cookie';
import AuthProvider from '../Auth/AuthProvider';

const AddVisitByDoctor = (doctor) => {

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [visits, setVisits] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const auth = AuthProvider();

    function refreshPage() {
        window.location.reload(false);
    }

    const path = window.location.pathname.split('/');

    const [showDoctorVisits, setShowDoctorVisits] = useState(false);
    const navigate = useNavigate();
    const [visitData, setVisitData] = useState({
        patientId: '',
        doctorId: '',
        date: '',
        room: '',
        type: '',
        duration: ''
    });

    function ShowNavBar(path) {
        if ((path[1] == "patient"))
            return <NavBarPatient />;
        else if ((path[1] == "doctor"))
            return <NavBarDoctor />;
        else
            return <NavBar />;
    }

    const fetchVisits = async () => {
        try {
            const response = await axios.get(`https://localhost:44345/api/${visitData.doctorId}/all_visits`, { headers: auth });
            console.log(response.data);
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

    const showTakenDates = async () => {
        fetchVisits();
        setShowDoctorVisits(true);
    }

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('https://localhost:44345/api/visit/all_doctors', { headers: auth });
                console.log(response.data);
                setDoctors(response.data);
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
        fetchDoctors();
        const fetchPatients = async () => {
            try {
                const response = await axios.get('https://localhost:44345/api/visit/all_patients', { headers: auth });
                setPatients(response.data);
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
        fetchPatients();
        if (doctor.doctor) setVisitData({
            patientId: '',
            doctorId: doctor.doctor.id,
            date: '',
            room: '',
            type: '',
            duration: 15
        })
    }, [doctor.doctor])

    const handleCreateVisit = async (e) => {
        e.preventDefault();
        const newVisit = { visitData };
        try {
            await axios.post(`https://localhost:44345/api/visit/create`, newVisit.visitData, { headers: auth })
            setVisitData({
                patientId: '',
                doctorId: '',
                date: '',
                room: '',
                type: ''
            });
            navigate(`/${path[1]}/Profile/visits`);
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
                    <div className='registerBody'>
                        <div className='registerForm'>
                            <form onSubmit={handleCreateVisit}>
                                <b>CREATE VISIT FORM</b>
                                <FormControl>
                                    <InputLabel id="demo-simple-select-label">Patient</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        required
                                        value={visitData.patientId}
                                        label="Patient"
                                        onChange={(e) => setVisitData({ ...visitData, patientId: e.target.value })}
                                    >
                                        {patients.map((patient, index) => (
                                            <MenuItem value={patient.id} key={index}> {patient.firstName} {patient.lastName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <InputLabel id="demo-simple-select-label">Doctor</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        required
                                        value={visitData.doctorId}
                                        label="Doctor"
                                        onChange={(e) => setVisitData({ ...visitData, doctorId: e.target.value })}
                                    >
                                        {doctors.map((doctor, index) => (
                                            <MenuItem value={doctor.id} key={index}>{doctor.firstName} {doctor.lastName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    id='date'
                                    label="Date"
                                    type='datetime-local'
                                    variant='outlined'
                                    required
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{ min: new Date().toISOString().slice(0, 16), }}
                                    value={visitData.date}
                                    onChange={(e) => setVisitData({ ...visitData, date: e.target.value })}
                                />
                                <TextField
                                    id='room'
                                    label="Room"
                                    type='text'
                                    variant='outlined'
                                    required
                                    value={visitData.room}
                                    onChange={(e) => setVisitData({ ...visitData, room: e.target.value })}
                                />
                                <FormControl>
                                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        required
                                        label="Type"
                                        value={visitData.type}
                                        onChange={(e) => setVisitData({ ...visitData, type: e.target.value })}
                                    >
                                        <MenuItem value="First visit">First visit</MenuItem>
                                        <MenuItem value="Control">Control</MenuItem>
                                        <MenuItem value="Treatment">Treatment</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    id='duration'
                                    label="Duration"
                                    type='number'
                                    variant='outlined'
                                    required
                                    value={visitData.duration}
                                    onChange={(e) => setVisitData({ ...visitData, duration: e.target.value })}
                                />
                                <div className='registerButton'>
                                    <Button variant="contained" color="primary" type="submit">
                                        Create
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {showDoctorVisits &&
                        <div className='userData'>
                            <TableContainer style={{ justifyContent: "center", justifyItems: "center", backgroundColor: "#A8DADC" }} sx={{ width: "80%" }} component={Paper}>
                                <Table>
                                    <TableHead style={{ backgroundColor: "#457B9D" }}>
                                        <TableRow style={{ backgroundColor: "#457B9D" }}>
                                            <TableCell align='center' colSpan={4}>
                                                <h3>TAKEN DATES</h3>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableHead>
                                        <TableRow style={{ backgroundColor: "#1D3557", color: "#F1FAEE" }}>
                                            <TableCell style={{ color: "#F1FAEE", width: "40%" }} align="center">Date</TableCell>
                                            <TableCell style={{ color: "#F1FAEE", width: "20%" }} align="center">Type</TableCell>
                                            <TableCell style={{ color: "#F1FAEE", width: "20%" }} align="center">Duration (min)</TableCell>
                                            <TableCell style={{ color: "#F1FAEE", width: "20%" }} align="center">Room</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {visits.map((visit, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="center">{visit.date}</TableCell>
                                                <TableCell align="center">{visit.type}</TableCell>
                                                <TableCell align="center">{visit.duration}</TableCell>
                                                <TableCell align="center">{visit.room}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell style={{ color: "#F1FAEE" }} align="center" colSpan={4}>
                                                <Button style={{ width: "30%" }} onClick={() => setShowDoctorVisits(false)} variant="contained">Hide</Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    }
                    <div className='backButton'>
                        <Button style={{ width: "15%", backgroundColor: "#1D3557" }} onClick={() => showTakenDates()} variant="contained">Check the taken dates</Button>
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

export default AddVisitByDoctor