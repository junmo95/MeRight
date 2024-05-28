import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';

import { FaBars } from 'react-icons/fa';
import { getCookie, removeCookie } from '../../page/user/cookie';
import Swal from 'sweetalert2';


// import { useCookies } from 'react-cookie';

function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [dropdown, setDropdown] = useState(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(true);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  //로그인,로그아웃
  const handleLogout = () => {
    removeCookie('access_token'); 
    removeCookie('user_id');
    removeCookie('username');
    Swal.fire({
      title : 'Logout Success',
      text : '로그아웃을 성공하였습니다.',
      icon : 'success'
    })
    document.location.href="/";
  }

  return (
    <div>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <b>Me</b>:Right
        </Link>

        <div className='menu-icon' onClick={handleClick}>
          <i className='click'><FaBars /></i>
        </div>

        <ul className={click ? 'nav-menu active' : 'nav-menu'}>

          <li className='nav-item' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Link to='#' className='nav-links' onClick={closeMobileMenu}>
              Services ▼
            </Link>
            {dropdown && <Dropdown />}
          </li>

          <li className='nav-item'>
            <Link to='/board' className='nav-links' onClick={closeMobileMenu}>
              Board
            </Link>
          </li>

          {
          getCookie("access_token") != null ? (

            <>
              <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={handleLogout}>
                  Logout
                </Link>
              </li>
          
              <li className='nav-item'>
                <Link to='/mypage' className='nav-links' onClick={closeMobileMenu}>
                  MyPage
                </Link>
              </li>
            </>

          ) : (
            <>
              <li className='nav-item'>
                <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
                  Login
                </Link>
              </li>

              <li className='nav-item'>
                <Link to='/signup' className='nav-links' onClick={closeMobileMenu}>
                  Sign-up
                </Link>
              </li>
            </>
          )
        }
        </ul>
      </nav>        
    </div>
  )
};

export default Navbar;
