import React, { Component, useEffect, useState } from 'react';
import Header from '../header/header';
import Sidebar from '../sidebar/Sidebar';
import profileCss from './updateStudent.module.css';

import { useHistory } from 'react-router-dom'

import axios from 'axios';

function UpdateStudent() {

    const history = useHistory();
    const id = localStorage.getItem('id');
    const [studentName, setStudentNames] = useState("");
    const [studentId, setStudentId] = useState("");
    const [email, setStudentEmail] = useState("");
    const [gender, setStudentGender] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8000/api/student/get/${id}`).then((res) => {
            setStudentNames(res.data.studentName);
            setStudentId(res.data.studentId);
            setStudentEmail(res.data.email);
            setStudentGender(res.data.gender);


        }).catch((error) => {
            alert(error)
        })
    }, [])

    function handleSubmit(e) {
        e.preventDefault();

        const newStudent = {
            studentName,
            studentId,
            email,
            gender
        }

        console.log(newStudent);


        axios.put(`http://localhost:8000/api/student/update/${id}`, newStudent).then(() => {
            alert("Student Updated")
            history.push('/profile')
        }).catch((error) => {
            alert(error);
        });



    }

    function handleName(e) {
        setStudentNames(e.target.value)
    }
    function handleId(e) {
        setStudentId(e.target.value)
    }
    function handleEmail(e) {
        setStudentEmail(e.target.value)
    }
    function handleGender(e) {
        setStudentGender(e.target.value)
    }



    return (
        <div className='main-wrapper'>
            <div className='app-header'>
                <Header />
            </div>
            <div className='app-body'>
                <div className='body-wrapper'>
                    <div className='app-sidebar'>
                        <Sidebar />
                    </div>
                    <div className='app-content'>
                        <div className={profileCss.main}>

                            <h2>Update Profile</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label for="studentName">Student Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id='studentName'
                                        placeholder="Enter Student Name"
                                        value={studentName}
                                        onChange={handleName}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="studentId">Student Id</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={studentId}
                                        onChange={handleId}
                                        placeholder="Password"
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="email">Student Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={email}
                                        onChange={handleEmail}
                                        placeholder="Password" />
                                </div>
                                <div className="form-group">
                                    <label for="gender">Student Gender</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={gender}
                                        onChange={handleGender}
                                        placeholder="Password" />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateStudent;