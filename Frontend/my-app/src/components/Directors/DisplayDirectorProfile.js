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

const DisplayDirectorProfile = (director) => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const auth = AuthProvider();
    const [directorData, setDirectorData] = useState({
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

    const path = window.location.pathname.split('/');

    const [showForm, setShowForm] = useState(false);

    function refreshPage() {
        window.location.reload(false);
    }

    useEffect(() => {
        if (director.director) setDirectorData(director.director)
    }, [director.director]);

    const handleEditData = async (id) => {
        const newDirector = { directorData };
        try {
            await axios.put(`https://localhost:44345/api/director/${id}/edit_data`, newDirector.directorData, { headers: auth })
            setDirectorData({
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
                        {!showForm && director &&
                            <TableContainer style={{ justifyContent: "center", justifyItems: "center", backgroundColor: "#A8DADC" }} sx={{ width: "80%" }} component={Paper}>
                                <Table>
                                    <TableHead style={{ backgroundColor: "#457B9D" }}>
                                        <TableRow style={{ backgroundColor: "#457B9D" }}>
                                            <TableCell align='center' colSpan={3}>
                                                <h3>DIRECTOR DATA</h3>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align='center'>First Name</TableCell>
                                            <TableCell align='center' colSpan={2}>{director.director.firstName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Last Name</TableCell>
                                            <TableCell align='center' colSpan={2}>{director.director.lastName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>License ID</TableCell>
                                            <TableCell align='center' colSpan={2}>{director.director.licenseId}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Email</TableCell>
                                            <TableCell align='center' colSpan={2}>{director.director.email}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Phone</TableCell>
                                            <TableCell align='center' colSpan={2}>{director.director.phone}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Street</TableCell>
                                            <TableCell align='center' colSpan={2}>{director.director.streetName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Building number</TableCell>
                                            <TableCell align='center' colSpan={2}>{director.director.buildingNumber}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Postal code</TableCell>
                                            <TableCell align='center' colSpan={2}>{director.director.postalCode}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>City</TableCell>
                                            <TableCell align='center' colSpan={2}>{director.director.city}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Country</TableCell>
                                            <TableCell align='center' colSpan={2}>{director.director.country}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ width: "33.33%" }} align='center'>
                                                <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => navigate("change_password")}>Change password</Button>
                                            </TableCell>
                                            <TableCell align='center' style={{ width: "33.33%" }}>
                                                {/* <Button variant="contained" onClick={() => handleDelete(director.id)}>Delete</Button> */}
                                            </TableCell>
                                            <TableCell align='center' style={{ width: "33.3%" }}>
                                                <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => setShowForm(true)}>Edit data</Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        }
                        {showForm && director &&
                            <TableContainer style={{ justifyContent: "center", justifyItems: "center", backgroundColor: "#A8DADC" }} sx={{ width: "80%" }} component={Paper}>
                                <Table>
                                    <TableHead style={{ backgroundColor: "#457B9D" }}>
                                        <TableRow style={{ backgroundColor: "#457B9D" }}>
                                            <TableCell align='center' colSpan={3}>
                                                <h3>DIRECTOR DATA</h3>
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
                                                    value={directorData.firstName}
                                                    onChange={(e) => setDirectorData({ ...directorData, firstName: e.target.value })}
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
                                                    value={directorData.lastName}
                                                    onChange={(e) => setDirectorData({ ...directorData, lastName: e.target.value })}
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
                                                    value={directorData.licenseId}
                                                    onChange={(e) => setDirectorData({ ...directorData, licenseId: e.target.value })}
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
                                                    value={directorData.email}
                                                    onChange={(e) => setDirectorData({ ...directorData, email: e.target.value })}
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
                                                    value={directorData.phone}
                                                    onChange={(e) => setDirectorData({ ...directorData, phone: e.target.value })}
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
                                                    value={directorData.streetName}
                                                    onChange={(e) => setDirectorData({ ...directorData, streetName: e.target.value })}
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
                                                    value={directorData.buildingNumber}
                                                    onChange={(e) => setDirectorData({ ...directorData, buildingNumber: e.target.value })}
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
                                                    value={directorData.postalCode}
                                                    onChange={(e) => setDirectorData({ ...directorData, postalCode: e.target.value })}
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
                                                    value={directorData.city}
                                                    onChange={(e) => setDirectorData({ ...directorData, city: e.target.value })}
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
                                                    value={directorData.country}
                                                    onChange={(e) => setDirectorData({ ...directorData, country: e.target.value })}
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
                                                <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => handleEditData(director.director.id)}>Accept changes</Button>
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

export default DisplayDirectorProfile