import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import DisplayPatients from './DisplayPatients';
import DisplayPatientForDoctor from './DisplayPatientForDoctor';
import AddPatient from './AddPatient';
import PatientVisits from './PatientVisits';
import PatientVisitDetails from './PatientVisitDetails';
import AddVisitToPatient from './AddVisitToPatient';
import { useCookies } from 'react-cookie';
import AuthProvider from '../Auth/AuthProvider';

const PatientsForDoctor = () => {

  const [patients, setPatients] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const auth = AuthProvider();
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
    const fetchPatients = async () => {
      try {
        const response = await axios.get('https://localhost:44345/api/patient/get_all', { headers: auth });
        setPatients(response.data);
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
    fetchPatients();
  }, [])

  return (
    <>
      <Routes>
        <Route index element={<DisplayPatients patients={patients} />} />
        <Route path=":id" element={<DisplayPatientForDoctor
          patients={patients} />} />
        <Route path="register" element={<AddPatient
          patientData={patientData}
          setPatientData={setPatientData}
        />} />
        <Route path=":id/visits" element={<PatientVisits
          patients={patients} />} />
        <Route path=":id/visits/create" element={<AddVisitToPatient
          patients={patients} />} />
        <Route path=":id/visits/:visitId" element={<PatientVisitDetails
          patients={patients} />} />
      </Routes>
    </>
  )
}

export default PatientsForDoctor
