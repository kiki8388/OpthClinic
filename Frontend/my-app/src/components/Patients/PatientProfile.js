import React from 'react'
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import ChangePatientProfilePassword from './ChangePatientProfilePassword';
import PatientProfileVisits from './PatientProfileVisits';
import PatientProfileVisitDetails from './PatientProfileVisitDetails';
import AddVisitByPatient from './AddVisitByPatient';
import DisplayPatientProfile from './DisplayPatientProfile';
import { useCookies } from 'react-cookie';
import AuthProvider from '../Auth/AuthProvider';

const PatientProfile = () => {
    const [patient, setPatient] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const auth = AuthProvider();
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
                <Route index element={<DisplayPatientProfile
                    patient={patient} />} />
                <Route path="change_password" element={<ChangePatientProfilePassword
                    patient={patient} />} />
                <Route path="visits" element={<PatientProfileVisits
                    patient={patient} />} />
                <Route path="visits/create" element={<AddVisitByPatient
                    patient={patient} />} />
                <Route path="visits/:visitId" element={<PatientProfileVisitDetails
                    patient={patient} />} />
            </Routes>
        </>
    )
}

export default PatientProfile