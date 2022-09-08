import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import DisplayDoctorsForPatient from './DisplayDoctorsForPatient';
import DisplayDoctorForPatient from './DisplayDoctorForPatient';
import DoctorVisitsForPatient from './DoctorsVisitsForPatient';
import { useCookies } from 'react-cookie';
import AuthProvider from '../Auth/AuthProvider';

const Doctors = () => {

  const [doctors, setDoctors] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const auth = AuthProvider();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://localhost:44345/api/patient/all_doctors', { headers: auth });
        setDoctors(response.data);
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
    fetchDoctors();
  }, [])

  return (
    <>
      <Routes>
        <Route index element={<DisplayDoctorsForPatient doctors={doctors} />} />
        <Route path=":id" element={<DisplayDoctorForPatient doctors={doctors} />} />
        <Route path=":id/visits" element={<DoctorVisitsForPatient
          doctors={doctors} />} />
      </Routes>
    </>
  )
}

export default Doctors
