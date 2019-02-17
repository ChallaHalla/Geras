import React from 'react';
import { Link } from 'react-router-dom';
// import './NavBar.css';

function NavBar(currentPage) {
  return (
    <nav className='navbar is-light'>
      <div className='navbar-brand'>
        <h1 className='navbar-item'>Geriactive</h1>
      </div>
      <div className='navbar-end'>
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

      <img src='' alt='Logo' style={{ display: 'none' }} />
    </nav>
  );
}
export default NavBar;
