import axios from 'axios';
import React, { Component, useState } from 'react';
import { Card } from 'react-bootstrap';
import Header from '../header/header';
import Sidebar from '../sidebar/Sidebar';

import viewStyles from './viewGroup.module.css';

function ViewGroup() {

    const groupId = localStorage.getItem('groupId');
    const id = localStorage.getItem('id');
    const [groupLeaderId, setgroupLeaderId] = useState('');
    const [studentGroup, setStudentGroup] = useState([]);
    const [status, setStatus] = useState(false);


    function handleSubmit(e) {
        e.preventDefault();


        axios.get(`http://localhost:8000/api/group/getbyLeader/${groupLeaderId}`).then((res) => {
            setStudentGroup(res.data);
            localStorage.setItem('leaderId', groupLeaderId);
            if (studentGroup.length === 0 || (!(groupLeaderId) === res.data.groupLeaderId)) {
                setStatus(false);

            } else {
                setStatus(true);
            }
        }).catch((error) => {
            console.log(error)
        });



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
                        <div className={viewStyles.mainform}>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label for="groupLeaderId">Group Leader ID:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Group Leader ID"
                                        onChange={(e) => {
                                            setgroupLeaderId(e.target.value);
                                        }} />
                                </div>
                                <div className={viewStyles.submitButton} >
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                            <div className={viewStyles.views}>
                                {status ? <>
                                    <div className={viewStyles.card}>
                                        <div className={viewStyles.cardimage}>
                                        </div>
                                        <div className={viewStyles.cardtext}>
                                            <h1>Group Name:<span>{studentGroup.groupName}</span></h1>
                                            <h5>Group Leader Name:<span>{studentGroup.groupLeaderName}</span></h5>
                                            <h5>Group Leader Id:<span>{studentGroup.groupLeaderId}</span></h5>
                                            <h5>Group Member 01(Name):<span>{studentGroup.memberTwoName}</span></h5>
                                            <h5>Group Member 01(ID):<span>{studentGroup.memberTwoId}</span></h5>
                                            <h5>Group Name:<span>{studentGroup.memberThreeName}</span></h5>
                                            <h5>Group Name:<span>{studentGroup.memberThreeId}</span></h5>
                                            <h5>Group Name:<span>{studentGroup.memberFourName}</span></h5>
                                            <h5>Group Name:<span>{studentGroup.memberFourId}</span></h5>
                                        </div>
                                        <div className={viewStyles.cardstat}>
                                            <a href='/topic'><button className='btn btn-primary'>Register A Topic</button></a>
                                        </div>

                                    </div>

                                </>
                                    :
                                    <>
                                        <div class="alert alert-primary" role="alert">
                                            Nothing To Display
                                        </div></>}
                            </div>





                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ViewGroup;