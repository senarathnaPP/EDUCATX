import React, { Component } from 'react'
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import Footer from '../components/Footer/Footer';

export default class assignGroups extends Component {

  constructor(props){
    super(props);
    this.state={
        groupId:"",
      
         /** */
        errors:{},
       

    }
  }
    handleInputChange=(e)=>{
      const {name,value} = e.target;

      this.setState({
          ...this.state,
          [name]:value
      })
  }

/** */
formValidation = () =>{
  const{groupId}=this.state;
  let isValid = true;
  const errors ={};
  

  if(groupId.trim().length<2){
      errors["groupIdLength"] = "Submission code must be in length 2 or higher";
      isValid=false;
  }

  if(!groupId.match(/^[A-Z]{1,}[0-9]{3,}$/)){
      errors["groupIdPattern"]="Code should include at least 1 uppercase letters and at least 3 numbers";
      isValid=false;
  }

  if(!groupId){
      errors["groupIdInput"] = "Submission code Field is EMPTY!";
      isValid=false;
  }

  
  this.setState({errors:errors});
  return isValid;
}
/** */

  onSubmit=(e)=>{
    e.preventDefault();

    /** */
    const isValid = this.formValidation();
    if(isValid){


    const{groupId}= this.state;

    const data={
        groupId:groupId, 
       
    }
        
    console.log(data);

    axios.post("http://localhost:8000/api/admin/create/studentGroup",data).then((res)=>{
      if(res.data.success){
        alert("Group assigned Successfully!")
        this.setState(
          {
            groupId:"",
            
          }
        )
      }
    })
}
}



  render() {
    const{errors}=this.state;
   

    return (
        <>
        <AdminNavbar/>
      <div className='container'>
      <div style={{width:'100%',borderRadius:'0px',backgroundColor:'rgba(54, 110, 184,0.3)'}}>
      <div className='col-md-8 mt-4 mx-auto'>
      <br/>
      <button className="btn btn-danger" style={{width:'160px'}}>
        <a href="/viewSubmissions" style={{textDecoration:'none',color:'white',fontWeight:'bold'}}>
          View Submissions
        </a></button><br/><br/>

        <h1 className='h3 mb-3 font-weight-normal' style={{color:'black'}}> ASSIGN THE GROUP</h1>
        <form className='needs-validation' noValidate onSubmit={this.onSubmit}>
          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>GROUP NAME:</label>
           
            

          </div>

          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>GROUP ID</label>
            <input 
              type="text"
              className="form-control"
              name="groupId"
              placeholder="Enter group id"
              value={this.state.groupId}
              onChange={this.handleInputChange}
            />
            {Object.keys(errors).map((key)=>{
             return <div style={{color:'red'}} key={key}>{errors[key]}</div> })}
          </div>


          <button className="btn btn-success" type="submit" style={{marginTop:'15px',marginBottom:'150px'}} onClick={this.onSubmit}>
            <i className="far fa-check-square"></i>
             &nbsp;Save
          </button>
          <br/>
        </form>

      </div>
      </div>
      </div>
      <Footer/>
      </>
    )
  }
}
