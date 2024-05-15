import React, { useState } from 'react';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn } from '../actions';
import { Navigate } from 'react-router-dom';

function Navbar() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(setLoggedIn(false)); 
    navigate('/login');
  };

  return (
    <div className="navbar-wrapper" style={{ width: sidebarVisible ? '200px' : '40px' }}>
      <div className="navbar">
        {!sidebarVisible && (
          <div className='logo'>
            <FaLongArrowAltRight className='slide' onClick={toggleSidebar}/>
          </div>
        )}
        {sidebarVisible && (
          <div className='logo'>
            <button className='home'>
              <Link to="/home">Spotiflix</Link>
              </button>
            <FaLongArrowAltLeft className='slide' onClick={toggleSidebar} style={{ visibility: sidebarVisible ? 'visible' : 'hidden' }}></FaLongArrowAltLeft>
          </div>
        )}
        {sidebarVisible && (
          <>
            {isLoggedIn && (
              <button onClick={handleLogout}>Déconnexion</button>
            )}
            {isLoggedIn && (
              <button className='home'>
                <Link to="/fav">Musiques Favorites</Link>
              </button>
            )}
            {isLoggedIn && (
              <button className='home'>
                <Link to="/dashboard">dashboard</Link>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
