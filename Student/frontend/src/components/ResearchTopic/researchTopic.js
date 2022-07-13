import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../header/header';
import Sidebar from '../sidebar/Sidebar';

import topicCss from './researchTopic.module.css';

function ResearchTopic() {

    const history = useHistory();
    const groupLeaderId = localStorage.getItem('leaderId');


    const [researchField, setResearchField] = useState("");
    const [researchTopic, setResearchTopic] = useState('');
    const [supervisor, setSup] = useState('');

    const [supervisors, setSupervisor] = useState([]);

    const [groupDetails, setGroupDetails] = useState([]);

    const [topics, setTopics] = useState([]);


    const groupName = groupDetails.groupName;

    useEffect(() => {



        // Get Group Details
        axios.get(`http://localhost:8000/api/group/getbyLeader/${groupLeaderId}`).then((res) => {
            setGroupDetails(res.data);
        }).catch((error) => {
            console.log(error)
        });


        //get All Supervisors
        axios.get('http://localhost:8000/api/staffRegister/supervisor').then((res) => {
            setSupervisor(res.data.data);
        }).catch((error) => {
            console.log(error)
        });



    }, [])

    function handleresearchField(event) {

        if (event.target.value === 'IT') {
            setResearchField('IT')
            console.log("IT Field");
            axios.get("http://localhost:8000/api/topics/getIT").then((res) => {
                setTopics(res.data.existingTopics);

            }).catch((error) => {
                console.log(error);
            })
        } else if (event.target.value === 'SE') {
            setResearchField('SE')
            console.log("SE Field");
            axios.get("http://localhost:8000/api/topics/getSE").then((res) => {
                setTopics(res.data.existingTopics);

            }).catch((error) => {
                console.log(error);
            })
        } else if (event.target.value === 'CS') {
            setResearchField('CS')
            console.log("CS Field");
            axios.get("http://localhost:8000/api/topics/getCS").then((res) => {
                setTopics(res.data.existingTopics);

            }).catch((error) => {
                console.log(error);
            })
        } else {
            setResearchField('CSNE')
            console.log("CSNE Field");
            axios.get("http://localhost:8000/api/topics/getCSNE").then((res) => {
                setTopics(res.data.existingTopics);

            }).catch((error) => {
                console.log(error);
            })
        }
    }

    function handleSupervisor(event) {
        setSup(event.target.value);
    }

    function handleResearchTopic(event) {
        setResearchTopic(event.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();

        const regTopic = {
            groupName,
            researchField,
            researchTopic,
            supervisor

        }

        console.log(regTopic)

        axios.post("http://localhost:8000/api/topic/registerTopic", regTopic).then((res) => {
            if (res.data.status === "Student Group Already exist") {
                alert("Student Group Already exist");
            } else {
                alert("Topic Registered");
            }

        }).catch((error) => {
            console.log(error)
        })


    }

    return (
        <div data-testid="topic" className='main-wrapper'>
            <div className='app-header'>
                <Header />
            </div>
            <div className='app-body'>
                <div className='body-wrapper'>
                    <div className='app-sidebar'>
                        <Sidebar />
                    </div>
                    <div className='app-content'>
                        <h1>Selecting Topic</h1>
                        <div className={topicCss.mainPage}>
                            <div className={topicCss.topicForm}>
                                <form onSubmit={onSubmit}>
                                    <div className="form-group">
                                        <label for="groupName">Group Name</label>
                                        <input type="text" className="form-control" value={groupDetails.groupName} disabled aria-describedby="emailHelp" placeholder="Enter email" />
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputPassword1">Research Field</label>
                                        <select className="form-control" onChange={handleresearchField}>
                                            <option>...Choose</option>
                                            <option >IT</option>
                                            <option >SE</option>
                                            <option >CSNE</option>
                                            <option >CS</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label for="groupName">Research Topic</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Research Topic"
                                            onChange={handleResearchTopic} />
                                    </div>
                                    <div className="form-group">
                                        <label for="groupName">Supervisor</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Supervisor"
                                            onChange={handleSupervisor} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                            <div className={topicCss.supervisors}>
                                <h2>Supervisors</h2>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Sup Name</th>
                                            <th scope="col">Field</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {supervisors.map((value, key) => (


                                            <tr>
                                                <td >{++key}</td>
                                                <td>{value.stfName}</td>
                                                <td>{value.stfResField}</td>
                                            </tr>

                                        ))}
                                    </tbody>



                                </table>
                            </div>
                            <div className={topicCss.topics}>
                                <h2>Topics</h2>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Topics</th>
                                            <th scope="col">Field</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topics.map((value, key) => (


                                            <tr>
                                                <td >{++key}</td>
                                                <td>{value.topic}</td>
                                                <td>{value.researchField}</td>
                                            </tr>

                                        ))}
                                    </tbody>



                                </table>
                            </div>
                        </div>
                        <div className={topicCss.footer}>
                            <div>
                                <a href='/viewRegDetails'><button className='btn btn-dark'>View Details</button></a>
                            </div>
                            <div>
                                <button className='btn btn-light' onClick={() => history.push('/studentMsg')}>Chat With Supervisors</button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
};
export default ResearchTopic;