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

const AddDirector = () => {

  function refreshPage() {
    window.location.reload(false);
  }

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const auth = AuthProvider();

  const path = window.location.pathname.split('/');

  const handleClickShowPassword = () => {
    setDirectorData({
      ...directorData,
      showPassword: !directorData.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setDirectorData({
      ...directorData,
      showConfirmPassword: !directorData.showConfirmPassword,
    });
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
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
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDirector = { directorData };
    try {
      await axios.post('https://localhost:44345/api/director/directors/register_director', newDirector.directorData, { headers: auth })
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
        country: '',
        password: '',
        confirmPassword: ''
      });
      navigate(`/${path[1]}/directors`);
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
                  value={directorData.firstName}
                  onChange={(e) => setDirectorData({ ...directorData, firstName: e.target.value })}
                />
                <TextField
                  id='lastName'
                  label="Last Name"
                  type='text'
                  variant='outlined'
                  required
                  value={directorData.lastName}
                  onChange={(e) => setDirectorData({ ...directorData, lastName: e.target.value })}
                />
                <TextField
                  id='licenseId'
                  label="License ID"
                  type='text'
                  variant='outlined'
                  required
                  value={directorData.licenseId}
                  onChange={(e) => setDirectorData({ ...directorData, licenseId: e.target.value })}
                />
                <TextField
                  id='email'
                  label="E-mail"
                  type='email'
                  variant='outlined'
                  required
                  value={directorData.email}
                  onChange={(e) => setDirectorData({ ...directorData, email: e.target.value })}
                />
                <TextField
                  id='phone'
                  label="Phone"
                  type='text'
                  variant='outlined'
                  required
                  value={directorData.phone}
                  onChange={(e) => setDirectorData({ ...directorData, phone: e.target.value })}
                />
                <TextField
                  id='streetName'
                  label="Street"
                  type='text'
                  variant='outlined'
                  required
                  value={directorData.streetName}
                  onChange={(e) => setDirectorData({ ...directorData, streetName: e.target.value })}
                />
                <TextField
                  id='buildingNumber'
                  label="Building number"
                  type='text'
                  variant='outlined'
                  required
                  value={directorData.buildingNumber}
                  onChange={(e) => setDirectorData({ ...directorData, buildingNumber: e.target.value })}
                />
                <TextField
                  id='postalCode'
                  label="Postal code"
                  type='text'
                  variant='outlined'
                  required
                  value={directorData.postalCode}
                  onChange={(e) => setDirectorData({ ...directorData, postalCode: e.target.value })}
                />
                <TextField
                  id='city'
                  label="City"
                  type='text'
                  variant='outlined'
                  required
                  value={directorData.city}
                  onChange={(e) => setDirectorData({ ...directorData, city: e.target.value })}
                />
                <TextField
                  id='country'
                  label="Country"
                  type='text'
                  variant='outlined'
                  required
                  value={directorData.country}
                  onChange={(e) => setDirectorData({ ...directorData, country: e.target.value })}
                />
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    label="Password"
                    type={directorData.showPassword ? 'text' : 'password'}
                    required
                    autoComplete='none'
                    value={directorData.password}
                    onChange={(e) => setDirectorData({ ...directorData, password: e.target.value })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {directorData.showPassword ? <VisibilityOff /> : <Visibility />}
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
                    type={directorData.showConfirmPassword ? 'text' : 'password'}
                    required
                    value={directorData.confirmPassword}
                    onChange={(e) => setDirectorData({ ...directorData, confirmPassword: e.target.value })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          edge="end"
                        >
                          {directorData.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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

export default AddDirector