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
import NavBar from '../NavBar/NavBar';
import { useCookies } from 'react-cookie';
import AuthProvider from '../Auth/AuthProvider';

const DisplayNurse = (nurses) => {
    const { id } = useParams();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const auth = AuthProvider();
    const navigate = useNavigate();
    const nurse = nurses.nurses.find(nurse => (nurse.id).toString() === id);
    const [nurseData, setNurseData] = useState({
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

    const [showForm, setShowForm] = useState(false);

    function refreshPage() {
        window.location.reload(false);
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:44345/api/director/nurses/${id}/delete`, { headers: auth })
            navigate("/nurses");
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
        if (nurse) setNurseData(nurse)
    }, [nurse]);

    const handleEditData = async (id) => {
        const newNurse = { nurseData };
        try {
            await axios.put(`https://localhost:44345/api/nurses/${id}/edit_data`, newNurse.nurseData, { headers: auth })
            setNurseData({
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

    return (
        <>
            {cookies.jwt &&
                <>
                    <NavBar />
                    <div className='userData'>
                        {!showForm && nurse &&
                            <TableContainer style={{ justifyContent: "center", justifyItems: "center", backgroundColor: "#A8DADC" }} sx={{ width: "80%" }} component={Paper}>
                                <Table>
                                    <TableHead style={{ backgroundColor: "#457B9D" }}>
                                        <TableRow style={{ backgroundColor: "#457B9D" }}>
                                            <TableCell align='center' colSpan={3}>
                                                <h3>NURSE DATA</h3>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align='center'>First Name</TableCell>
                                            <TableCell align='center' colSpan={2}>{nurse.firstName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Last Name</TableCell>
                                            <TableCell align='center' colSpan={2}>{nurse.lastName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>License ID</TableCell>
                                            <TableCell align='center' colSpan={2}>{nurse.licenseId}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Email</TableCell>
                                            <TableCell align='center' colSpan={2}>{nurse.email}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Phone</TableCell>
                                            <TableCell align='center' colSpan={2}>{nurse.phone}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Street</TableCell>
                                            <TableCell align='center' colSpan={2}>{nurse.streetName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Building number</TableCell>
                                            <TableCell align='center' colSpan={2}>{nurse.buildingNumber}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Postal code</TableCell>
                                            <TableCell align='center' colSpan={2}>{nurse.postalCode}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>City</TableCell>
                                            <TableCell align='center' colSpan={2}>{nurse.city}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Country</TableCell>
                                            <TableCell align='center' colSpan={2}>{nurse.country}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center' style={{ width: "33.3%" }}>
                                                <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => navigate('change_password')}>Change password</Button>
                                            </TableCell>
                                            <TableCell align='center'>
                                                <Button variant="contained" onClick={() => handleDelete(nurse.id)}>Delete</Button>
                                            </TableCell>
                                            <TableCell align='center' style={{ width: "33.3%" }}>
                                                <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => setShowForm(true)}>Edit data</Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        }
                        {showForm && nurse &&
                            <TableContainer style={{ justifyContent: "center", justifyItems: "center", backgroundColor: "#A8DADC" }} sx={{ width: "80%" }} component={Paper}>
                                <Table>
                                    <TableHead style={{ backgroundColor: "#457B9D" }}>
                                        <TableRow style={{ backgroundColor: "#457B9D" }}>
                                            <TableCell align='center' colSpan={3}>
                                                <h3>NURSE DATA</h3>
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
                                                    value={nurseData.firstName}
                                                    onChange={(e) => setNurseData({ ...nurseData, firstName: e.target.value })}
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
                                                    value={nurseData.lastName}
                                                    onChange={(e) => setNurseData({ ...nurseData, lastName: e.target.value })}
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
                                                    value={nurseData.licenseId}
                                                    onChange={(e) => setNurseData({ ...nurseData, licenseId: e.target.value })}
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
                                                    value={nurseData.email}
                                                    onChange={(e) => setNurseData({ ...nurseData, email: e.target.value })}
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
                                                    value={nurseData.phone}
                                                    onChange={(e) => setNurseData({ ...nurseData, phone: e.target.value })}
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
                                                    value={nurseData.streetName}
                                                    onChange={(e) => setNurseData({ ...nurseData, streetName: e.target.value })}
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
                                                    value={nurseData.buildingNumber}
                                                    onChange={(e) => setNurseData({ ...nurseData, buildingNumber: e.target.value })}
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
                                                    value={nurseData.postalCode}
                                                    onChange={(e) => setNurseData({ ...nurseData, postalCode: e.target.value })}
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
                                                    value={nurseData.city}
                                                    onChange={(e) => setNurseData({ ...nurseData, city: e.target.value })}
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
                                                    value={nurseData.country}
                                                    onChange={(e) => setNurseData({ ...nurseData, country: e.target.value })}
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
                                                <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => handleEditData(nurse.id)}>Accept changes</Button>
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
        </>
    )
}

export default DisplayNurse