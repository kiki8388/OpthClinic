import React from 'react'
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
import { useCookies } from 'react-cookie';
import AuthProvider from '../Auth/AuthProvider';
import DisplayPatientForDoctor from '../Patients/DisplayPatientForDoctor';
import { Routes, Route } from 'react-router-dom';

const DisplayDoctorProfile = (doctor) => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const auth = AuthProvider();
    const [doctorData, setDoctorData] = useState({
        firstName: '',
        lastName: '',
        about: '',
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

    const path = window.location.pathname.split('/');

    const [assignedPatients, setAssignedPatients] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [showAboutForm, setShowAboutForm] = useState(false);
    const [showAssignedPatients, setShowAssignedPatients] = useState(false);

    var Scroll = require('react-scroll');
    var scroll = Scroll.animateScroll;

    function showScrolledAssignedPatients(id) {
        fetchAssignedPatients(id);
        setShowAssignedPatients(true);
        scroll.scrollToBottom();
    }

    function refreshPage() {
        window.location.reload(false);
    }

    const handleUnassign = async (doctorId, patientId) => {
        try {
            await axios.post(`https://localhost:44345/api/doctor/${doctorId}/patients/${patientId}/unassign_patient`, { headers: auth })
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

    const fetchAssignedPatients = async (id) => {
        try {
            const response = await axios.get(`https://localhost:44345/api/doctors/${id}/assigned_patients`, { headers: auth });
            setAssignedPatients(response.data);
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

    useEffect(() => {
        console.log(doctor.doctor)
        if (doctor.doctor) setDoctorData(doctor.doctor)
    }, [doctor.doctor]);

    const handleEditData = async (id) => {
        const newDoctor = { doctorData };
        try {
            await axios.put(`https://localhost:44345/api/doctors/${id}/edit_data`, newDoctor.doctorData, { headers: auth })
            setDoctorData({
                firstName: '',
                lastName: '',
                licenseId: '',
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

    const handleEditAboutInfo = async (id) => {
        const newDoctor = { doctorData };
        try {
            await axios.put(`https://localhost:44345/api/doctor/${id}/edit_about_info`, newDoctor.doctorData, { headers: auth })
            setDoctorData({
                about: ''
            });
            setShowAboutForm(false);
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
                    <NavBarDoctor />
                    <div className='userData'>
                        {!showAboutForm && !showForm && doctor &&
                            <TableContainer style={{ justifyContent: "center", justifyItems: "center", backgroundColor: "#A8DADC" }} sx={{ width: "80%" }} component={Paper}>
                                <Table>
                                    <TableHead style={{ backgroundColor: "#457B9D" }}>
                                        <TableRow style={{ backgroundColor: "#457B9D" }}>
                                            <TableCell align='center' colSpan={3}>
                                                <h3>DOCTOR DATA</h3>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align='center'>First Name</TableCell>
                                            <TableCell align='center' colSpan={2}>{doctor.doctor.firstName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Last Name</TableCell>
                                            <TableCell align='center' colSpan={2}>{doctor.doctor.lastName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>About</TableCell>
                                            <TableCell align='center' colSpan={2}>{doctor.doctor.about}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>License ID</TableCell>
                                            <TableCell align='center' colSpan={2}>{doctor.doctor.licenseId}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Email</TableCell>
                                            <TableCell align='center' colSpan={2}>{doctor.doctor.email}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Phone</TableCell>
                                            <TableCell align='center' colSpan={2}>{doctor.doctor.phone}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Street</TableCell>
                                            <TableCell align='center' colSpan={2}>{doctor.doctor.streetName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Building number</TableCell>
                                            <TableCell align='center' colSpan={2}>{doctor.doctor.buildingNumber}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Postal code</TableCell>
                                            <TableCell align='center' colSpan={2}>{doctor.doctor.postalCode}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>City</TableCell>
                                            <TableCell align='center' colSpan={2}>{doctor.doctor.city}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Country</TableCell>
                                            <TableCell align='center' colSpan={2}>{doctor.doctor.country}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ width: "33.33%" }} align='center'>
                                                <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => showScrolledAssignedPatients(doctor.doctor.id)}>Assigned patients</Button>
                                            </TableCell>
                                            <TableCell align='center' style={{ width: "33.33%" }}>
                                                <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => navigate(`visits`)}>Planned visits</Button>
                                            </TableCell>
                                            <TableCell align='center' style={{ width: "33.33%" }}>
                                                <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => navigate("change_password")}>Change password</Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ width: "33.33%" }} align='center'>
                                                <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => setShowAboutForm(true)}>Edit About Info</Button>
                                            </TableCell>
                                            <TableCell align='center' style={{ width: "33.33%" }}>
                                                {/* <Button variant="contained" onClick={() => handleDelete(doctor.id)}>Delete</Button> */}
                                            </TableCell>
                                            <TableCell align='center' style={{ width: "33.33%" }}>
                                                <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => setShowForm(true)}>Edit data</Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        }
                        {!showAboutForm && showForm && doctor &&
                            <TableContainer style={{ justifyContent: "center", justifyItems: "center", backgroundColor: "#A8DADC" }} sx={{ width: "80%" }} component={Paper}>
                                <Table>
                                    <TableHead style={{ backgroundColor: "#457B9D" }}>
                                        <TableRow style={{ backgroundColor: "#457B9D" }}>
                                            <TableCell align='center' colSpan={3}>
                                                <h3>DOCTOR DATA</h3>
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
                                                    value={doctorData.firstName}
                                                    onChange={(e) => setDoctorData({ ...doctorData, firstName: e.target.value })}
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
                                                    value={doctorData.lastName}
                                                    onChange={(e) => setDoctorData({ ...doctorData, lastName: e.target.value })}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>License ID</TableCell>
                                            <TableCell align='center' colSpan={2}>
                                                <TextField
                                                    id='licenseId'
                                                    label="License ID"
                                                    type='text'
                                                    variant='outlined'
                                                    InputLabelProps={{ shrink: true }}
                                                    value={doctorData.licenseId}
                                                    onChange={(e) => setDoctorData({ ...doctorData, licenseId: e.target.value })}
                                                />
                                            </TableCell>
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
                                                    value={doctorData.email}
                                                    onChange={(e) => setDoctorData({ ...doctorData, email: e.target.value })}
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
                                                    value={doctorData.phone}
                                                    onChange={(e) => setDoctorData({ ...doctorData, phone: e.target.value })}
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
                                                    value={doctorData.streetName}
                                                    onChange={(e) => setDoctorData({ ...doctorData, streetName: e.target.value })}
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
                                                    value={doctorData.buildingNumber}
                                                    onChange={(e) => setDoctorData({ ...doctorData, buildingNumber: e.target.value })}
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
                                                    value={doctorData.postalCode}
                                                    onChange={(e) => setDoctorData({ ...doctorData, postalCode: e.target.value })}
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
                                                    value={doctorData.city}
                                                    onChange={(e) => setDoctorData({ ...doctorData, city: e.target.value })}
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
                                                    value={doctorData.country}
                                                    onChange={(e) => setDoctorData({ ...doctorData, country: e.target.value })}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ width: "33.33%" }} align='center'>
                                            </TableCell>
                                            <TableCell align='center' style={{ width: "33.33%" }}>
                                                <Button variant="contained" onClick={() => setShowForm(false)}>Cancel</Button>
                                            </TableCell>
                                            <TableCell align='center' style={{ width: "33.33%" }}>
                                                <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => handleEditData(doctor.doctor.id)}>Accept changes</Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        }
                        {showAboutForm && !showForm && doctor &&
                            <TableContainer style={{ justifyContent: "center", justifyItems: "center", backgroundColor: "#A8DADC" }} sx={{ width: "80%" }} component={Paper}>
                                <Table>
                                    <TableHead style={{ backgroundColor: "#457B9D" }}>
                                        <TableRow style={{ backgroundColor: "#457B9D" }}>
                                            <TableCell align='center' colSpan={3}>
                                                <h3>DOCTOR DATA</h3>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align='center'>First Name</TableCell>
                                            <TableCell align='center' colSpan={2}>{doctor.doctor.firstName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Last Name</TableCell>
                                            <TableCell align='center' colSpan={2}>{doctor.doctor.lastName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>About</TableCell>
                                            <TableCell align='center' colSpan={2}>
                                                <TextField
                                                    id='about'
                                                    label="About"
                                                    type='text'
                                                    variant='outlined'
                                                    InputLabelProps={{ shrink: true }}
                                                    value={doctorData.about}
                                                    onChange={(e) => setDoctorData({ ...doctorData, about: e.target.value })}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>License ID</TableCell>
                                            <TableCell align='center' colSpan={2}>{doctor.doctor.licenseId}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Email</TableCell>
                                            <TableCell align='center' colSpan={2}>{doctor.doctor.email}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Phone</TableCell>
                                            <TableCell align='center' colSpan={2}>{doctor.doctor.phone}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Street</TableCell>
                                            <TableCell align='center' colSpan={2}>{doctor.doctor.streetName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Building number</TableCell>
                                            <TableCell align='center' colSpan={2}>{doctor.doctor.buildingNumber}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Postal code</TableCell>
                                            <TableCell align='center' colSpan={2}>{doctor.doctor.postalCode}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>City</TableCell>
                                            <TableCell align='center' colSpan={2}>{doctor.doctor.city}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Country</TableCell>
                                            <TableCell align='center' colSpan={2}>{doctor.doctor.country}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ width: "33.33%" }} align='center'>
                                            </TableCell>
                                            <TableCell align='center' style={{ width: "33.33%" }}>
                                                <Button variant="contained" onClick={() => setShowAboutForm(false)}>Cancel</Button>
                                            </TableCell>
                                            <TableCell align='center' style={{ width: "33.33%" }}>
                                                <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => handleEditAboutInfo(doctor.doctor.id)}>Accept changes</Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        }
                    </div>
                    <div className='displayAssignedPatients'>
                        {showAssignedPatients &&
                            <TableContainer style={{ justifyContent: "center", justifyItems: "center", backgroundColor: "#A8DADC" }} sx={{ width: "80%" }} component={Paper}>
                                <Table>
                                    <TableHead style={{ backgroundColor: "#457B9D" }}>
                                        <TableRow style={{ backgroundColor: "#457B9D" }}>
                                            <TableCell align='center' colSpan={6}>
                                                <h3>ASSIGNED PATIENTS LIST</h3>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableHead>
                                        <TableRow style={{ backgroundColor: "#1D3557", color: "#F1FAEE" }}>
                                            <TableCell style={{ color: "#F1FAEE" }} align='center'>Id</TableCell>
                                            <TableCell style={{ color: "#F1FAEE" }} align="center">First name</TableCell>
                                            <TableCell style={{ color: "#F1FAEE" }} align="center">Last name</TableCell>
                                            <TableCell style={{ color: "#F1FAEE" }} align="center">Pesel</TableCell>
                                            <TableCell style={{ color: "#F1FAEE" }} align="center">Details</TableCell>
                                            <TableCell style={{ color: "#F1FAEE" }} align="center">Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {assignedPatients.map((patient, index) => (
                                            <TableRow key={index}>
                                                <TableCell align='center'>{index}</TableCell>
                                                <TableCell align="center">{patient.firstName}</TableCell>
                                                <TableCell align="center">{patient.lastName}</TableCell>
                                                <TableCell align="center">{patient.pesel}</TableCell>
                                                <TableCell style={{ width: "10%" }} align="center">
                                                    <Link to={`/doctor/patients/${patient.id}`}>
                                                        <Button style={{ backgroundColor: "#1D3557" }} variant="contained">Details</Button>
                                                    </Link>
                                                </TableCell>
                                                <TableCell style={{ width: "10%" }} align="center">
                                                    <Button variant="contained" onClick={() => handleUnassign(doctor.doctor.id, patient.id)}>Unassign</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell align='center' colSpan={6}>
                                                <Button variant="contained" style={{ width: "31%" }} onClick={() => setShowAssignedPatients(false)}>Hide</Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
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
            <Routes>
                <Route path="patients/:id" element={<DisplayPatientForDoctor
                    patients={assignedPatients} />} />
            </Routes>
        </>
    )
}

export default DisplayDoctorProfile