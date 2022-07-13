import React, { Component, useState, useEffect } from 'react'
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import Footer from '../components/Footer/Footer';
import Button from 'react-bootstrap/Button';

//import uuid v4
import { v4 as uuid } from 'uuid';

function createPanel () {
  const [memberName,setmemberName] = useState([ {memberName:""}]);
  const [panelId, setPanelId] = useState('');
  const [studentGroup,setStudentGroup]=useState('');
  const unique_id = uuid();
  const small_id = unique_id.slice(0,4)
  const [grpName, setGrpName] = useState([]);
  const [staffId,setSatffId] = useState([]);
  //const [pidError, SetPidError] = useState(false);

const handleMemberAdd = () =>{
  setmemberName([...memberName,{memberName:""}])
  console.log("message 1",memberName)
}

const handleMemberRemove = (index)=>{
  const array = [...memberName];
  array.splice(index,1);
  setmemberName(array);
};

const handleMemberChange = (e,index)=>{
  const {name,value} = e.target
  const array = [...memberName];
  array[index][name] = value;
  setmemberName(array);

  console.log("name",name)
}

useEffect(() => {
  function getGrp() {
    axios
      .get("http://localhost:8000/api/admin/get/studentGroups")
      .then((res) => {
        setGrpName(res.data.existingGroups),
        console.log("res",res.data.existingGroups)
      })
      .catch((err) => {
        alert(err.message);
      });

     
  }
  function getStf() {
    axios
      .get("http://localhost:8000/api/admin/roles/get")
      .then((res) => {
        setSatffId(res.data.existingRoles),
        console.log("res",res.data.existingRoles)
      })
      .catch((err) => {
        alert(err.message);
      });

     
  }
  getGrp();
  getStf();
}, []);

function checkLength(){
  
    const long = [...memberName];
    if(long.length<4){
      window.confirm("There should be 4 members to a panel");
      submitBtn.setDisable(true)
    }
      panelId+small_id;
      
      const newPanel= {
        panelId,
        memberName,
        studentGroup,
        
      }
      console.log("memberrrrname",memberName)
      axios.post("http://localhost:8000/api/admin/panels/create", newPanel).then(() => {
          
          alert("Panel added successfully");
          //window.location.href='/viewPanels';
      }).catch((err) => {
          alert("Unable to add" + err);
      })
    
    }

    console.log("group",studentGroup)
  return(
    <div>
    <AdminNavbar/>
    <div className='card' style={{marginLeft:'120px', background: "#D3D3D3",height:'auto',width:'auto',marginRight:'100px'}}>
    <br/>
      <h1 style={{color: 'rgba(6, 21, 117)', marginLeft:'0px'}}>CREATE A PANEL</h1>
      <br/>
     <div style={{marginLeft:'300px'}}>
    <form autoComplete='off' onSubmit={checkLength} style={{marginLeft:'100px'}}>
      <div className='form-field'>
        <label htmlFor='memberName' style={{fontWeight:'bold'}}>MEMBER(S)</label>
       
          {memberName.map((singleMember,index)=>(
            <div key={index} >
                <div>
               
                  <select id="memberName"  name="memberName" onChange={(e)=>handleMemberChange(e,index)} value={singleMember.memberName}
                    className="btn btn-secondary dropdown-toggle" style={{backgroundColor:'rgba(143, 145, 148 ,1)'}}>
                    <option selected> Choose...</option>
                    {staffId.map(obj=>
                      <option>{obj.stfStaffId}</option>
                    )}
                
            </select>
                 
                  {memberName.length-1===index && memberName.length<4 && (
                    <button onClick={handleMemberAdd}
                      style={{marginLeft:'50px',marginTop:'-5px'}}
                      className="btn btn-secondary">
                      <span>+</span>
                    </button>
                  )}
                </div>
               
                <div>
                {memberName.length>1 && (
                  <button onClick={()=>handleMemberRemove(index)}
                      className="btn btn-danger"
                      style={{padding:'10px',marginTop:'20px',marginBottom:'20px'}}
                  >
                    <span>Remove</span>
                  </button>
                  )}
                </div>
                
            </div>
            
          ))}
         
      </div>
         <br/>
      <div>
        <label style={{fontWeight:'bold'}}>PANEL ID</label>
        <input
          type="text"
          onChange={(e) => {
            setPanelId(e.target.value+(small_id));
          }}
          className="form-control"
          style={{width:'300px'}}
          required
        />
        
      </div>
      <br/>
      <div>
        <label style={{fontWeight:'bold'}}>STUDENT GROUP</label>
        {/* <input
          type="text"
          onChange={(e) => {
            setStudentGroup(e.target.value);
          }}
          className="form-control"
          style={{width:'300px'}}
          required
        /> */}
        
        <br/>
            <select id="studentGroup" onChange={(e) =>{setStudentGroup(e.target.value)}}
              className="btn btn-secondary dropdown-toggle" style={{backgroundColor:'rgba(143, 145, 148 ,1)'}}>
              <option selected> Choose...</option>
              {grpName.map(obj=>
                <option>{obj.groupName}</option>
              
              )}
                
            </select>
        
      </div>
        <br/>
      
      <Button variant="success" type="submit" id="submitBtn" className='submitBtnForm'>
                    ADD PANEL
      </Button>
     
      &nbsp;
      <Button variant="primary" className='submitBtnForm'><a href="/viewPanels" style={{color:'white',textDecoration:'none'}}>
                    VIEW PANEL
      </a></Button>
    </form>
    </div>
    <br/>
    
    </div>
    <br/>
    <Footer/>
    </div>
  )

}

export default createPanel