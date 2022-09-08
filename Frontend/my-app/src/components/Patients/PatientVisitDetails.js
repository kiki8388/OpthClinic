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

const PatientVisitDetails = (patients) => {
    const { visitId } = useParams();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const auth = AuthProvider();
    const { id } = useParams();
    const navigate = useNavigate();
    const [visits, setVisits] = useState([]);
    const visit = visits.find(visit => (visit.id).toString() === visitId);
    const patient = patients.patients.find(patient => (patient.id).toString() === id);
    const [visitData, setVisitData] = useState({
        editDate: '',
        room: ''
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

    const [showForm, setShowForm] = useState(false);

    function refreshPage() {
        window.location.reload(false);
    }

    useEffect(() => {
        const fetchVisits = async () => {
            try {
                const response = await axios.get(`https://localhost:44345/api/${patient.id}/all_visits`, { headers: auth });
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
    }, [patient]);

    const handleDelete = async (id, patientId) => {
        try {
            await axios.delete(`https://localhost:44345/api/visits/${id}/delete`, { headers: auth })
            navigate(`/${path[1]}/patients/${patientId}/visits`);
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

    const handleEditData = async (id) => {
        const newVisit = { visitData };
        try {
            await axios.put(`https://localhost:44345/api/visit/${id}/edit`, newVisit.visitData, { headers: auth })
            setVisitData({
                editDate: '',
                room: ''
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

    function showEditForm() {
        setShowForm(true)
        setVisitData({
            editDate: visit.editDate,
            room: visit.room
        })
    }

    return (
        <>
            {cookies.jwt &&
                <>
                    {ShowNavBar(path)}
                    <div className='userData'>
                        {!showForm && visit &&
                            <>
                                <TableContainer style={{ justifyContent: "center", justifyItems: "center", backgroundColor: "#A8DADC" }} sx={{ width: "80%" }} component={Paper}>
                                    <Table>
                                        <TableHead style={{ backgroundColor: "#457B9D" }}>
                                            <TableRow style={{ backgroundColor: "#457B9D" }}>
                                                <TableCell align='center' colSpan={3}>
                                                    <h3>VISIT DATA</h3>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align='center'>Patient</TableCell>
                                                <TableCell align='center' colSpan={2}>{visit.patientFirstName} {visit.patientLastName}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Patient Email</TableCell>
                                                <TableCell align='center' colSpan={2}>{visit.patientEmail}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Doctor</TableCell>
                                                <TableCell align='center' colSpan={2}>{visit.doctorFirstName} {visit.doctorLastName}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Doctor Email</TableCell>
                                                <TableCell align='center' colSpan={2}>{visit.doctorEmail}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Date</TableCell>
                                                <TableCell align='center' colSpan={2}>{visit.date}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Room</TableCell>
                                                <TableCell align='center' colSpan={2}>{visit.room}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Type</TableCell>
                                                <TableCell align='center' colSpan={2}>{visit.type}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Duration (min)</TableCell>
                                                <TableCell align='center' colSpan={2}>{visit.duration}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ width: "33.33%" }} align='center'>
                                                </TableCell>
                                                <TableCell align='center' style={{ width: "33.33%" }}>
                                                    <Button variant="contained" onClick={() => handleDelete(visit.id, patient.id)}>Delete</Button>
                                                </TableCell>
                                                <TableCell align='center' style={{ width: "33.33%" }}>
                                                    <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => showEditForm()}>Edit data</Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>
                        }
                        {showForm && visit &&
                            <>
                                <TableContainer style={{ justifyContent: "center", justifyItems: "center", backgroundColor: "#A8DADC" }} sx={{ width: "80%" }} component={Paper}>
                                    <Table>
                                        <TableHead style={{ backgroundColor: "#457B9D" }}>
                                            <TableRow style={{ backgroundColor: "#457B9D" }}>
                                                <TableCell align='center' colSpan={3}>
                                                    <h3>VISIT DATA</h3>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align='center'>Patient</TableCell>
                                                <TableCell align='center' colSpan={2}>{visit.patientFirstName} {visit.patientLastName}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Patient Email</TableCell>
                                                <TableCell align='center' colSpan={2}>{visit.patientEmail}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Doctor</TableCell>
                                                <TableCell align='center' colSpan={2}>{visit.doctorFirstName} {visit.doctorLastName}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Doctor Email</TableCell>
                                                <TableCell align='center' colSpan={2}>{visit.doctorEmail}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Date</TableCell>
                                                <TableCell align='center' colSpan={2}>
                                                    <TextField
                                                        id='date'
                                                        label="Date"
                                                        type='datetime-local'
                                                        variant='outlined'
                                                        InputLabelProps={{ shrink: true }}
                                                        defaultValue={visitData.editDate}
                                                        value={visitData.editDate}
                                                        onChange={(e) => setVisitData({ ...visitData, editDate: e.target.value })}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Room</TableCell>
                                                <TableCell align='center' colSpan={2}>
                                                    <TextField
                                                        id='room'
                                                        label="Room"
                                                        type='text'
                                                        variant='outlined'
                                                        InputLabelProps={{ shrink: true }}
                                                        value={visitData.room}
                                                        onChange={(e) => setVisitData({ ...visitData, room: e.target.value })}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Type</TableCell>
                                                <TableCell align='center' colSpan={2}>{visit.type}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='center'>Duration (min)</TableCell>
                                                <TableCell align='center' colSpan={2}>{visit.duration}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ width: "33.33%" }} align='center'>
                                                    {/* <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => showScrolledMedicalHistory()}>Show medical history</Button> */}
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <Button variant="contained" onClick={() => setShowForm(false)}>Cancel</Button>
                                                </TableCell>
                                                <TableCell style={{ width: "33.3%" }} align='center'>
                                                    <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => handleEditData(visit.id)}>Accept changes</Button>
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

export default PatientVisitDetails