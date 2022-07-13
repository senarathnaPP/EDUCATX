import React, { Component } from 'react';

import logo from '../images/logo1.png';

function Header() {
    return (
        <div className='header'>
            <img src={logo} />
            <a href='/login'>
            <button className="header-logout-button" style={{marginLeft:'1000px'}}>Logout</button>
            </a>
        </div>

    )
}

export default Header;