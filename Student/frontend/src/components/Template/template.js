import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import Header from '../header/header';
import Sidebar from '../sidebar/Sidebar';
import gif from '../images/download.gif';
import tempStyle from './template.module.css';

function Template() {

    const [data, setData] = useState();

    useEffect(() => {
        axios.get("http://localhost:8000/template/").then((res) => {
            setData(res.data)
        })
    }, {})

    console.log(data);
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
                        <div className={tempStyle.mainPage}>
                            <h2>Download Templates</h2>
                            <div className={tempStyle.cards}>
                                {data?.map((value) => (
                                    <Card style={{ width: '10rem', boxShadow: '0 1rem 1rem rgba(0, 0, 0, 1)', borderRadius: '10px', marginRight: '2rem' }}>
                                        <Card.Img variant="top" src={gif} />
                                        <Card.Body>
                                            <Card.Title>{value.name}</Card.Title>
                                            <a href={value.avatar} target="_blank" download  ><Button variant="primary">Download</Button></a>

                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>


                        </div>
                    </div>
                </div>

            </div>

        </div>


    )
}

export default Template;