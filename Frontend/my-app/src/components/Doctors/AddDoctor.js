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
import NavBar from '../NavBar/NavBar';
import { useCookies } from 'react-cookie';
import AuthProvider from '../Auth/AuthProvider';

const AddDoctor = () => {

  function refreshPage() {
    window.location.reload(false);
  }

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const auth = AuthProvider();

  const path = window.location.pathname.split('/');

  const handleClickShowPassword = () => {
    setDoctorData({
      ...doctorData,
      showPassword: !doctorData.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setDoctorData({
      ...doctorData,
      showConfirmPassword: !doctorData.showConfirmPassword,
    });
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState({
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
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDoctor = { doctorData };
    try {
      await axios.post('https://localhost:44345/api/director/doctors/register_doctor', newDoctor.doctorData, { headers: auth })
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
        country: '',
        password: '',
        confirmPassword: ''
      });
      navigate(`/${path[1]}/doctors`);
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
                  value={doctorData.firstName}
                  onChange={(e) => setDoctorData({ ...doctorData, firstName: e.target.value })}
                />
                <TextField
                  id='lastName'
                  label="Last Name"
                  type='text'
                  variant='outlined'
                  required
                  value={doctorData.lastName}
                  onChange={(e) => setDoctorData({ ...doctorData, lastName: e.target.value })}
                />
                <TextField
                  id='licenseId'
                  label="License ID"
                  type='text'
                  variant='outlined'
                  required
                  value={doctorData.licenseId}
                  onChange={(e) => setDoctorData({ ...doctorData, licenseId: e.target.value })}
                />
                <TextField
                  id='email'
                  label="E-mail"
                  type='email'
                  variant='outlined'
                  required
                  value={doctorData.email}
                  onChange={(e) => setDoctorData({ ...doctorData, email: e.target.value })}
                />
                <TextField
                  id='phone'
                  label="Phone"
                  type='text'
                  variant='outlined'
                  required
                  value={doctorData.phone}
                  onChange={(e) => setDoctorData({ ...doctorData, phone: e.target.value })}
                />
                <TextField
                  id='streetName'
                  label="Street"
                  type='text'
                  variant='outlined'
                  required
                  value={doctorData.streetName}
                  onChange={(e) => setDoctorData({ ...doctorData, streetName: e.target.value })}
                />
                <TextField
                  id='buildingNumber'
                  label="Building number"
                  type='text'
                  variant='outlined'
                  required
                  value={doctorData.buildingNumber}
                  onChange={(e) => setDoctorData({ ...doctorData, buildingNumber: e.target.value })}
                />
                <TextField
                  id='postalCode'
                  label="Postal code"
                  type='text'
                  variant='outlined'
                  required
                  value={doctorData.postalCode}
                  onChange={(e) => setDoctorData({ ...doctorData, postalCode: e.target.value })}
                />
                <TextField
                  id='city'
                  label="City"
                  type='text'
                  variant='outlined'
                  required
                  value={doctorData.city}
                  onChange={(e) => setDoctorData({ ...doctorData, city: e.target.value })}
                />
                <TextField
                  id='country'
                  label="Country"
                  type='text'
                  variant='outlined'
                  required
                  value={doctorData.country}
                  onChange={(e) => setDoctorData({ ...doctorData, country: e.target.value })}
                />
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    label="Password"
                    type={doctorData.showPassword ? 'text' : 'password'}
                    required
                    autoComplete='none'
                    value={doctorData.password}
                    onChange={(e) => setDoctorData({ ...doctorData, password: e.target.value })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {doctorData.showPassword ? <VisibilityOff /> : <Visibility />}
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
                    type={doctorData.showConfirmPassword ? 'text' : 'password'}
                    required
                    value={doctorData.confirmPassword}
                    onChange={(e) => setDoctorData({ ...doctorData, confirmPassword: e.target.value })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          edge="end"
                        >
                          {doctorData.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            <Button variant="contained" style={{ width: "15%" }} onClick={() => navigate(-1)}>Back</Button>
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

export default AddDoctor