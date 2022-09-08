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
import NavBar from '../NavBar/NavBar';
import { useCookies } from 'react-cookie';
import AuthProvider from '../Auth/AuthProvider';

const DisplayNurses = ({ nurses }) => {

  function refreshPage() {
    window.location.reload(false);
  }

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const auth = AuthProvider();

  const path = window.location.pathname.split('/');
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:44345/api/director/nurses/${id}/delete`, { headers: auth })
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
          <div className='displayUsers'>
            <TableContainer style={{ justifyContent: "center", justifyItems: "center", backgroundColor: "#A8DADC" }} sx={{ width: "80%" }} component={Paper}>
              <Table>
                <TableHead style={{ backgroundColor: "#457B9D" }}>
                  <TableRow style={{ backgroundColor: "#457B9D" }}>
                    <TableCell align='center' colSpan={6}>
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
                    <TableCell style={{ color: "#F1FAEE" }} align="center">Details</TableCell>
                    <TableCell style={{ color: "#F1FAEE" }} align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {nurses.map((nurse, index) => (
                    <TableRow key={index}>
                      <TableCell align='center'>{index + 1}</TableCell>
                      <TableCell align="center">{nurse.firstName}</TableCell>
                      <TableCell align="center">{nurse.lastName}</TableCell>
                      <TableCell align="center">{nurse.email}</TableCell>
                      <TableCell style={{ width: "10%" }} align="center">
                        <Link to={`/${path[1]}/nurses/${nurse.id}`}>
                          <Button style={{ backgroundColor: "#1D3557" }} variant="contained">Details</Button>
                        </Link>
                      </TableCell>
                      <TableCell style={{ width: "10%" }} align="center">
                        <Button variant="contained" onClick={() => handleDelete(nurse.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className='registerNewUserButton'>
            <Link style={{ width: "30%" }} to={`/${path[1]}/nurses/register`}><Button variant="contained">Register new nurse</Button></Link>
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

export default DisplayNurses