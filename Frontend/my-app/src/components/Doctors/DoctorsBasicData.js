import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import DisplayDoctorsBasicData from './DisplayDoctorsBasicData';
import DoctorVisits from './DoctorVisits';
import DoctorVisitDetails from './DoctorVisitDetails';
import AddVisitToDoctor from './AddVisitToDoctor';
import { useCookies } from 'react-cookie';
import AuthProvider from '../Auth/AuthProvider';

const DoctorsBasicData = () => {

  const [doctors, setDoctors] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const auth = AuthProvider();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://localhost:44345/api/basic_data/all_doctors', { headers: auth });
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
        <Route index element={<DisplayDoctorsBasicData doctors={doctors} />} />
        <Route path=":id/visits" element={<DoctorVisits
          doctors={doctors} />} />
        <Route path=":id/visits/:visitId" element={<DoctorVisitDetails
          doctors={doctors} />} />
        <Route path=":id/visits/create" element={<AddVisitToDoctor
          doctors={doctors} />} />
      </Routes>
    </>
  )
}

export default DoctorsBasicData
