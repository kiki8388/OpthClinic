import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import DisplayDoctors from './DisplayDoctors';
import DisplayDoctor from './DisplayDoctor';
import AddDoctor from './AddDoctor';
import ChangeDoctorPassword from './ChangeDoctorPassword';
import DoctorVisits from './DoctorVisits';
import DoctorVisitDetails from './DoctorVisitDetails';
import AddVisitToDoctor from './AddVisitToDoctor';
import { useCookies } from 'react-cookie';
import AuthProvider from '../Auth/AuthProvider';

const Doctors = () => {

  const [doctors, setDoctors] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const auth = AuthProvider();
  const [doctorData, setDoctorData] = useState({
    firstName: '',
    lastName: '',
    about: '',
    email: '',
    city: '',
    country: '',
    phone: ''
  });

  const [patients, setPatients] = useState([]);
  const [patientData, setPatientData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    streetName: '',
    buildingNumber: '',
    postalCode: '',
    city: '',
    country: '',
    phone: '',
    description: '',
    recommendations: ''
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://localhost:44345/api/director/all_doctors', { headers: auth });
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
        <Route index element={<DisplayDoctors doctors={doctors} />} />
        <Route path=":id" element={<DisplayDoctor
          doctors={doctors} />} />
        <Route path="register" element={<AddDoctor
          doctorData={doctorData}
          setDoctorData={setDoctorData}
        />} />
        <Route path=":id/change_password" element={<ChangeDoctorPassword
          doctors={doctors} />} />
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

export default Doctors
