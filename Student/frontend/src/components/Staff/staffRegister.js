import React, { Component } from 'react';
import { Link, useHistory } from 'react-router-dom'
import loginStyles from './staff.module.css'

import axios from 'axios';
import { useState } from 'react';

function staffRegister() {

    const [data, setData] = useState({
        stfStaffId: "",
        stfName: "",
        stfEmail: "",
        stfPhonenNmber: "",
        stfJobRole: "",
        stfPanellMember: "N",
        stfResField: "",
        stfUserActive: "",
        stfUserPassword: "",

        stfUserQ1: "",
        stfUserQ2: ""

    })

    const [loginData, setLoginData] = useState({

        MainStaffId: '',
        MainstfUserPassword: ''

    })

    const [rePassword, setReEnterdPassword] = useState("");
    const [loginStatus, settLoginStatus] = useState(false)


    const [reserchFields, setreserchfields] = useState(['IT','CSNE','CS','SE']);

        // const [reserchFields, setreserchfields] = useState(['Artificial Intelligence',
        // ' Computational & Synthetic Biology',
        // 'Computer Architecture',
        // 'Computer Graphics, Vision, Animation, and Game Science',
        // 'Computing for Development',
        // 'Data Science',
        // 'Data Management and Visualization',
        // 'Human Computer Interaction',
        // 'Machine Learning',
        // 'Molecular Information Systems',
        // 'Natural Language Processing',
        // 'Programming Languages and Software Engineering',
        // 'Robotics',
        // 'Security and Privacy',
        // 'Systems and Networking',
        // 'Theory of Computation',
        // 'Ubiquitous Computing',
        // ' Wireless and Sensor Systems',
        // 'Cloud Computing']);


    console.log(loginData)

    const history = useHistory();
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
      
    }

    const handleChangeLogin = ({ currentTarget: input }) => {
        setLoginData({ ...loginData, [input.name]: input.value })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(rePassword)

        if (rePassword == data.stfUserPassword) {
            setData({ ...data, ['stfUserActive']: "Y" })

            try {
                const url = 'http://localhost:8000/api/staffRegister/post';
                axios.post(url, data).then((res) => {
                    if (res.status == "200") {
                        alert(res.data.message);
                        history.push('/mainLogin');
                    } else {
                        alert(res.data.message);
                    }
                }).catch((err) => {
                    console.log(err)
                });

                console.log(res.message);
            } catch (error) {

            }

        } else {

            console.log("not matching 2")
        }



    }


    const handleSubmitLogin = (e) => {
        e.preventDefault();

        try {
            const url = 'http://localhost:8000/api/mainstaffRegister/login';
            axios.post(url, loginData).then((res) => {
                console.log(res)
                if (res.status == "200") {
                    
                    settLoginStatus(true);
                    alert(res.data.message);
                    setData({ ...data, ['stfStaffId']: res.data.data.MainStaffId })


                } else if(res.status == "404"){
                    console.log("else",res)
                    alert(res.data.message);
                }
            }).catch((err) => {
                console.log("ww",err)
            });

            console.log(res.message);
        } catch (error) {

        }

    }


    reserchFields.map((obj) =>{
        console.log(obj)
    })

   

    console.log(reserchFields)
    return (
        <div className={loginStyles.signup_container}>
            <div className={loginStyles.signupform_container}>
                <div className={loginStyles.left}>
                    <h1>Welcome Back</h1>
                    <Link to='/mainlogin'>
                        <button type='button' className={loginStyles.whiteButton}>
                            Sign in
                        </button>
                    </Link>
                </div>
                <div className={loginStyles.right} style={{ 'height': '500px', 'overflow': 'auto', 'display': 'block' }}>


                    {loginStatus ?
                        <form className={loginStyles.form_container} onSubmit={handleSubmit}>
                            <h1>Staff Registration</h1>
                            <input
                                type='text'
                                placeholder='Staff Id'
                                name='stfStaffId'
                                value={data.stfStaffId}
                                onChange={handleChange}
                                required
                                className={loginStyles.input}
                            />
                            <input
                                type='text'
                                placeholder='Name'
                                name='stfName'
                                value={data.stfName}
                                onChange={handleChange}
                                required
                                className={loginStyles.input}
                            />
                            <input
                                type='email'
                                placeholder='Email'
                                name='stfEmail'
                                value={data.stfEmail}
                                onChange={handleChange}
                                required
                                className={loginStyles.input}
                            />
                            <input
                                type='text'
                                placeholder='Phone Number'
                                name='stfPhonenNmber'
                                value={data.stfPhonenNmber}
                                onChange={handleChange}
                                required
                                className={loginStyles.input}
                            />
                            <select id="jobRole" name='stfJobRole' className={loginStyles.input} value={data.stfJobRole} onChange={handleChange}>
                                <option selected="selected">Job Role</option>
                                <option value="Superviosr">Supervisor </option>
                                <option value="Co-Superviosr">Co-Supervisor</option>

                            </select>



                            <input type="text" name='stfResField' list="reserch-field" value={data.stfResField} className={loginStyles.input} placeholder='Reserch Area' onChange={handleChange} />
                            <datalist id="reserch-field">
                                {reserchFields.map((obj) =>

                                    <option value={obj}>{obj}</option>
                                )}

                                {/* <option value="Cambridge">9</option> */}
                            </datalist>


                            <input
                                type='password'
                                placeholder='Password'
                                name='stfUserPassword'
                                value={data.stfUserPassword}
                                onChange={handleChange}
                                required
                                className={loginStyles.input}
                            />

                            {/* //........ */}

                            <input
                                type='password'
                                placeholder='Re Enter Password'
                                name='re-password'

                                onChange={(e) => {
                                    setReEnterdPassword(e.target.value);
                                }}
                                required
                                className={loginStyles.input}
                            />

                            <input
                                type='text'
                                placeholder='Question 1 : Favourit country to visite'
                                name='stfUserQ1'
                                value={data.stfUserQ1}
                                onChange={handleChange}
                                required
                                className={loginStyles.input}
                            />
                            <input
                                type='text'
                                placeholder='Question 2 : Favourit Sport '
                                name='stfUserQ2'
                                value={data.stfUserQ2}
                                onChange={handleChange}
                                required
                                className={loginStyles.input}
                            />

                            <button type='submit' className={loginStyles.greenBtn}>Sign Up</button>
                        </form>

                        : <form className={loginStyles.form_container_login} onSubmit={handleSubmitLogin}>
                            <h1>Login with Staff Id Number</h1>
                            <input
                            
                             
                                type='text'
                                placeholder='Staff Id eg: ST*******'
                                name='MainStaffId'
                                value={(data.MainStaffId)}
                                onChange={handleChangeLogin}
                                required
                                className={loginStyles.input}
                            />
                            <input
                                type='password'
                                placeholder='password'
                                name='MainstfUserPassword'
                                value={data.MainstfUserPassword}
                                onChange={handleChangeLogin}
                                required
                                className={loginStyles.input}
                            />


                            <button type='submit' className={loginStyles.greenBtn}>Log In</button>
                        </form>
                    }
                </div>

            </div>

        </div>

    )
}

export default staffRegister;