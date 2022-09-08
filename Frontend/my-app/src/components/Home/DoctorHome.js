import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PatientsForDoctor from '../Patients/PatientsForDoctor';
import DisplayHome from './DisplayHome';
import NursesBasicData from '../Nurses/NursesBasicData';
import DirectorsBasicData from '../Directors/DirectorsBasicData';
import DoctorsBasicData from '../Doctors/DoctorsBasicData';
import DoctorProfile from '../Doctors/DoctorProfile';
import DoctorProfileVisits from '../Doctors/DoctorProfileVisits';
import DoctorProfileVisitDetails from '../Doctors/DoctorProfileVisitDetails';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AuthProvider from '../Auth/AuthProvider';

const DoctorHome = () => {

    const [doctor, setDoctor] = useState([]);
    const auth = AuthProvider();
    // ID z ciasteczka wyciągać

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
                <Route index element={<DisplayHome />} />
                <Route path='home/*' element={<DisplayHome />} />
                <Route path='directors/*' element={<DirectorsBasicData />} />
                <Route path='doctors/*' element={<DoctorsBasicData />} />
                <Route path='nurses/*' element={<NursesBasicData />} />
                <Route path='patients/*' element={<PatientsForDoctor />} />
                <Route path='Dashboard/*' element={<DisplayHome />} />
                <Route path='Profile/*' element={<DoctorProfile />} />
                <Route path='visits/*' element={<DoctorProfileVisits doctor={doctor} />} />
                <Route path="visits/:visitId" element={<DoctorProfileVisitDetails
                    doctor={doctor} />} />
            </Routes>
        </>
    )
}

export default DoctorHome;