import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link } from "react-router-dom";

const ViewSingleRole = props => {
    const [stfStaffId, setStaffId] = useState('')
    const [stfName, setName] = useState('')
    const [stfEmail, setEmail] = useState('')
    const [stfPhonenNmber, setPhone] = useState('')
    const [stfJobRole, setJob] = useState('')
    const [stfPanellMember, setPanel] = useState('')


    useEffect(() => {
        axios.get(`http://localhost:8000/api/admin/role/get/${props.match.params.id}`)
            .then(res => {
                console.log(res)[
                    setStaffId(res.data.role.stfStaffId),
                    setName(res.data.role.stfName),
                    setEmail(res.data.role.stfEmail),
                    setPhone(res.data.role.stfPhonenNmber),
                    setJob(res.data.role.stfJobRole),
                    setPanel(res.data.role.stfPanellMember)
                ]
            })
            .catch(error => {
                console.log(error)
                console.log("No")
            });
    }, [props]);

    return (
        // <div>
        //     <h2>View Roles</h2>
        //     <h2>{stfStaffId}</h2>
        //     <h2>{stfName}</h2>
        //     <h2>{stfEmail}</h2>
        //     <h2>{stfPhonenNmber}</h2>
        //     <h2>{stfJobRole}</h2>
        //     <h2>{stfPanellMember}</h2>  
        // </div>
        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center bg-secondary">
            <div className="card p-4">
                <div class=" image d-flex flex-column justify-content-center align-items-center">
                    <button className="btn btn-secondary">
                        <img src="https://i.imgur.com/wvxPV9S.png" height="150" width="150" />
                    </button>
                    <span class="name mt-3">{stfStaffId}
                    </span>
                    <span class="idd">{stfName}
                    </span>
                    <div class="d-flex flex-row justify-content-center align-items-center gap-2">
                        <span class="idd1">{stfEmail}
                        </span>
                        <span>
                            <i class="fa fa-copy">
                            </i>
                        </span>
                    </div>
                    <div class="d-flex flex-row justify-content-center align-items-center gap-2">
                        <span class="idd1">{stfPhonenNmber}
                        </span>
                        <span>
                            <i class="fa fa-copy">
                            </i>
                        </span>
                    </div>
                    <div class="d-flex flex-row justify-content-center align-items-center gap-2">
                        <span class="idd1">{stfJobRole}
                        </span>
                        <span>
                            <i class="fa fa-copy">
                            </i>
                        </span>
                    </div>
                    
                    <div class="d-flex flex-row justify-content-center align-items-center mt-3">
                        <span class="number">Panel Member :
                            </span>
                            <span class="follow">: {stfPanellMember}
                        </span>
                    </div>
                    <div class=" d-flex mt-2">
                        <button class="btn1 btn-dark">Staff Profile
                        </button>
                         
                    </div>
                    <div class=" d-flex mt-2">
                    <Link to="/listRoles">
                        <button class="btn1 btn-primary">Back to List
                        </button>
                        </Link>
                        
                    </div>
                </div>
                
            </div>

        </div>


            )
}

            export default ViewSingleRole