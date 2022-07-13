import assert from 'assert';
import axios from 'axios';
import React, { Component, Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/header';
import Sidebar from '../sidebar/Sidebar';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import uploadCss from './uploads.module.css';


function UploadFile() {

    const [data, setData] = useState({
        groupName: '',
        file: ''
    });
    const [singleProgressBar, setsingleProgressBar] = useState(0);
    const [bData, setBData] = useState();

    useEffect(() => {
        axios.get("http://localhost:8000/api/student/submissions/get").then((res) => {
            setBData(res.data)
        }).catch((err) => {
            console.log(err)
        })
    })

    const handleChange = name => e => {
        const value = name === 'file' ? e.target.files[0] : e.target.value;
        setData({ ...data, [name]: value });
    }


    const singleFileOption = {
        onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setsingleProgressBar(percentage)
        }
    }

    const handleSubmit = async () => {
        try {
            let formData = new FormData();
            formData.append('groupName', data.groupName);
            formData.append('file', data.file);

            axios.post("http://localhost:8000/api/student/submissions/add", formData, singleFileOption).then((res) => {
                if (res.ok) {
                    setData({ groupName: '', file: '' })
                }
                alert("Uploaded Successfully");
            })

            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            if (confirm("Do you really want to delete your profile?")) {
                axios.delete(`http://localhost:8000/api/student/submissions/${id}`).then((res) => {
                    if (res.ok) {
                        const updatedSubmission = bData.filter((sub) => sub._id !== id);
                        setBData(updatedSubmission);
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }

        } catch (error) {
            console.log(error)
        }
    }




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
                            <div className={uploadCss.main}>
                                <div className={uploadCss.form}>
                                    <h3>Submissions</h3>
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

                                    <button className='btn btn-danger' onClick={handleSubmit}>Upload</button>
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
                                <div className={uploadCss.files}>
                                    <h3>All Submittions</h3>
                                    <table class="table">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Group Name</th>
                                                <th scope="col" >Link</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {bData?.map((data, key) => (
                                                <tr>
                                                    <th scope="row">{++key}</th>
                                                    <td>{data.groupName}</td>
                                                    <td><a href={data.avatar} target="_blank" download  >Download </a></td>
                                                    <td>
                                                        <Link to={`/editSubmission/${data._id}`}>
                                                            <button className='btn btn-primary'>Edit</button>

                                                        </Link>
                                                        <button className='btn btn-danger' onClick={() => { handleDelete(data._id) }}>Delete</button>
                                                    </td>

                                                </tr>
                                            ))}


                                        </tbody>
                                    </table>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadFile;