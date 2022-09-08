import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DirectorsBasicData from '../Directors/DirectorsBasicData'
import NursesBasicData from '../Nurses/NursesBasicData';
import PatientsForNurse from '../Patients/PatientsForNurse';
import DoctorsBasicData from '../Doctors/DoctorsBasicData';
import DisplayHome from './DisplayHome';
import NurseProfile from '../Nurses/NurseProfile';

const NurseHome = () => {

    return (
        <>
            <Routes>
                <Route index element={<DisplayHome />} />
                <Route path='home/*' element={<DisplayHome />} />
                <Route path='directors/*' element={<DirectorsBasicData />} />
                <Route path='doctors/*' element={<DoctorsBasicData />} />
                <Route path='nurses/*' element={<NursesBasicData />} />
                <Route path='patients/*' element={<PatientsForNurse />} />
                <Route path='Dashboard/*' element={<DisplayHome />} />
                <Route path='Profile/*' element={<NurseProfile /> } />
            </Routes>
        </>
    )
}

export default NurseHome;