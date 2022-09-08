import React from 'react';
import NavBarDoctor from '../NavBar/NavBarDoctor';
import NavBarPatient from '../NavBar/NavBarPatient';
import NavBar from '../NavBar/NavBar';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';

const DisplayHome = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const path = window.location.pathname.split('/');
    const navigate = useNavigate();

    function ShowNavBar(path) {
        if ((path[1] == "patient"))
            return <NavBarPatient />;
        else if ((path[1] == "doctor"))
            return <NavBarDoctor />;
        else
            return <NavBar />;
    }

    return (
        <>
            {cookies.jwt &&
                <>
                    {ShowNavBar(path)}
                    <div className='homeBody'>
                        <TableContainer style={{ justifyContent: "center", justifyItems: "center", backgroundColor: "#1D3557" }} sx={{ width: "40%", height: "20%" }} component={Paper}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell style={{ backgroundColor: "#1D3557", color: "#F1FAEE", fontStyle: "bold", fontSize: "50px" }} align='center'>Welcome {path[1]}!</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
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

export default DisplayHome;