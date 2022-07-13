import React, { Component, useEffect, useState } from 'react';
import Header from '../../header/header';
import Sidebar from '../../sidebar/Sidebar';
import profile from '../../images/profile.png';
import { Card, Body, Img, Button, Title, Text, Form } from 'react-bootstrap';

import groupStyles from './Group.module.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Group() {

    const history = useHistory();
    const id = localStorage.getItem('id');
    const [groupName, setGroupName] = useState("");
    const [groupLeaderName, setgroupLeaderName] = useState("");
    const [groupLeaderId, setgroupLeaderId] = useState("");
    const [memberTwoName, setmemberTwoName] = useState("");
    const [memberTwoId, setmemberTwoId] = useState("");
    const [memberThreeName, setmemberThreeName] = useState("");
    const [memberThreeId, setmemberThreeId] = useState("");
    const [memberFourName, setmemberFourName] = useState("");
    const [memberFourId, setmemberFourId] = useState("");


    function onSubmit(e) {
        e.preventDefault();

        const newGroup = {
            groupName,
            groupLeaderName,
            groupLeaderId,
            memberTwoName,
            memberTwoId,
            memberThreeName,
            memberThreeId,
            memberFourName,
            memberFourId
        }

        axios.post("http://localhost:8000/api/group/post", newGroup).then((res) => {
            alert("Group Created")
            localStorage.setItem('groupId', res.data.student._id);
            localStorage.setItem('groupLeaderId', res.data.student.groupLeaderId);
            history.push('/viewGroups');
        }).catch((error) => {
            alert(error);
        })
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
                        <div className={groupStyles.header}>
                            <h1>Create Group</h1>
                            <div className={groupStyles.mainForm}>
                                <form onSubmit={onSubmit}>
                                    <div className="form-group">
                                        <h4>Only Leader should be fill this form</h4>
                                        <label for="groupName">Group Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Group Name"
                                            onChange={(e) => {
                                                setGroupName(e.target.value);
                                            }} />
                                    </div>
                                    <div className="form-group">
                                        <label for="groupLeaderName">Group Leader Name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Group Leader Name"
                                            onChange={(e) => {
                                                setgroupLeaderName(e.target.value);
                                            }} />
                                    </div>
                                    <div className="form-group">
                                        <label for="groupLeaderId">Group Leader Id</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Group Leader Id"
                                            onChange={(e) => {
                                                setgroupLeaderId(e.target.value);
                                            }} />
                                    </div>
                                    <div className={groupStyles.membersDetail}>
                                        <h3>Group Members</h3>
                                        <div className={groupStyles.membersDetails}>
                                            <div className="form-group">
                                                <label for="memberTwoName">Member 2(Name):</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Member 2(Name)"
                                                    onChange={(e) => {
                                                        setmemberTwoName(e.target.value);
                                                    }} />
                                            </div>
                                            <div className="form-group">
                                                <label for="memberTwoId">Member 2(Id):</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Member 2(Id)"
                                                    onChange={(e) => {
                                                        setmemberTwoId(e.target.value);
                                                    }} />
                                            </div>
                                            <div className="form-group">
                                                <label for="memberThreeName">Member 3(Name):</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Member 3(Name)"
                                                    onChange={(e) => {
                                                        setmemberThreeName(e.target.value);
                                                    }} />
                                            </div>
                                            <div className="form-group">
                                                <label for="memberThreeId">Member 3(Id):</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Member 3(Id)"
                                                    onChange={(e) => {
                                                        setmemberThreeId(e.target.value);
                                                    }} />
                                            </div>
                                            <div className="form-group">
                                                <label for="memberFourName">Member 4(Name):</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Member 4(Name)"
                                                    onChange={(e) => {
                                                        setmemberFourName(e.target.value);
                                                    }} />
                                            </div>
                                            <div className="form-group">
                                                <label for="memberFourId">Member 4(Id):</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Member 4(Id)"
                                                    onChange={(e) => {
                                                        setmemberFourId(e.target.value);
                                                    }} />
                                            </div>
                                        </div>


                                    </div>
                                    <div className={groupStyles.submitButton}>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>

                                </form>

                            </div>
                            <div className={groupStyles.groups}>
                                <a href='/viewGroups' className='btn btn-primary'>View Registered Groups</a>
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Group;