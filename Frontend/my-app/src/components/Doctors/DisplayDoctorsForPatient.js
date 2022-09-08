import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import NavBar from '../NavBar/NavBarPatient';
import { useCookies } from 'react-cookie';

const DisplayDoctorsForPatient = ({ doctors }) => {

    function refreshPage() {
        window.location.reload(false);
    }

    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const navigate = useNavigate();

    const path = window.location.pathname.split('/');

    return (
        <>
            {cookies.jwt &&
                <>
                    <NavBar />
                    <div className='displayUsers'>
                        <TableContainer style={{ justifyContent: "center", justifyItems: "center", backgroundColor: "#A8DADC" }} sx={{ width: "80%" }} component={Paper}>
                            <Table>
                                <TableHead style={{ backgroundColor: "#457B9D" }}>
                                    <TableRow style={{ backgroundColor: "#457B9D" }}>
                                        <TableCell align='center' colSpan={6}>
                                            <h3>DOCTORS LIST</h3>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableHead>
                                    <TableRow style={{ backgroundColor: "#1D3557", color: "#F1FAEE" }}>
                                        <TableCell style={{ color: "#F1FAEE", width: "10%" }} align='center'>Id</TableCell>
                                        <TableCell style={{ color: "#F1FAEE" }} align="center">First name</TableCell>
                                        <TableCell style={{ color: "#F1FAEE" }} align="center">Last name</TableCell>
                                        <TableCell style={{ color: "#F1FAEE" }} align="center" colSpan={2}>About</TableCell>
                                        <TableCell style={{ color: "#F1FAEE" }} align="center">Details</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {doctors.map((doctor, index) => (
                                        <TableRow key={index}>
                                            <TableCell align='center' style={{ width: "10%" }}>{index + 1}</TableCell>
                                            <TableCell align="center" style={{ width: "20%" }}>{doctor.firstName}</TableCell>
                                            <TableCell align="center" style={{ width: "20%" }}>{doctor.lastName}</TableCell>
                                            <TableCell align="center" colSpan={2} style={{ width: "40%" }}>{doctor.about}</TableCell>
                                            <TableCell style={{ width: "10%" }} align="center">
                                                <Link to={`/${path[1]}/doctors/${doctor.id}`}>
                                                    <Button style={{ backgroundColor: "#1D3557" }} variant="contained">Details</Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
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

export default DisplayDoctorsForPatient