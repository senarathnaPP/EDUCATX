import React, { Component, useState } from 'react';
import Header from '../../header/header';
import Sidebar from '../../sidebar/Sidebar';

import './Home.module.css';

const logEmail = sessionStorage.getItem('LogUserId')
console.log(logEmail)
const logn = sessionStorage.getItem('LogUserType')
console.log(logn)




function staffHome() {


   

    return (
        <div className='main-wrapper'>
            <div className='app-header'>
                <Header  />
            </div>
            <div className='app-body'>
                <div className='body-wrapper'>
                    <div className='app-sidebar'>
                        <Sidebar />
                    </div>
                    <div className='app-content'>
                        <div className='homeMain'>
                            <h1>Welcome to Topic Selection</h1>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default staffHome;