import React from 'react'
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import ChangeDoctorProfilePassword from './ChangeDoctorProfilePassword';
import DoctorProfileVisits from './DoctorProfileVisits';
import DoctorProfileVisitDetails from './DoctorProfileVisitDetails';
import AddVisitByDoctor from './AddVisitByDoctor';
import DisplayDoctorProfile from './DisplayDoctorProfile';
import { useCookies } from 'react-cookie';
import AuthProvider from '../Auth/AuthProvider';

const DoctorProfile = () => {
    const [doctor, setDoctor] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const auth = AuthProvider();

    useEffect(() => {
        const getDoctorProfile = async () => {
            try {
                const response = await axios.get('https://localhost:44345/api/doctor/profile', { headers: auth });
                setDoctor(response.data);
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
        getDoctorProfile();
    }, []);

    return (
        <>
            <Routes>
                <Route index element={<DisplayDoctorProfile
                    doctor={doctor} />} />
                <Route path="change_password" element={<ChangeDoctorProfilePassword
                    doctor={doctor} />} />
                <Route path="visits" element={<DoctorProfileVisits
                    doctor={doctor} />} />
                <Route path="visits/create" element={<AddVisitByDoctor
                    doctor={doctor} />} />
                <Route path="visits/:visitId" element={<DoctorProfileVisitDetails
                    doctor={doctor} />} />
            </Routes>
        </>
    )
}

export default DoctorProfile