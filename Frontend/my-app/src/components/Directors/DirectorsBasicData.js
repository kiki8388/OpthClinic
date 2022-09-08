import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import DisplayDirectorsBasicData from './DisplayDirectorsBasicData';
import { useCookies } from 'react-cookie';
import AuthProvider from '../Auth/AuthProvider';

const DirectorsBasicData = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const auth = AuthProvider();
  const [directors, setDirectors] = useState([]);

  useEffect(() => {
    const fetchDirectors = async () => {
      try {
        const response = await axios.get('https://localhost:44345/api/basic_data/all_directors', { headers: auth });
        setDirectors(response.data);
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
    fetchDirectors();
  }, [])

  return (
    <>
      <Routes>
        <Route index element={<DisplayDirectorsBasicData directors={directors} />} />
      </Routes>
    </>
  )
}

export default DirectorsBasicData
