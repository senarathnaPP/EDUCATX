import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


import { SidebarData } from './SidebarData';
import { SidebarDataStaff } from './SidebarDataStaff';

function Sidebar() {



    const [logStatus, setlogStatus] = useState('');

    useEffect(() => {



        const logStatus = sessionStorage.getItem('LogUserType') == 'st' ? true : false
        setlogStatus(logStatus)




    });


    return (
        <div className='sidebar'>
            <ul className='sidebarList'>


                {logStatus ? SidebarDataStaff.map((val, key) => {
                    return (
                        <li className='row' key={key}>
                            <Link to={val.Link}>
                                <i>
                                    {val.icon}
                                </i>
                                <span>{val.title}</span>
                            </Link>

                        </li>

                    );
                }) :


                    SidebarData.map((val, key) => {
                        return (
                            <li className='row' key={key}>
                                <Link to={val.Link}>
                                    <i>
                                        {val.icon}
                                    </i>
                                    <span>{val.title}</span>
                                </Link>

                            </li>

                        );
                    })


                }


            </ul>

        </div>
    )
}

export default Sidebar;