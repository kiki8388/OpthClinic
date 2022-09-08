import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import DisplayDirectors from './DisplayDirectors';
import DisplayDirector from './DisplayDirector';
import AddDirector from './AddDirector';
import ChangeDirectorPassword from './ChangeDirectorPassword';
import { useCookies } from 'react-cookie';
import AuthProvider from '../Auth/AuthProvider'

const Directors = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const auth = AuthProvider();
  const [directors, setDirectors] = useState([]);
  const [directorData, setDirectorData] = useState({
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

  useEffect(() => {
    const fetchDirectors = async () => {
      try {
        const response = await axios.get('https://localhost:44345/api/all_directors', { headers: auth });
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
        <Route index element={<DisplayDirectors directors={directors} />} />
        <Route path=":id" element={<DisplayDirector
          directors={directors} />} />
        <Route path="register" element={<AddDirector
          directorData={directorData}
          setDirectorData={setDirectorData}
        />} />
        <Route path=":id/change_password" element={<ChangeDirectorPassword
          directors={directors} />} />
      </Routes>
    </>
  )
}

export default Directors
