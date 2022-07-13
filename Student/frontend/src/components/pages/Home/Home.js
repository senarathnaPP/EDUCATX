import React, { Component, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import Header from '../../header/header';
import Sidebar from '../../sidebar/Sidebar';

import image1 from '../../images/img1.jpg';
import image2 from '../../images/img2.jpg';
import image3 from '../../images/img3.jpg';

import page from './Home.module.css';
import { useHistory } from 'react-router-dom';

// import jwt_decode from 'jwt_decode';

function Home() {

    const history = useHistory();

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
                        <div className={page.page}>
                            <Carousel variant="dark" style={{ marginLeft: '8rem' }}>
                                <Carousel.Item >
                                    <img style={{ height: '40rem' }}
                                        className="d-block w-100"
                                        src={image1}
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>
                                        <h5>Let's Start</h5>
                                        <button className='btn btn-primary' onClick={() => history.push('/group')}>Click here to Create Group</button>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={image2}
                                        alt="Second slide"
                                    />
                                    <Carousel.Caption>
                                        <h5>Second slide label</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;