import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import DisplayNurses from './DisplayNurses';
import DisplayNurse from './DisplayNurse';
import AddNurse from './AddNurse';
import ChangeNursePassword from './ChangeNursePassword';
import { useCookies } from 'react-cookie';
import AuthProvider from '../Auth/AuthProvider';

const Nurses = () => {

  const [nurses, setNurses] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const auth = AuthProvider();
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
    country: ''
  });

  useEffect(() => {
    const fetchNurses = async () => {
      try {
        const response = await axios.get('https://localhost:44345/api/all_nurses', { headers: auth });
        setNurses(response.data);
      }
      catch (error) {
        if (error.response) {
          console.log(error.response.data);
        }
        else {
          console.log(`ERROR: ${error.message}`);
        }
      }
    }
    fetchNurses();
  }, [])

  return (
    <>
      <Routes>
        <Route index element={<DisplayNurses nurses={nurses} />} />
        <Route path=":id" element={<DisplayNurse
          nurses={nurses} />} />
        <Route path="register" element={<AddNurse
          nurseData={nurseData}
          setNurseData={setNurseData}
        />} />
        <Route path=":id/change_password" element={<ChangeNursePassword
          nurses={nurses} />} />
      </Routes>
    </>
  )
}

export default Nurses
