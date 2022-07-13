import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from "react-router"; 
export default class editSubmissions extends Component {

    constructor(props){
        super(props);
        this.state={
            submissionId:"",
            topic:"",
            type:"",
            dueDate:"",
            dueTime:"",
            description:"",
            category:"",
            markings:[]
        }
    }

    handleInputChange=(e)=>{
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }

    handleInputSelect=(e)=>{
        this.setState({category:e.target.value})
        console.log("category",e.target.value)
    }
    

    onSubmit=(e)=> {
        e.preventDefault();
        /** */
            const id = this.props.match.params.id;

            const {submissionId, topic, type, dueDate,dueTime,description,category} = this.state;

            const data = {
                submissionId: submissionId,
                description: description,
                topic: topic,
                type:type,
                dueDate:dueDate,
                dueTime: dueTime,
                category:category
            }

            console.log(data);

            axios.put(`http://localhost:8000/api/admin/submission/update/${id}`, data).then((res) => {
                if (res.data.success) {
                    alert("Submission Details Updated Successfully!")
                    window.location.href='/viewSubmissions'
                    this.setState(
                        {
                            submissionId: "",
                            description: "",
                            topic: "",
                            type:"",
                            dueDate:"",
                            dueTime: "",
                            category:""
                        }
                    )
                }
            })
        }
    
        componentDidMount(){
            const id=this.props.match.params.id;
    
            axios.get(`http://localhost:8000/api/admin/submission/get/${id}`).then((res) =>{
                if(res.data.success){
                    this.setState({
                        submissionId:res.data.submission.submissionId,
                        description:res.data.submission.description,
                        topic:res.data.submission.topic,
                        type:res.data.submission.type,
                        dueDate:res.data.submission.dueDate,
                        dueTime:res.data.submission.dueTime,
                        category:res.data.submission.category
                    });
    
                    console.log(this.state.submissionId);
                }
            });

            axios.get("http://localhost:8000/api/admin/marking/get").then((res)=>{
                if(res.data.success){
                    this.setState({
                        markings:res.data.existingMarkings
                    })
                }
            })
        }

  render() {
    return (
        <div className='container'>
        <div style={{width:'100%',margin:'40px',borderRadius:'0px',backgroundColor: '#D3D3D3',marginTop:'-30px',marginLeft:'0px'}}>
        <div className="col-md-8 mt-4 mx-auto"><br/><br/><br/>
        

    <h1 className="h3 mb-3 font-weight-normal" style={{color: 'rgba(6, 21, 117)',fontWeight:'bolder'}}>EDIT THE SUBMISSION DETAILS</h1>
    <button className="btn btn-danger" style={{width:'200px',backgroundColor:'rgb(9, 38, 68 )'}}>
        <a href="/viewSubmissions" style={{textDecoration:'none',color:'white',fontWeight:'bold',}}>
          View Submissions
        </a></button><br/><br/>
            <form className="needs-validation" noValidate>
                <div className="form-group" style={{marginBottom:'15px'}}>
                    <label style={{marginBottom:'5px',fontWeight:'bold',color:'black',fontSize:'20px'}}>SUBMISSION ID</label>
                    <input type="text" className="form-control" name="submissionId" placeholder="Enter code" value={this.state.submissionId} onChange={this.handleInputChange} readOnly/>

                </div>

                <div className="form-group" style={{marginBottom:'15px'}}>
                    <label style={{marginBottom:'5px',fontWeight:'bold',color:'black',fontSize:'20px'}}>TOPIC</label>
                    <input type="text" className="form-control" name="topic" placeholder="Enter Unit Price" value={this.state.topic} onChange={this.handleInputChange}/>
                </div>

                <div className="form-group" style={{marginBottom:'15px'}}>
                    <label style={{marginBottom:'5px',fontWeight:'bold',color:'black',fontSize:'20px'}}>DESCRIPTION</label>
                    <input type="text" className="form-control" name="description" placeholder="Enter description" value={this.state.description} onChange={this.handleInputChange}/>
                    
                </div>

                <div className="form-group" style={{marginBottom:'15px'}}>
                    <label style={{marginBottom:'5px',fontWeight:'bold',color:'black',fontSize:'20px'}}>DUE DATE</label>
                    <input type="date" className="form-control" name="dueDate" placeholder="Enter dueDate" value={this.state.dueDate} onChange={this.handleInputChange}/>
                    
                </div>

                <div className="form-group" style={{marginBottom:'15px'}}>
                    <label style={{marginBottom:'5px',fontWeight:'bold',color:'black',fontSize:'20px'}}>DUE TIME</label>
                    <input type="time" className="form-control" name="dueTime" placeholder="Enter dueTime" value={this.state.dueTime} onChange={this.handleInputChange}/>
                    
                </div>


                <div className="form-group" style={{marginBottom:'15px'}}>
                    <label style={{marginBottom:'5px',fontWeight:'bold',color:'black',fontSize:'20px'}}>TYPE</label>
                    <input type="text" className="form-control" name="type" placeholder="Enter type" value={this.state.type} onChange={this.handleInputChange}/>
                    {/* <div className="text-danger">{this.state.errors.imageUrlInput}</div> */}
                </div>

                <div className="form-group" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px',fontWeight:'bold',color:'black',fontSize:'20px'}}>MARKING CATEGORY</label><br/>
                  <select id="category" onChange={this.handleInputSelect} value={this.state.category} className="btn btn-secondary dropdown-toggle">
                    <option selected>{this.state.category}</option>
                      {
                        this.state.markings.map((obj)=>(
                          <option>{obj.category}</option>
                        ))
                      }
                  </select>
                </div>

                <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                    <i className="far fa-check-square"></i>
                        &nbsp;Update
                </button>
                <br/><br/>
            </form>


    </div>
    </div> 
    </div>
    )
  }
}
