import React, { Component, useEffect, useState } from 'react';
import Header from '../header/header';
import Sidebar from '../sidebar/Sidebar';
import { useHistory } from 'react-router-dom';
import profile from '../images/profile.png';

import profileCss from './profile.module.css';

import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';





function Profile() {
    const id = localStorage.getItem('id');
    const history = useHistory();

    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/student/get/${id}`).then((res) => {
            setStudents(res.data);
        }).catch((error) => {
            console.log(error)
        })
    })

    function deleteStudent(id) {
        axios.delete(`http://localhost:8000/api/student/delete/${id}`).then((res) => {
            alert(res.data.status)
        }).catch((error) => {
            console.log(error)
        })

        history.push('/mainLogin')
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
                            <Card style={{ width: '22rem', marginLeft: "120%", backgroundColor: "darkgray", boxShadow: '0 1rem 1.4rem rgba(0, 0, 0, 1)' }}>
                                <Card.Img style={{ marginLeft: '20%' }} variant="top" src={profile} />
                                <Card.Body>
                                    <Card.Title style={{ textAlign: 'center' }}>Hi {students.studentName}</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Student Name:<span>{students.studentName}</span></ListGroupItem>
                                    <ListGroupItem>Student Id:<span>{students.studentId}</span></ListGroupItem>
                                    <ListGroupItem>Student Email:<span>{students.email}</span></ListGroupItem>
                                    <ListGroupItem>Student Gender:<span>{students.gender}</span></ListGroupItem>
                                </ListGroup>
                                <Card.Body>
                                    <Card.Link href='/update' className='btn btn-primary'>Update Profile</Card.Link>
                                    <Card.Link href="#" className='btn btn-danger' onClick={() => {
                                        deleteStudent(localStorage.getItem('id'))
                                    }}>Delete Profile</Card.Link>
                                </Card.Body>
                            </Card>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;