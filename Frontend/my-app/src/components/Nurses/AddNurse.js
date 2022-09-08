import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
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

const AddNurse = () => {

  function refreshPage() {
    window.location.reload(false);
  }

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const auth = AuthProvider();

  const path = window.location.pathname.split('/');

  const handleClickShowPassword = () => {
    setNurseData({
      ...nurseData,
      showPassword: !nurseData.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setNurseData({
      ...nurseData,
      showConfirmPassword: !nurseData.showConfirmPassword,
    });
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
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
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNurse = { nurseData };
    try {
      await axios.post('https://localhost:44345/api/director/nurses/register_nurse', newNurse.nurseData, { headers: auth })
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
        country: '',
        password: '',
        confirmPassword: ''
      });
      navigate(`/${path[1]}/nurses`);
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
                  value={nurseData.firstName}
                  onChange={(e) => setNurseData({ ...nurseData, firstName: e.target.value })}
                />
                <TextField
                  id='lastName'
                  label="Last Name"
                  type='text'
                  variant='outlined'
                  required
                  value={nurseData.lastName}
                  onChange={(e) => setNurseData({ ...nurseData, lastName: e.target.value })}
                />
                <TextField
                  id='licenseId'
                  label="License ID"
                  type='text'
                  variant='outlined'
                  required
                  value={nurseData.licenseId}
                  onChange={(e) => setNurseData({ ...nurseData, licenseId: e.target.value })}
                />
                <TextField
                  id='email'
                  label="E-mail"
                  type='email'
                  variant='outlined'
                  required
                  value={nurseData.email}
                  onChange={(e) => setNurseData({ ...nurseData, email: e.target.value })}
                />
                <TextField
                  id='phone'
                  label="Phone"
                  type='text'
                  variant='outlined'
                  required
                  value={nurseData.phone}
                  onChange={(e) => setNurseData({ ...nurseData, phone: e.target.value })}
                />
                <TextField
                  id='streetName'
                  label="Street"
                  type='text'
                  variant='outlined'
                  required
                  value={nurseData.streetName}
                  onChange={(e) => setNurseData({ ...nurseData, streetName: e.target.value })}
                />
                <TextField
                  id='buildingNumber'
                  label="Building number"
                  type='text'
                  variant='outlined'
                  required
                  value={nurseData.buildingNumber}
                  onChange={(e) => setNurseData({ ...nurseData, buildingNumber: e.target.value })}
                />
                <TextField
                  id='postalCode'
                  label="Postal code"
                  type='text'
                  variant='outlined'
                  required
                  value={nurseData.postalCode}
                  onChange={(e) => setNurseData({ ...nurseData, postalCode: e.target.value })}
                />
                <TextField
                  id='city'
                  label="City"
                  type='text'
                  variant='outlined'
                  required
                  value={nurseData.city}
                  onChange={(e) => setNurseData({ ...nurseData, city: e.target.value })}
                />
                <TextField
                  id='country'
                  label="Country"
                  type='text'
                  variant='outlined'
                  required
                  value={nurseData.country}
                  onChange={(e) => setNurseData({ ...nurseData, country: e.target.value })}
                />
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    label="Password"
                    type={nurseData.showPassword ? 'text' : 'password'}
                    required
                    autoComplete='none'
                    value={nurseData.password}
                    onChange={(e) => setNurseData({ ...nurseData, password: e.target.value })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {nurseData.showPassword ? <VisibilityOff /> : <Visibility />}
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
                    type={nurseData.showConfirmPassword ? 'text' : 'password'}
                    required
                    value={nurseData.confirmPassword}
                    onChange={(e) => setNurseData({ ...nurseData, confirmPassword: e.target.value })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          edge="end"
                        >
                          {nurseData.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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

export default AddNurse