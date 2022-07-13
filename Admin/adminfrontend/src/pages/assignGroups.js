import React, { Component } from 'react'
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import Footer from '../components/Footer/Footer';
export default class createSubmissions extends Component {

  constructor(props){
    super(props);
    this.state={
        
        studentGroup:"",
        topic:"",
        dueDate:"",
        dueTime:"",
        description:"",
        type:"",
       
         /** */
        errors:{},
        errorLong:{},
        errors1:{},
        errorsN:{},
        error:{},
        errorT:{}

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
  const{submissionId,topic,description,dueDate,dueTime,type}=this.state;
  let isValid = true;
  const errors ={};
  const errors1 ={};
  const error = {};
  const errorsN = {};
  const errorLong={};
  const errorT={};

  if(submissionId.trim().length<3){
      error["submissionCodeLength"] = "Submission code must be in length 3 or higher";
      isValid=false;
  }

  if(!submissionId.match(/^[A-Z]{1,}[0-9]{3,}$/)){
      error["submissionCodePattern"]="Code should include at least 1 uppercase letters and at least 3 numbers";
      isValid=false;
  }

  if(!submissionId){
      error["submissionCodeInput"] = "Submission code Field is EMPTY!";
      isValid=false;
  }

  if(!topic){
      errorsN["topicInput"] = "topic Field is EMPTY!";
      isValid=false;
  }

  if(!topic.match(/^[a-z A-Z]*$/)){
      errorsN["topicInputPattern"] = "topic must contain characters only!";
      isValid=false;
  }

  if(!description){
      errors["descriptionInput"] = "description Field is EMPTY!";
      isValid=false;
  }

  if(!dueTime){
    errorLong["dueTimeInput"] = "dueTime Field is EMPTY!";
    isValid=false;
}

  if(!dueDate){
    errors1["dueDateInput"] = "dueDate Field is EMPTY!";
    isValid=false;
}

if(!type){
    errorT["typeInput"] = "Type Field is EMPTY!";
    isValid=false;
}

  

  this.setState({errors:errors,errors1:errors1,error:error,errorsN:errorsN,errorLong:errorLong,errorT:errorT});
  return isValid;
}
/** */

  onSubmit=(e)=>{
    e.preventDefault();

    /** */
    const isValid = this.formValidation();
    if(isValid){


    const{submissionId,topic,description,dueDate,dueTime,type}= this.state;

    const data={
        submissionId:submissionId,
        topic:topic,
        description:description,
        dueDate:dueDate,
        dueTime:dueTime,
        type:type
       
    }
        
    console.log(data);

    axios.post("http://localhost:8000/api/admin/submission/create",data).then((res)=>{
      if(res.data.success){
        alert("Submission created Successfully!")
        this.setState(
          {
            submissionId:"",
            topic:"",
            description:"",
            dueDate:"",
            dueTime:"",
            type:"",
          }
        )
      }
    })
}
}

  
  render() {
    const{errors}=this.state;
    const{errors1}=this.state;
    const{error}=this.state;
    const{errorsN}=this.state;
    const{errorLong}=this.state;
    const{errorT}=this.state;

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

        <h1 className='h3 mb-3 font-weight-normal' style={{color:'black'}}> CREATE A SUBMISSION</h1>
        <form className='needs-validation' noValidate onSubmit={this.onSubmit}>
          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>SUBMISSION ID</label>
            <input 
              type="text"
              className="form-control"
              name="submissionId"
              placeholder="Enter submission id"
              value={this.state.submissionId}
              onChange={this.handleInputChange}
            />
            {Object.keys(error).map((key)=>{
             return <div style={{color:'red'}} key={key}>{error[key]}</div> })}
          </div>

          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>TOPIC</label>
            <input 
              type="text"
              className="form-control"
              name="topic"
              placeholder="Enter topic"
              value={this.state.topic}
              onChange={this.handleInputChange}
            />
             {Object.keys(errorsN).map((key)=>{
              return <div style={{color:'red'}} key={key}>{errorsN[key]}</div> })}
          </div>

          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>DESCRIPTION</label>
            <input 
              type="text"
              className="form-control"
              name="description"
              placeholder="Enter description"
              value={this.state.description}
              onChange={this.handleInputChange}
            />
            {Object.keys(errors).map((key)=>{
              return <div style={{color:'red'}} key={key}>{errors[key]}</div> })}
          </div>

          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>DUE DATE</label>
            <input type="text" className="form-control" name="dueDate" placeholder="Enter due date" value={this.state.dueDate} onChange={this.handleInputChange}/>
            {Object.keys(errors1).map((key)=>{
              return <div style={{color:'red'}} key={key}>{errors1[key]}</div> })}
          </div>

          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>DUE TIME</label>
            <input 
              type="text"
              className="form-control"
              name="dueTime"
              placeholder="Enter Due time"
              value={this.state.dueTime}
              onChange={this.handleInputChange}
            />
            {Object.keys(errorLong).map((key)=>{
              return <div style={{color:'red'}} key={key}>{errorLong[key]}</div> })}
          </div>
          
          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>TYPE</label>
            <input 
              type="text"
              className="form-control"
              name="type"
              placeholder="Enter type"
              value={this.state.type}
              onChange={this.handleInputChange}
            />
            {Object.keys(errorT).map((key)=>{
              return <div style={{color:'red'}} key={key}>{errorT[key]}</div> })}
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
