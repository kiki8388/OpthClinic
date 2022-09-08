import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Directors from '../Directors/Directors';
import Nurses from '../Nurses/Nurses';
import Patients from '../Patients/Patients';
import Doctors from '../Doctors/Doctors';
import DisplayHome from './DisplayHome';
import DirectorProfile from '../Directors/DirectorProfile';

const DirectorHome = () => {

    return (
        <>
            <Routes>
                <Route index element={<DisplayHome />} />
                <Route path='home/*' element={<DisplayHome />} />
                <Route path='directors/*' element={<Directors />} />
                <Route path='doctors/*' element={<Doctors />} />
                <Route path='nurses/*' element={<Nurses />} />
                <Route path='patients/*' element={<Patients />} />
                <Route path='Dashboard/*' element={<DisplayHome />} />
                <Route path='Profile/*' element={<DirectorProfile /> } />
            </Routes>
        </>
    )
}

export default DirectorHome;