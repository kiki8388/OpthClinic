import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NursesBasicData from '../Nurses/NursesBasicData';
import Patients from '../Patients/Patients';
import DoctorsForPatient from '../Doctors/DoctorsForPatient';
import DisplayHome from './DisplayHome';
import DirectorsBasicData from '../Directors/DirectorsBasicData';
import PatientProfile from '../Patients/PatientProfile';
import PatientProfileVisits from '../Patients/PatientProfileVisits';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AuthProvider from '../Auth/AuthProvider';
import PatientProfileVisitDetails from '../Patients/PatientProfileVisitDetails';
import { useCookies } from 'react-cookie';

const PatientHome = (cookies) => {

    const [patient, setPatient] = useState([]);
    const auth = AuthProvider();
    //const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const navigate = useNavigate();
    // ID z ciasteczka wyciągać

    useEffect(() => {
        const getPatientProfile = async () => {
            try {
                const response = await axios.get('https://localhost:44345/api/patient/profile', { headers: auth });
                setPatient(response.data);
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
        getPatientProfile();
    }, []);

    return (
        <>
                <Routes>
                    <Route index element={<DisplayHome cookies={cookies.cookies} />} />
                    <Route path='home/*' element={<DisplayHome />} />
                    <Route path='doctors/*' element={<DoctorsForPatient />} />
                    <Route path='patients/*' element={<PatientProfile />} />
                    <Route path='Profile/*' element={<PatientProfile />} />
                    <Route path='Dashboard/*' element={<DisplayHome />} />
                    <Route path='visits/*' element={<PatientProfileVisits patient={patient} />} />
                    <Route path="visits/:visitId" element={<PatientProfileVisitDetails
                        patient={patient} />} />
                </Routes>
        </>
    )
}

export default PatientHome;