import React from 'react';
import './NavBar.css';

function NavBar(currentPage) {
  return (
    <div className='navBar'>
      <a href='/events'>Events Page</a>
      <a href='/vote'> Vote Page</a>
      <img src='' alt='Logo' style={{ display: 'none' }} />
    </div>
  );
}
export default NavBar;
