import React from 'react'
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import ChangeNurseProfilePassword from './ChangeNurseProfilePassword';
import DisplayNurseProfile from './DisplayNurseProfile';
import { useCookies } from 'react-cookie';
import AuthProvider from '../Auth/AuthProvider';

const NurseProfile = () => {
    const [nurse, setNurse] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const auth = AuthProvider();
    // ID z ciasteczka wyciągać

    useEffect(() => {
        const getNurseProfile = async () => {
            try {
                const response = await axios.get('https://localhost:44345/api/nurse/profile', { headers: auth });
                setNurse(response.data);
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
        getNurseProfile();
    }, []);

    return (
        <>
            <Routes>
                <Route index element={<DisplayNurseProfile
                    nurse={nurse} />} />
                <Route path="change_password" element={<ChangeNurseProfilePassword
                    nurse={nurse} />} />
            </Routes>
        </>
    )
}

export default NurseProfile