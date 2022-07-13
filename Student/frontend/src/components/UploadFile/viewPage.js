import React, { Component } from 'react';
import Header from '../header/header';
import Sidebar from '../sidebar/Sidebar';
import uploadImg from '../images/upload.jpg';
import viewCss from './viewPage.module.css';

function viewUploadPage() {
    return (
        <div>


            <div className='app-header'>
                <Header />
            </div>
            <div className='app-body'>
                <div className='body-wrapper'>
                    <div className='app-sidebar'>
                        <Sidebar />
                    </div>
                    <div className='app-content'>
                        <div className={viewCss.blogPost}>
                            <div className={viewCss.blogPostImg}>
                                <img src={uploadImg} />
                            </div>
                            <div className={viewCss.blogPostInfo}>
                                <div className={viewCss.blogPostDate}>
                                    <span>Submit Hear</span>

                                </div>
                                <h1 className={viewCss.blogPostTitle}>Submittion</h1>
                                <a href='/uploadfile'><button className='btn btn-dark'>Click hear to Submit your document</button></a>

                            </div>



                        </div>


                    </div>
                </div>
            </div>
        </div>


    )
}

export default viewUploadPage;