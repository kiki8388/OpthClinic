import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import NavBarPatient from '../NavBar/NavBarPatient';
import { useCookies } from 'react-cookie';

const DisplayDoctor = (doctors) => {
    const { id } = useParams();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const navigate = useNavigate();
    const doctor = doctors.doctors.find(doctor => (doctor.id).toString() === id);

    const path = window.location.pathname.split('/');

    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <>
            {cookies.jwt &&
                <>
                    <NavBarPatient />
                    <div className='userData'>
                        {doctor &&
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
                                            <TableCell align='center' colSpan={2}>{doctor.firstName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Last Name</TableCell>
                                            <TableCell align='center' colSpan={2}>{doctor.lastName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>About</TableCell>
                                            <TableCell align='center' colSpan={2}>{doctor.about}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Email</TableCell>
                                            <TableCell align='center' colSpan={2}>{doctor.email}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>City</TableCell>
                                            <TableCell align='center' colSpan={2}>{doctor.city}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Country</TableCell>
                                            <TableCell align='center' colSpan={2}>{doctor.country}</TableCell>
                                        </TableRow>
                                        {/* <TableRow>
                                    <TableCell style={{ width: "33.33%" }} align='center'>
                                    </TableCell>
                                    <TableCell align='center' style={{ width: "33.33%" }}>
                                        <Button style={{ backgroundColor: "#1D3557" }} variant="contained" onClick={() => navigate(`visits`)}>Planned visits</Button>
                                    </TableCell>
                                    <TableCell align='center' style={{ width: "33.33%" }}>
                                    </TableCell>
                                </TableRow> */}
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

export default DisplayDoctor