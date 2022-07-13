import React, { Component } from 'react';
import { Link, useHistory } from 'react-router-dom'
import loginStyles from './login.module.css';
import axios from 'axios';
import { useState } from 'react';

function Login() {

    const [data, setData] = useState({
        studentName: "",
        studentId: "",
        email: "",
        gender: "",
        password: ""
    })

    const history = useHistory();
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            const url = 'http://localhost:8000/api/student';
            axios.post(url, data).then((res) => {
                if (res.data.message === "Student Created") {
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

    }

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
                <div className={loginStyles.right}>
                    <form className={loginStyles.form_container} onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input
                            type='text'
                            placeholder='Student Name'
                            name='studentName'
                            value={data.studentName}
                            onChange={handleChange}
                            required
                            className={loginStyles.input}
                        />
                        <input
                            type='text'
                            placeholder='Student Id'
                            name='studentId'
                            value={data.studentId}
                            onChange={handleChange}
                            required
                            className={loginStyles.input}
                        />
                        <input
                            type='email'
                            placeholder='Student Email'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            required
                            className={loginStyles.input}
                        />
                        <input
                            type='text'
                            placeholder='Student Gender'
                            name='gender'
                            value={data.gender}
                            onChange={handleChange}
                            required
                            className={loginStyles.input}
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={data.password}
                            onChange={handleChange}
                            required
                            className={loginStyles.input}
                        />
                        <button type='submit' className={loginStyles.greenBtn}>Sign Up</button>
                    </form>
                </div>

            </div>

        </div>

    )
}

export default Login;