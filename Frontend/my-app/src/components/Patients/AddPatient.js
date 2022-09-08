import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import NavBarDoctor from '../NavBar/NavBarDoctor';
import NavBarPatient from '../NavBar/NavBarPatient';
import NavBar from '../NavBar/NavBar';
import { useCookies } from 'react-cookie';
import AuthProvider from '../Auth/AuthProvider';

const AddPatient = () => {

  function refreshPage() {
    window.location.reload(false);
  }

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const auth = AuthProvider();

  const path = window.location.pathname.split('/');

  const handleClickShowPassword = () => {
    setPatientData({
      ...patientData,
      showPassword: !patientData.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setPatientData({
      ...patientData,
      showConfirmPassword: !patientData.showConfirmPassword,
    });
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  const [patientData, setPatientData] = useState({
    firstName: '',
    lastName: '',
    pesel: '',
    birthDate: '',
    email: '',
    phone: '',
    streetName: '',
    buildingNumber: '',
    postalCode: '',
    city: '',
    country: '',
    password: '',
    confirmPassword: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPatient = { patientData };
    try {
      await axios.post('https://localhost:44345/api/patients/register_patient', newPatient.patientData, { headers: auth })
      setPatientData({
        firstName: '',
        lastName: '',
        pesel: '',
        birthDate: '',
        email: '',
        phone: '',
        streetName: '',
        buildingNumber: '',
        postalCode: '',
        city: '',
        country: '',
        password: '',
        confirmPassword: ''
      });
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

  return (
    <>
      {cookies.jwt &&
        <>
          {ShowNavBar(path)}
          <div className='registerBody'>
            <div className='registerForm'>
              <form onSubmit={handleSubmit}>
                <b>REGISTER FORM</b>
                <TextField
                  id='firstName'
                  label="First Name"
                  type='text'
                  variant='outlined'
                  required
                  value={patientData.firstName}
                  onChange={(e) => setPatientData({ ...patientData, firstName: e.target.value })}
                />
                <TextField
                  id='lastName'
                  label="Last Name"
                  type='text'
                  variant='outlined'
                  required
                  value={patientData.lastName}
                  onChange={(e) => setPatientData({ ...patientData, lastName: e.target.value })}
                />
                <TextField
                  id='pesel'
                  label="Pesel"
                  type='text'
                  variant='outlined'
                  required
                  value={patientData.pesel}
                  onChange={(e) => setPatientData({ ...patientData, pesel: e.target.value })}
                />
                <TextField
                  id='birthDate'
                  label="Birth Date"
                  type='date'
                  variant='outlined'
                  required
                  InputLabelProps={{ shrink: true }}
                  value={patientData.birthDate}
                  onChange={(e) => setPatientData({ ...patientData, birthDate: e.target.value })}
                />
                <TextField
                  id='email'
                  label="E-mail"
                  type='email'
                  variant='outlined'
                  required
                  value={patientData.email}
                  onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                />
                <TextField
                  id='phone'
                  label="Phone"
                  type='text'
                  variant='outlined'
                  required
                  value={patientData.phone}
                  onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                />
                <TextField
                  id='streetName'
                  label="Street"
                  type='text'
                  variant='outlined'
                  required
                  value={patientData.streetName}
                  onChange={(e) => setPatientData({ ...patientData, streetName: e.target.value })}
                />
                <TextField
                  id='buildingNumber'
                  label="Building number"
                  type='text'
                  variant='outlined'
                  required
                  value={patientData.buildingNumber}
                  onChange={(e) => setPatientData({ ...patientData, buildingNumber: e.target.value })}
                />
                <TextField
                  id='postalCode'
                  label="Postal code"
                  type='text'
                  variant='outlined'
                  required
                  value={patientData.postalCode}
                  onChange={(e) => setPatientData({ ...patientData, postalCode: e.target.value })}
                />
                <TextField
                  id='city'
                  label="City"
                  type='text'
                  variant='outlined'
                  required
                  value={patientData.city}
                  onChange={(e) => setPatientData({ ...patientData, city: e.target.value })}
                />
                <TextField
                  id='country'
                  label="Country"
                  type='text'
                  variant='outlined'
                  required
                  value={patientData.country}
                  onChange={(e) => setPatientData({ ...patientData, country: e.target.value })}
                />
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    label="Password"
                    type={patientData.showPassword ? 'text' : 'password'}
                    required
                    autoComplete='none'
                    value={patientData.password}
                    onChange={(e) => setPatientData({ ...patientData, password: e.target.value })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {patientData.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl variant='outlined'>
                  <InputLabel htmlFor="outlined-adornment-password">Confirm password</InputLabel>
                  <OutlinedInput
                    id="confirmPassword"
                    label="Confirm password"
                    type={patientData.showConfirmPassword ? 'text' : 'password'}
                    required
                    value={patientData.confirmPassword}
                    onChange={(e) => setPatientData({ ...patientData, confirmPassword: e.target.value })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          edge="end"
                        >
                          {patientData.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <div className='registerButton'>
                  <Button variant="contained" color="primary" type="submit">
                    Register
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className='backButton'>
            <Link style={{ width: "15%" }} to={`/${path[1]}/patients`}><Button variant="contained">Back</Button></Link>
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

export default AddPatient