import React, { Component, useEffect, useState } from 'react';
import Header from '../header/header';
import Sidebar from '../sidebar/Sidebar';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

function UploadSubmittion() {

    const history = useHistory();
    const params = useParams();

    const id = params.id;
    const [data, setData] = useState({
        groupName: '',
        file: ''
    });
    const [singleProgressBar, setsingleProgressBar] = useState(0);



    const singleFileOption = {
        onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setsingleProgressBar(percentage)
        }
    }

    const handleChange = name => e => {
        const value = name === 'file' ? e.target.files[0] : e.target.value;
        setData({ ...data, [name]: value });
    }

    const handleSubmit = async () => {
        try {
            let formData = new FormData();
            formData.append('groupName', data.groupName);
            formData.append('file', data.file);

            axios.put(`http://localhost:8000/api/student/submissions/update/${id}`, formData, singleFileOption).then((res) => {
                if (res.ok) {
                    setData({ groupName: '', file: '' })
                }
                alert("Uploaded Successfully");
                history.push('/uploadfile');
            })


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/student/submissions/get/${id}`).then((res) => {
            setData(res.data)
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <div>
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
                            <div >
                                <div >
                                    <h3>Update Submissions</h3>
                                    <label>Group Name :</label>
                                    <input
                                        type='text'
                                        name='groupName'
                                        placeholder='Enter Your Group Name'
                                        value={data.groupName}
                                        onChange={handleChange('groupName')}
                                    />
                                    <br /><br />


                                    <label>Select Your File</label>
                                    <input
                                        type='file'
                                        name='file'
                                        className='form-control'
                                        onChange={handleChange('file')}
                                    />

                                    <button className='btn btn-danger' onClick={handleSubmit} >Upload</button>
                                    <div className='col-2'>
                                        <CircularProgressbar
                                            value={singleProgressBar}
                                            text={`${singleProgressBar}%`}
                                            styles={buildStyles({
                                                rotation: 0.25,
                                                strokeLinecap: 'butt',
                                                pathTransitionDuration: 0.5,
                                                pathColor: `rgba(255,136,136,${singleProgressBar / 100})`,
                                                textColor: '#f88',
                                                trailColor: '#d6d6d6',
                                                backgroundColor: '#3e98c7'

                                            })}
                                        />
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadSubmittion;