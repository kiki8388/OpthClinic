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
import { TextField } from '@mui/material';
import NavBarDoctor from '../NavBar/NavBarDoctor';
import NavBarPatient from '../NavBar/NavBarPatient';
import NavBar from '../NavBar/NavBar';
import { useCookies } from 'react-cookie';
import AuthProvider from '../Auth/AuthProvider';

const DisplayPatient = (patients) => {
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
        editBirthDate: '',
        streetName: '',
        buildingNumber: '',
        postalCode: '',
        city: '',
        country: '',
        phone: '',
        name: '',
        description: '',
        distReSphere: '',
        distReCylinder: '',
        distReAxis: '',
        distRePupilDistance: '',
        distLeSphere: '',
        distLeCylinder: '',
        distLeAxis: '',
        distLePupilDistance: '',
        closeReSphere: '',
        closeReCylinder: '',
        closeReAxis: '',
        closeRePupilDistance: '',
        closeLeSphere: '',
        closeLeCylinder: '',
        closeLeAxis: '',
        closeLePupilDistance: '',
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

    const [showMedicalHistory, setShowMedicalHistory] = useState(false);

    const [showForm, setShowForm] = useState(false);

    const [showMedicalHistoryForm, setShowMedicalHistoryForm] = useState(false);

    const [showDoctorDetails, setShowDoctorDetails] = useState(false);

    var Scroll = require('react-scroll');
    var scroll = Scroll.animateScroll;

    function showScrolledMedicalHistory() {
        setShowMedicalHistory(true);
        scroll.scrollToBottom();
    }

    function showScrolledDoctorDetails() {
        setShowDoctorDetails(true);
        scroll.scrollTo(900);
    }

    function refreshPage() {
        window.location.reload(false);
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:44345/api/patients/${id}/delete`, { headers: auth })
            navigate(`/${path[1]}/patients`);
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
        if (patient) setPatientData(patient)
    }, [patient]);

    const handleEditData = async (id) => {
        const newPatient = { patientData };
        try {
            await axios.put(`https://localhost:44345/api/patients/${id}/edit_data`, newPatient.patientData, { headers: auth })
            setPatientData({
                firstName: '',
                lastName: '',
                pesel: '',
                editBirthDate: '',
                email: '',
                phone: '',
                streetName: '',
                buildingNumber: '',
                postalCode: '',
                city: '',
                country: ''
            });
            setShowForm(false);
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

    const handleEditMedicalHistory = async (id) => {
        const newPatient = { patientData };
        try {
            await axios.put(`https://localhost:44345/api/doctor/patients/${id}/edit_medical_history`, newPatient.patientData, { headers: auth })
            setPatientData({
                name: '',
                description: '',
                distReSphere: '',
                distReCylinder: '',
                distReAxis: '',
                distRePupilDistance: '',
                distLeSphere: '',
                distLeCylinder: '',
                distLeAxis: '',
                distLePupilDistance: '',
                closeReSphere: '',
                closeReCylinder: '',
                closeReAxis: '',
                closeRePupilDistance: '',
                closeLeSphere: '',
                closeLeCylinder: '',
                closeLeAxis: '',
                closeLePupilDistance: '',
                recommendations: ''
            });
            setShowMedicalHistoryForm(false);
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
                        {!showForm && patient &&
                            <>
                                <TableContainer style={{ justifyContent: "center", justifyItems: "center", backgroundColor: "#A8DADC" }} sx={{ width: "80%" }} component={Paper}>
                                    <Table>
                                        <TableHead style={{ backgroundColor: "#457B9D" }}>
                                            <TableRow style={{ backgroundColor: "#457B9D" }}>
                                                <TableCell align='center' colSpan={3}>
                                                    <h3>PATIENT DATA</h3>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align='center'>First Name</TableCell>
                                                <TableCell align='center' colSpan={2}>{patient.firstName}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Last Name</TableCell>
                                                <TableCell align='center' colSpan={2}>{patient.lastName}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Pesel</TableCell>
                                                <TableCell align='center' colSpan={2}>{patient.pesel}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Birth date</TableCell>
                                                <TableCell align='center' colSpan={2}>{patient.birthDate}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Age</TableCell>
                                                <TableCell align='center' colSpan={2}>{patient.age}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Email</TableCell>
                                                <TableCell align='center' colSpan={2}>{patient.email}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Phone</TableCell>
                                                <TableCell align='center' colSpan={2}>{patient.phone}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Street</TableCell>
                                                <TableCell align='center' colSpan={2}>{patient.streetName}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Building number</TableCell>
                                                <TableCell align='center' colSpan={2}>{patient.buildingNumber}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Postal code</TableCell>
                                                <TableCell align='center' colSpan={2}>{patient.postalCode}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>City</TableCell>
                                                <TableCell align='center' colSpan={2}>{patient.city}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Country</TableCell>
                                                <TableCell align='center' colSpan={2}>{patient.country}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Assigned doctor</TableCell>
                                                <TableCell align='center' colSpan={2}>{patient.doctorFirstName} {patient.doctorLastName}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center' style={{ width: "33.33%" }}>
                                                    <Button variant="contained" style={{ backgroundColor: "#1D3557" }} onClick={() => showScrolledDoctorDetails()}>Assigned doctor details</Button>
                                                </TableCell>
                                                <TableCell style={{ width: "33.33%" }} align='center'>
                                                    <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => navigate(`visits`)}>Planned visits</Button>
                                                </TableCell>
                                                <TableCell align='center' style={{ width: "33.33%" }}>
                                                    <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => navigate(`change_password`)}>Change password</Button>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ width: "33.33%" }} align='center'>
                                                    <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => showScrolledMedicalHistory()}>Show medical history</Button>
                                                </TableCell>
                                                <TableCell align='center' style={{ width: "33.33%" }}>
                                                    <Button variant="contained" onClick={() => handleDelete(patient.id)}>Delete</Button>
                                                </TableCell>
                                                <TableCell align='center' style={{ width: "33.33%" }}>
                                                    <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => setShowForm(true)}>Edit data</Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>
                        }
                        {showForm && patient &&
                            <>
                                <TableContainer style={{ justifyContent: "center", justifyItems: "center", backgroundColor: "#A8DADC" }} sx={{ width: "80%" }} component={Paper}>
                                    <Table>
                                        <TableHead style={{ backgroundColor: "#457B9D" }}>
                                            <TableRow style={{ backgroundColor: "#457B9D" }}>
                                                <TableCell align='center' colSpan={3}>
                                                    <h3>PATIENT DATA</h3>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align='center'>First Name</TableCell>
                                                <TableCell align='center' colSpan={2}>
                                                    <TextField
                                                        id='firstName'
                                                        label="First name"
                                                        type='text'
                                                        variant='outlined'
                                                        InputLabelProps={{ shrink: true }}
                                                        value={patientData.firstName}
                                                        onChange={(e) => setPatientData({ ...patientData, firstName: e.target.value })}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Last Name</TableCell>
                                                <TableCell align='center' colSpan={2}>
                                                    <TextField
                                                        id='lastName'
                                                        label="Last name"
                                                        type='text'
                                                        variant='outlined'
                                                        InputLabelProps={{ shrink: true }}
                                                        value={patientData.lastName}
                                                        onChange={(e) => setPatientData({ ...patientData, lastName: e.target.value })}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Pesel</TableCell>
                                                <TableCell align='center' colSpan={2}>
                                                    <TextField
                                                        id='pesel'
                                                        label="Pesel"
                                                        type='text'
                                                        variant='outlined'
                                                        InputLabelProps={{ shrink: true }}
                                                        value={patientData.pesel}
                                                        onChange={(e) => setPatientData({ ...patientData, pesel: e.target.value })}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Birth date</TableCell>
                                                <TableCell align='center' colSpan={2}>{patientData.birthDate}</TableCell>

                                                {/* <TableCell align='center' colSpan={2}>
                                            <TextField
                                                id='birthDate'
                                                label="Birth Date"
                                                type='date'
                                                variant='outlined'
                                                InputLabelProps={{ shrink: true }}
                                                value={patientData.editBirthDate}
                                                onChange={(e) => setPatientData({ ...patientData, editBirthDate: e.target.value })}
                                            />
                                        </TableCell> */}
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Age</TableCell>
                                                <TableCell align='center' colSpan={2}>{patientData.age}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Email</TableCell>
                                                <TableCell align='center' colSpan={2}>
                                                    <TextField
                                                        id='email'
                                                        label="E-mail"
                                                        type='email'
                                                        variant='outlined'
                                                        InputLabelProps={{ shrink: true }}
                                                        value={patientData.email}
                                                        onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Phone</TableCell>
                                                <TableCell align='center' colSpan={2}>
                                                    <TextField
                                                        id='phone'
                                                        label="Phone"
                                                        type='text'
                                                        variant='outlined'
                                                        InputLabelProps={{ shrink: true }}
                                                        value={patientData.phone}
                                                        onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Street</TableCell>
                                                <TableCell align='center' colSpan={2}>
                                                    <TextField
                                                        id='streetName'
                                                        label="Street"
                                                        type='text'
                                                        variant='outlined'
                                                        InputLabelProps={{ shrink: true }}
                                                        value={patientData.streetName}
                                                        onChange={(e) => setPatientData({ ...patientData, streetName: e.target.value })}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Building number</TableCell>
                                                <TableCell align='center' colSpan={2}>
                                                    <TextField
                                                        id='buildingNumber'
                                                        label="Building number"
                                                        type='text'
                                                        variant='outlined'
                                                        InputLabelProps={{ shrink: true }}
                                                        value={patientData.buildingNumber}
                                                        onChange={(e) => setPatientData({ ...patientData, buildingNumber: e.target.value })}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Postal code</TableCell>
                                                <TableCell align='center' colSpan={2}>
                                                    <TextField
                                                        id='postalCode'
                                                        label="Postal code"
                                                        type='text'
                                                        variant='outlined'
                                                        InputLabelProps={{ shrink: true }}
                                                        value={patientData.postalCode}
                                                        onChange={(e) => setPatientData({ ...patientData, postalCode: e.target.value })}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>City</TableCell>
                                                <TableCell align='center' colSpan={2}>
                                                    <TextField
                                                        id='city'
                                                        label="City"
                                                        type='text'
                                                        variant='outlined'
                                                        InputLabelProps={{ shrink: true }}
                                                        value={patientData.city}
                                                        onChange={(e) => setPatientData({ ...patientData, city: e.target.value })}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Country</TableCell>
                                                <TableCell align='center' colSpan={2}>
                                                    <TextField
                                                        id='country'
                                                        label="Country"
                                                        type='text'
                                                        variant='outlined'
                                                        InputLabelProps={{ shrink: true }}
                                                        value={patientData.country}
                                                        onChange={(e) => setPatientData({ ...patientData, country: e.target.value })}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ width: "33.33%" }} align='center'>
                                                    {/* <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => showScrolledMedicalHistory()}>Show medical history</Button> */}
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <Button variant="contained" onClick={() => setShowForm(false)}>Cancel</Button>
                                                </TableCell>
                                                <TableCell style={{ width: "33.3%" }} align='center'>
                                                    <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => handleEditData(patient.id)}>Accept changes</Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>
                        }
                    </div>
                    <div className='assignedDoctorInfo'>
                        {showDoctorDetails &&
                            <TableContainer style={{ justifyContent: "center", justifyItems: "center", backgroundColor: "#A8DADC" }} sx={{ width: "80%" }} component={Paper}>
                                <Table>
                                    <TableHead style={{ backgroundColor: "#457B9D" }}>
                                        <TableRow style={{ backgroundColor: "#457B9D" }}>
                                            <TableCell align='center' colSpan={3}>
                                                <h3>ASSIGNED DOCTOR</h3>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align='center'>First Name</TableCell>
                                            <TableCell align='center' colSpan={2}>{patient.doctorFirstName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Last Name</TableCell>
                                            <TableCell align='center' colSpan={2}>{patient.doctorLastName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>About info</TableCell>
                                            <TableCell align='center' colSpan={2}>{patient.doctorAboutInfo}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Email</TableCell>
                                            <TableCell align='center' colSpan={2}>{patient.doctorEmail}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Phone</TableCell>
                                            <TableCell align='center' colSpan={2}>{patient.doctorPhone}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>City</TableCell>
                                            <TableCell align='center' colSpan={2}>{patient.doctorCity}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Country</TableCell>
                                            <TableCell align='center' colSpan={2}>{patient.doctorCountry}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center' style={{ width: "33.33%" }}>
                                            </TableCell>
                                            <TableCell style={{ width: "33.33%" }} align='center'>
                                                <Button variant="contained" onClick={() => setShowDoctorDetails(false)}>Hide</Button>
                                            </TableCell>
                                            <TableCell align='center' style={{ width: "33.33%" }}>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        }
                    </div>
                    <div className='medicalHistory'>
                        {!showMedicalHistoryForm && showMedicalHistory &&
                            <>
                                <TableContainer style={{ justifyContent: "center", justifyItems: "center", backgroundColor: "#A8DADC" }} sx={{ width: "80%" }} component={Paper}>
                                    <Table>
                                        <TableHead style={{ backgroundColor: "#457B9D" }}>
                                            <TableRow style={{ backgroundColor: "#457B9D" }}>
                                                <TableCell align='center' colSpan={6}>
                                                    <h3>MEDICAL HISTORY</h3>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell style={{ backgroundColor: "#1D3557", color: "#F1FAEE" }} align='center' colSpan={6}><h4>Name</h4></TableCell>
                                            </TableRow>
                                            <TableCell align='center' colSpan={6}>{patient.name}</TableCell>
                                            <TableRow>
                                                <TableCell style={{ backgroundColor: "#1D3557", color: "#F1FAEE" }} align='center' colSpan={6}><h4>Description</h4></TableCell>
                                            </TableRow>
                                            <TableCell align='center' colSpan={6}>{patient.description}</TableCell>
                                            <TableRow>
                                                <TableCell style={{ backgroundColor: "#1D3557", color: "#F1FAEE" }} align='center' colSpan={6}><h4>Spectacle Lenses</h4></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center' style={{ width: "8%", backgroundColor: "#457B9D" }}><b>Distance</b></TableCell>
                                                <TableCell align='center' style={{ width: "8%", backgroundColor: "#457B9D" }}><b>Eye</b></TableCell>
                                                <TableCell align='center' style={{ width: "14%", backgroundColor: "#457B9D" }}><b>Sphere</b></TableCell>
                                                <TableCell align='center' style={{ width: "14%", backgroundColor: "#457B9D" }}><b>Cylinder</b></TableCell>
                                                <TableCell align='center' style={{ width: "14%", backgroundColor: "#457B9D" }}><b>Axis</b></TableCell>
                                                <TableCell align='center' style={{ width: "14%", backgroundColor: "#457B9D" }}><b>Pupil distance</b></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Far</TableCell>
                                                <TableCell align='center'>Right</TableCell>
                                                <TableCell align='center'>{patient.distReSphere}</TableCell>
                                                <TableCell align='center'>{patient.distReCylinder}</TableCell>
                                                <TableCell align='center'>{patient.distReAxis}</TableCell>
                                                <TableCell align='center'>{patient.distRePupilDistance}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Far</TableCell>
                                                <TableCell align='center'>Left</TableCell>
                                                <TableCell align='center'>{patient.distLeSphere}</TableCell>
                                                <TableCell align='center'>{patient.distLeCylinder}</TableCell>
                                                <TableCell align='center'>{patient.distLeAxis}</TableCell>
                                                <TableCell align='center'>{patient.distLePupilDistance}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Close</TableCell>
                                                <TableCell align='center'>Right</TableCell>
                                                <TableCell align='center'>{patient.closeReSphere}</TableCell>
                                                <TableCell align='center'>{patient.closeReCylinder}</TableCell>
                                                <TableCell align='center'>{patient.closeReAxis}</TableCell>
                                                <TableCell align='center'>{patient.closeRePupilDistance}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Close</TableCell>
                                                <TableCell align='center'>Left</TableCell>
                                                <TableCell align='center'>{patient.closeLeSphere}</TableCell>
                                                <TableCell align='center'>{patient.closeLeCylinder}</TableCell>
                                                <TableCell align='center'>{patient.closeLeAxis}</TableCell>
                                                <TableCell align='center'>{patient.closeLePupilDistance}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ backgroundColor: "#1D3557", color: "#F1FAEE" }} align='center' colSpan={6}><h4>Recommendations</h4></TableCell>
                                            </TableRow>
                                            <TableCell align='center' colSpan={6}>{patient.recommendations}</TableCell>
                                            <TableRow>
                                                <TableCell style={{ backgroundColor: "#1D3557", color: "#F1FAEE" }} align='center' colSpan={6}><h4>Status</h4></TableCell>
                                            </TableRow>
                                            <TableCell align='center' colSpan={6}>{patient.status}</TableCell>
                                            <TableRow>
                                                <TableCell style={{ width: "50%" }} align='center' colSpan={3}>
                                                    <Button variant="contained" onClick={() => setShowMedicalHistory(false)}>Hide</Button>
                                                </TableCell>
                                                <TableCell align='center' colSpan={3}>
                                                    <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => setShowMedicalHistoryForm(true)}>Edit data</Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>
                        }
                        {showMedicalHistoryForm && showMedicalHistory &&
                            <>
                                <TableContainer style={{ justifyContent: "center", justifyItems: "center", backgroundColor: "#A8DADC" }} sx={{ width: "80%" }} component={Paper}>
                                    <Table>
                                        <TableHead style={{ backgroundColor: "#457B9D" }}>
                                            <TableRow style={{ backgroundColor: "#457B9D" }}>
                                                <TableCell align='center' colSpan={6}>
                                                    <h3>MEDICAL HISTORY</h3>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell style={{ backgroundColor: "#1D3557", color: "#F1FAEE" }} align='center' colSpan={6}><h4>Name</h4></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center' colSpan={6}>
                                                    <TextField
                                                        id='name'
                                                        label="Name"
                                                        type='text'
                                                        variant='outlined'
                                                        InputLabelProps={{ shrink: true }}
                                                        value={patientData.name}
                                                        onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ backgroundColor: "#1D3557", color: "#F1FAEE" }} align='center' colSpan={6}><h4>Description</h4></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center' colSpan={6}>
                                                    <TextField
                                                        id='description'
                                                        label="Description"
                                                        type='text'
                                                        variant='outlined'
                                                        InputLabelProps={{ shrink: true }}
                                                        value={patientData.description}
                                                        onChange={(e) => setPatientData({ ...patientData, description: e.target.value })}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ backgroundColor: "#1D3557", color: "#F1FAEE" }} align='center' colSpan={6}><h4>Spectacle Lenses</h4></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center' style={{ width: "8%", backgroundColor: "#457B9D" }}><b>Distance</b></TableCell>
                                                <TableCell align='center' style={{ width: "8%", backgroundColor: "#457B9D" }}><b>Eye</b></TableCell>
                                                <TableCell align='center' style={{ width: "14%", backgroundColor: "#457B9D" }}><b>Sphere</b></TableCell>
                                                <TableCell align='center' style={{ width: "14%", backgroundColor: "#457B9D" }}><b>Cylinder</b></TableCell>
                                                <TableCell align='center' style={{ width: "14%", backgroundColor: "#457B9D" }}><b>Axis</b></TableCell>
                                                <TableCell align='center' style={{ width: "14%", backgroundColor: "#457B9D" }}><b>Pupil distance</b></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Far</TableCell>
                                                <TableCell align='center'>Right</TableCell>
                                                <TableCell align='center'>
                                                    <TextField
                                                        id='distReSphere'
                                                        type='number'
                                                        variant='outlined'
                                                        defaultValue={0}
                                                        value={patientData.distReSphere}
                                                        onChange={(e) => setPatientData({ ...patientData, distReSphere: e.target.value })}
                                                    />
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <TextField
                                                        id='distReCylinder'
                                                        type='number'
                                                        variant='outlined'
                                                        defaultValue={0}
                                                        value={patientData.distReCylinder}
                                                        onChange={(e) => setPatientData({ ...patientData, distReCylinder: e.target.value })}
                                                    />
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <TextField
                                                        id='distReAxis'
                                                        type='number'
                                                        variant='outlined'
                                                        value={patientData.distReAxis}
                                                        defaultValue={0}
                                                        onChange={(e) => setPatientData({ ...patientData, distReAxis: e.target.value })}
                                                    />
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <TextField
                                                        id='distRePupilDistance'
                                                        type='number'
                                                        variant='outlined'
                                                        defaultValue={0}
                                                        value={patientData.distRePupilDistance}
                                                        onChange={(e) => setPatientData({ ...patientData, distRePupilDistance: e.target.value })}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Far</TableCell>
                                                <TableCell align='center'>Left</TableCell>
                                                <TableCell align='center'>
                                                    <TextField
                                                        id='distLeSphere'
                                                        type='number'
                                                        variant='outlined'
                                                        defaultValue={0}
                                                        value={patientData.distLeSphere}
                                                        onChange={(e) => setPatientData({ ...patientData, distLeSphere: e.target.value })}
                                                    />
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <TextField
                                                        id='distLeCylinder'
                                                        type='number'
                                                        variant='outlined'
                                                        defaultValue={0}
                                                        value={patientData.distLeCylinder}
                                                        onChange={(e) => setPatientData({ ...patientData, distLeCylinder: e.target.value })}
                                                    />
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <TextField
                                                        id='distLeAxis'
                                                        type='number'
                                                        variant='outlined'
                                                        defaultValue={0}
                                                        value={patientData.distLeAxis}
                                                        onChange={(e) => setPatientData({ ...patientData, distLeAxis: e.target.value })}
                                                    />
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <TextField
                                                        id='distLePupilDistance'
                                                        type='number'
                                                        variant='outlined'
                                                        defaultValue={0}
                                                        value={patientData.distLePupilDistance}
                                                        onChange={(e) => setPatientData({ ...patientData, distLePupilDistance: e.target.value })}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Close</TableCell>
                                                <TableCell align='center'>Right</TableCell>
                                                <TableCell align='center'>
                                                    <TextField
                                                        id='closeReSphere'
                                                        type='number'
                                                        variant='outlined'
                                                        defaultValue={0}
                                                        value={patientData.closeReSphere}
                                                        onChange={(e) => setPatientData({ ...patientData, closeReSphere: e.target.value })}
                                                    />
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <TextField
                                                        id='closeReCylinder'
                                                        type='number'
                                                        variant='outlined'
                                                        defaultValue={0}
                                                        value={patientData.closeReCylinder}
                                                        onChange={(e) => setPatientData({ ...patientData, closeReCylinder: e.target.value })}
                                                    />
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <TextField
                                                        id='closeReAxis'
                                                        type='number'
                                                        variant='outlined'
                                                        defaultValue={0}
                                                        value={patientData.closeReAxis}
                                                        onChange={(e) => setPatientData({ ...patientData, closeReAxis: e.target.value })}
                                                    />
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <TextField
                                                        id='distRePupilDistance'
                                                        type='number'
                                                        variant='outlined'
                                                        defaultValue={0}
                                                        value={patientData.closeRePupilDistance}
                                                        onChange={(e) => setPatientData({ ...patientData, closeRePupilDistance: e.target.value })}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Close</TableCell>
                                                <TableCell align='center'>Left</TableCell>
                                                <TableCell align='center'>
                                                    <TextField
                                                        id='closeLeSphere'
                                                        type='number'
                                                        variant='outlined'
                                                        defaultValue={0}
                                                        value={patientData.closeLeSphere}
                                                        onChange={(e) => setPatientData({ ...patientData, closeLeSphere: e.target.value })}
                                                    />
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <TextField
                                                        id='closeLeCylinder'
                                                        type='number'
                                                        variant='outlined'
                                                        defaultValue={0}
                                                        value={patientData.closeLeCylinder}
                                                        onChange={(e) => setPatientData({ ...patientData, closeLeCylinder: e.target.value })}
                                                    />
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <TextField
                                                        id='closeLeAxis'
                                                        type='number'
                                                        variant='outlined'
                                                        defaultValue={0}
                                                        value={patientData.closeLeAxis}
                                                        onChange={(e) => setPatientData({ ...patientData, closeLeAxis: e.target.value })}
                                                    />
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <TextField
                                                        id='distLePupilDistance'
                                                        type='number'
                                                        variant='outlined'
                                                        defaultValue={0}
                                                        value={patientData.closeLePupilDistance}
                                                        onChange={(e) => setPatientData({ ...patientData, closeLePupilDistance: e.target.value })}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ backgroundColor: "#1D3557", color: "#F1FAEE" }} align='center' colSpan={6}><h4>Recommendations</h4></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center' colSpan={6}>
                                                    <TextField
                                                        id='recommendations'
                                                        label="Recommendations"
                                                        type='text'
                                                        variant='outlined'
                                                        InputLabelProps={{ shrink: true }}
                                                        value={patientData.recommendations}
                                                        onChange={(e) => setPatientData({ ...patientData, recommendations: e.target.value })}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ width: "50%" }} align='center' colSpan={3}>
                                                    <Button variant="contained" onClick={() => setShowMedicalHistoryForm(false)}>Cancel</Button>
                                                </TableCell>
                                                <TableCell align='center' colSpan={3}>
                                                    <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => handleEditMedicalHistory(patient.id)}>Accept changes</Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>
                        }
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

export default DisplayPatient