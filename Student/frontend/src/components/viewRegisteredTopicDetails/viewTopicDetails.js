import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import Header from '../header/header';
import Sidebar from '../sidebar/Sidebar';

function viewTopicDetails() {

    const [details, setDetails] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/topic/registerTopic").then((res) => {
            setDetails(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    console.log(details.groupName);

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
                        <h3>Groups and Topics</h3>
                        <table class="table table-dark">
                            <thead>
                                <tr>
                                    <th >#</th>
                                    <th>Group Name</th>
                                    <th >Research Field</th>
                                    <th >Research Topic</th>
                                    <th >Supervisor</th>
                                    <th >Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {details.map((value, key) => (

                                    <tr>
                                        <td >{++key}</td>
                                        <td>{value.groupName}</td>
                                        <td>{value.researchField}</td>
                                        <td>{value.researchTopic}</td>
                                        <td>{value.supervisor}</td>
                                        <td style={{ color: "Orange" }}>{value.status}</td>
                                    </tr>


                                ))}
                            </tbody>

                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default viewTopicDetails;