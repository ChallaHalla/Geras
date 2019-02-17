import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';


function NavBar(currentPage) {
  return (
    <nav className='navbar is-dark is-fixed-top'>
      <div
        className='navbar-start navbar-brand'
        style={{ justifyContent: 'flex-start', marginRight: 'auto' }}
      >
        <img src={'/img/logo.png'} className='navbar-item' style = {{height: '70px', marginTop: '8px'}} alt='Logo' />
      </div>
      <div
        className='navbar-end'
        style={{ justifyContent: 'flex-end', marginLeft: 'auto' }}
      >
        <div className='navbar-item'>
          <div className='buttons'>
            <Link className='button is-link' to='/events'>
              Events Page
            </Link>
            <Link className='button is-link' to='/vote'>
              Vote Page
            </Link>
          </div>
        </div>
      </div>

      
    </nav>
  );
}
export default NavBar;
