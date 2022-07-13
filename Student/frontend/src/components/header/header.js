import axios from 'axios';
import React, { Component, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


import student from '../images/std2.jpg';

function Header() {



    const id = localStorage.getItem('id');
    const history = useHistory();

    const [studentName, setStudentName] = useState("");
    const [studentId, setStudentId] = useState("");

    const [logStaffUser, setLogUser] = useState('');
    const [logStatus, setlogStatus] = useState('');
    const [logUseName, setloguserName] = useState('');


    useEffect(() => {

        const logStaff = sessionStorage.getItem('LogUserId')
        setLogUser(logStaff);

        const logStatus = sessionStorage.getItem('LogUserType') == 'st' ? true : false
        setlogStatus(logStatus)

        const logUsername = sessionStorage.getItem('LogUserName')
        setloguserName(logUsername)

        axios.get(`http://localhost:8000/api/student/get/${id}`).then((res) => {

            setStudentName(res.data.studentName);
            setStudentId(res.data.studentId);
        }).catch((error) => {
            console.log(error)
        });
    })



    const itnum = localStorage.getItem('studentId');

    console.log(logStatus)
    console.log()

    function logOut() {

        history.replace('/mainLogin')
    }

    return (
        <div className='header'>
            <img src={student} />


            {logStatus ? <><h5 style={{ color: 'white', marginLeft: '870px', marginTop: '1.3rem' }}>{logStaffUser}{logUseName}</h5><button className="header-logout-button">Logout</button></>


                :

                <><h3 style={{ color: 'white', marginLeft: '870px', marginTop: '1rem' }}>{studentName}({studentId})</h3><button onClick={logOut} className="header-logout-button">Logout</button></>



            }


        </div>

    )
}


export default Header;