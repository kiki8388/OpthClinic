import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import DisplayNursesBasicData from './DisplayNursesBasicData';
import { useCookies } from 'react-cookie';
import AuthProvider from '../Auth/AuthProvider';

const NursesBasicData = () => {

  const [nurses, setNurses] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const auth = AuthProvider();

  useEffect(() => {
    const fetchNurses = async () => {
      try {
        const response = await axios.get('https://localhost:44345/api/basic_data/all_nurses', { headers: auth });
        setNurses(response.data);
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
    fetchNurses();
  }, [])

  return (
    <>
      <Routes>
        <Route index element={<DisplayNursesBasicData nurses={nurses} />} />
      </Routes>
    </>
  )
}

export default NursesBasicData
