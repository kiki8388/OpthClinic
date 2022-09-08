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
import NavBarDoctor from '../NavBar/NavBarDoctor';
import NavBarPatient from '../NavBar/NavBarPatient';
import NavBar from '../NavBar/NavBar';
import { useCookies } from 'react-cookie';

const DisplayNursesBasicData = ({ nurses }) => {

    function refreshPage() {
        window.location.reload(false);
    }

    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    function ShowNavBar(path) {
        if ((path[1] == "patient"))
            return <NavBarPatient />;
        else if ((path[1] == "doctor"))
            return <NavBarDoctor />;
        else
            return <NavBar />;
    }

    const navigate = useNavigate();

    const path = window.location.pathname.split('/');

    return (
        <>
            {cookies.jwt &&
                <>
                    {ShowNavBar(path)}
                    <div className='displayUsers'>
                        <TableContainer style={{ justifyContent: "center", justifyItems: "center", backgroundColor: "#A8DADC" }} sx={{ width: "80%" }} component={Paper}>
                            <Table>
                                <TableHead style={{ backgroundColor: "#457B9D" }}>
                                    <TableRow style={{ backgroundColor: "#457B9D" }}>
                                        <TableCell align='center' colSpan={4}>
                                            <h3>NURSES LIST</h3>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableHead>
                                    <TableRow style={{ backgroundColor: "#1D3557", color: "#F1FAEE" }}>
                                        <TableCell style={{ color: "#F1FAEE" }} align='center'>Id</TableCell>
                                        <TableCell style={{ color: "#F1FAEE" }} align="center">First name</TableCell>
                                        <TableCell style={{ color: "#F1FAEE" }} align="center">Last name</TableCell>
                                        <TableCell style={{ color: "#F1FAEE" }} align="center">E-mail</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {nurses.map((nurse, index) => (
                                        <TableRow key={index}>
                                            <TableCell align='center' style={{ width: "10%" }}>{index + 1}</TableCell>
                                            <TableCell align="center" style={{ width: "30%" }}>{nurse.firstName}</TableCell>
                                            <TableCell align="center" style={{ width: "30%" }}>{nurse.lastName}</TableCell>
                                            <TableCell align="center" style={{ width: "30%" }}>{nurse.email}</TableCell>
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

export default DisplayNursesBasicData