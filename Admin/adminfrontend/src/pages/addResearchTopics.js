import React, { Component } from 'react'
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import Footer from '../components/Footer/Footer';

export default class createResearchTopics extends Component {

  constructor(props){
    super(props);
    this.state={
        
        topic:"",
        researchField:"",
        
       
         /** */
        errors:{},
        errorLong:{},
        

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
  const{topic,researchField}=this.state;
  let isValid = true;
  const errors ={};
  const errorLong={};



  if(!topic){
      errors["topicInput"] = "topic Field is EMPTY!";
      isValid=false;
  }

  if(!topic.match(/^[a-z A-Z]*$/)){
      errors["topicInputPattern"] = "topic must contain characters only!";
      isValid=false;
  }


  if(!researchField){
    errorLong["researchFieldInput"] = "researchField Field is EMPTY!";
    isValid=false;
}


  this.setState({errors:errors,errorLong:errorLong});
  return isValid;
}
/** */

  onSubmit=(e)=>{
    e.preventDefault();

    /** */
    const isValid = this.formValidation();
    if(isValid){


    const{topic,researchField}= this.state;

    const data={
        
        topic:topic,
        researchField:researchField
       
    }
        
    console.log(data);

    axios.post("http://localhost:8000/api/admin/topics/create",data).then((res)=>{
      if(res.data.success){
        alert("Topic created Successfully!");
        window.location.href='/getTopics';
        this.setState(
          {
            topic:"",
            researchField:""
          }
        )
      }
    })
}
}

  
  render() {

    const{errors}=this.state;
    const{errorLong}=this.state;

    return (
        <>
        <AdminNavbar/>
      <div className='container'>
      <div className = 'card' style={{marginLeft:'120px', background: "#D3D3D3",height:'auto',width:'600px',marginRight:'100px'}}>
      <div className='col-md-8 mt-4 mx-auto'>
      <br/>
      

        <h1 className='h3 mb-3 font-weight-normal' style={{color: 'rgba(6, 21, 117)'}}> ADD A TOPIC </h1>
        <button className="btn btn-danger" style={{width:'250px',backgroundColor:'rgb(9, 38, 68 )'}}>
        <a href="/getTopics" style={{textDecoration:'none',color:'white',fontWeight:'bold',}}>
          View Topics
        </a></button><br/><br/>
        <form className='needs-validation' noValidate onSubmit={this.onSubmit}>
         
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
             {Object.keys(errors).map((key)=>{
              return <div style={{color:'red'}} key={key}>{errors[key]}</div> })}
          </div>

          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>RESEARCH FIELD</label>
            <input 
              type="text"
              className="form-control"
              name="researchField"
              placeholder="Enter research field"
              value={this.state.researchField}
              onChange={this.handleInputChange}
            />
            {Object.keys(errorLong).map((key)=>{
              return <div style={{color:'red'}} key={key}>{errorLong[key]}</div> })}
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
