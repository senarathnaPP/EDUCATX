import React, { useState, useEffect } from "react";
import axios from "axios";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import { useParams } from "react-router-dom";

export default function editPanel() {

    const {id}= useParams()
    const [name1,setName1]= useState('');
    const [name2,setName2] = useState('');
    const [name3,setName3] = useState('');
    const [name4,setName4] = useState('');
     const [staffId,setSatffId] = useState([]);
    //const [memberName,setMemberrName]=useState('')
    const [panelId, setPanelId] = useState('');
    const [panel, setPanel] = useState({});
    const [studentGroup, setStudentGroup] = useState('');
    //const link = ;
    function setIntitalState(){
        setMemberrName([...memberName,{memberName:""}]);
        //console.log("message 1",memberName)
        setPanelId(panel.panelId);
        setStudentGroup(panel.studentGroup);
        setName1(panel.name1);
        setName2(panel.name2);
        setName3(panel.name3);
        setName4(panel.name4);
    }
    
    
 
    useEffect(() => {
        function getPanel() {
            
            axios
                .get(`http://localhost:8000/api/admin/panel/get/${id}`)
                .then(res => {
                    console.log(res);
                    setPanel(res.data.panel);
                    //setIntitalState();
                    setPanelId(res.data.panel.panelId)
                    setStudentGroup(res.data.panel.studentGroup)
                    
                    setName1(res.data.panel.memberName[0].memberName);
                    setName2(res.data.panel.memberName[1].memberName);
                    setName3(res.data.panel.memberName[2].memberName);
                    setName4(res.data.panel.memberName[3].memberName);

                    console.log("message",res.data.panel.panelId)
                }).catch(err => {
                    alert(err.message);
                })
                
        }
        function getSinglePanel(){
            axios
            .get("http://localhost:8000/api/admin/roles/get")
            .then((res) => {
                setName1(res.data.existingRoles),
                console.log("res",res.data.existingRoles)
            })
            .catch((err) => {
                alert(err.message);
            });
        }
        getPanel();
        getSinglePanel()

    }, [id])

   
   
   // let [memberName, setMemberName] = useState([ {memberName:""}]);

    const updateData = e => {
        e.preventDefault();

            const updatePanel = {
                panelId,
                studentGroup,
                name1,
                name2,
                name3,
                name4             
            }

            axios
                .put(`http://localhost:8000/api/admin/panel/update/${id}`, updatePanel)
                .then(() => {
                    alert("panel updated");
                    window.location.href='/viewPanels';
                }).catch((err) => {
                    alert("Unable to update" + err);
                })
        }
    


    return (
        <Form onSubmit={updateData}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='formLabel'>panel ID</Form.Label>
                <input type="text" placeholder="Enter panel id"
                    name="panelId"
                    value={panel.panelId}
                    onChange={(e) => {
                        setPanelId(e.target.value);
                    }}
                    //value={panelId}
                    
                    required
                />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='formLabel'>MEMBER NAME(s)</Form.Label>
            <select id="name1"  name="name1" onChange={(e)=>setName1(e.target.value)} value={name1}
                    className="btn btn-secondary dropdown-toggle">
                    <option selected> Choose...</option>
                    {staffId.map(obj=>
                      <option>{obj.stfStaffId}</option>
                    )}
            </select>
                
                
                <Form.Control type="text" value={name1} placeholder="Enter name"
                    onChange={(e) => {
                        setName1(e.target.value);
                    }}
                />
                <br/>
                <Form.Control type="text" value={name2} placeholder="Enter name"
                    onChange={(e) => {
                        setName2(e.target.value);
                    }}
                />
                 <br/>
                <Form.Control type="text" value={name3} placeholder="Enter name"
                    onChange={(e) => {
                        setName3(e.target.value);
                    }}
                />
                <br/>
                <Form.Control type="text" value={name4} placeholder="Enter name"
                    onChange={(e) => {
                        setName4(e.target.value);
                    }}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='formLabel'>STUDENT GROUP</Form.Label>
                <input type="text" placeholder="Enter student group id"
                    name="studentGroup"
                    value={panel.studentGroup}
                    onChange={(e) => {
                        setStudentGroup(e.target.value);
                    }}
                    //value={panelId}
                    
                    required
                />
            </Form.Group>

            <center>

                <Button variant="primary" type="submit" className='submitBtnForm'>
                    UPDATE PANEL
                </Button>
            </center>
        </Form>
    )
}