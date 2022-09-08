import React from 'react'
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import ChangeDirectorProfilePassword from './ChangeDirectorProfilePassword';
import DisplayDirectorProfile from './DisplayDirectorProfile';
import { useCookies } from 'react-cookie';
import AuthProvider from '../Auth/AuthProvider'

const DirectorProfile = () => {
    const [director, setDirector] = useState({
        firstName: '',
        lastName: '',
        licenseId: '',
        email: '',
        phone: '',
        streetName: '',
        buildingNumber: '',
        postalCode: '',
        city: '',
        country: ''
    });
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const auth = AuthProvider();

    // ID z ciasteczka wyciągać

    useEffect(() => {
        const getDirectorProfile = async () => {
            try {
                const response = await axios.get('https://localhost:44345/api/director/profile', { headers: auth });
                setDirector(response.data);
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
        getDirectorProfile();
    }, []);

    return (
        <>
            <Routes>
                <Route index element={<DisplayDirectorProfile
                    director={director} />} />
                <Route path="change_password" element={<ChangeDirectorProfilePassword
                    director={director} />} />
            </Routes>
        </>
    )
}

export default DirectorProfile