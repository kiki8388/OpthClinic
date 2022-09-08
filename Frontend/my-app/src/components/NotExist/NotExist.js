import React from 'react'
import NavBarDoctor from '../NavBar/NavBarDoctor';
import NavBarPatient from '../NavBar/NavBarPatient';
import NavBar from '../NavBar/NavBar';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const NotExist = () => {

  const path = window.location.pathname.split('/');
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const navigate = useNavigate();

  function ShowNavBar(path) {
    if ((path[1] == "patient"))
        return <NavBarPatient />;
    else if ((path[1] == "doctor"))
        return <NavBarDoctor />;
    else
        return <NavBar />;
}

  return (
    <>
      {cookies.jwt &&
        <>
          {ShowNavBar(path)}
          <div className='NotExist'><b>Not Found 404</b></div>
        </>
      }
      {!cookies.jwt &&
        <>
          {navigate("/")};
        </>
      }
    </>
  )
}

export default NotExist