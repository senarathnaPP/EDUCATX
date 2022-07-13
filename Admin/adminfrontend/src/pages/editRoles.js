import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from "react-router"; 

export default class editRoles extends Component {

    constructor(props){
        super(props);
        this.state={
            
            stfStaffId:"",
            stfJobRole:"",
            stfResField:"",
            stfUserActive:"",
            //agreement: false,
            isToggled:""
        }
        this.onToggle = this.onToggle.bind(this)
    }

    handleInputChange=(e)=>{
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }

    // handleChange =(e)=>{
    //     console.log("meesgaeeee",e.target.value)
    // }
            
    onToggle = (data) => {

        console.log("toogle1", data)

        const value = data ? false : true

        this.setState({ isToggled: value }, () => {

            console.log("sukitha", this.state.isToggled)

        })

    }

    onSubmit=(e)=> {
        e.preventDefault();
        /** */
            const id = this.props.match.params.id;

            const {stfStaffId, stfJobRole, stfResField, stfUserActive} = this.state;

            const data = {
                
                stfStaffId: stfStaffId,
                stfJobRole:stfJobRole,
                stfResField:stfResField,
                stfUserActive:this.state.isToggled ? "Y" : "N"
            }

            console.log(data);

            axios.put(`http://localhost:8000/api/admin/role/update/${id}`, data).then((res) => {
                if (res.data.success) {
                    alert("Role Details Updated Successfully!");
                    window.location.href='/viewRoles';
                    this.setState(
                        {
                            stfStaffId: "",
                            stfJobRole:"",
                            stfResField:"",
                            stfUserActive:""
                        }
                    )
                }
            })
        }
    
        componentDidMount(){
            const id=this.props.match.params.id;
    
            axios.get(`http://localhost:8000/api/admin/role/get/${id}`).then((res) =>{
                if(res.data.success){
                    const value = res.data.role.stfUserActive=='Y' ? true : false
                    this.setState({

                        stfStaffId:res.data.role.stfStaffId,
                        stfJobRole:res.data.role.stfJobRole,
                        stfResField:res.data.role.stfResField,
                        stfUserActive:res.data.role.stfUserActive,
                        isToggled: value
                    });
    
                    console.log(this.state.stfStaffId);
                }
            });
        }

  render() {
    return (
        <div className='container'>
        <div style={{width:'100%',margin:'40px',borderRadius:'0px',backgroundColor: '#D3D3D3',marginTop:'-30px',marginLeft:'0px'}}>
        <div className="col-md-8 mt-4 mx-auto"><br/>
        

        <h1 className="h3 mb-3 font-weight-normal" style={{color: 'rgba(6, 21, 117)',fontWeight:'bolder'}}>EDIT THE ROLE DETAILS</h1>
        <br/>
        <button className="btn btn-danger" style={{width:'200px',backgroundColor:'rgb(9, 38, 68 )'}}>
            <a href="/viewRoles" style={{textDecoration:'none',color:'white',fontWeight:'bold'}}>
            View Roles
            </a></button><br/><br/>
            <form className="needs-validation" noValidate>
               
                <div className="form-group" style={{marginBottom:'15px'}}>
                    <label style={{marginBottom:'5px',fontWeight:'bold',color:'black',fontSize:'20px'}}>STAFF ID</label>
                    <input type="text" className="form-control" name="stfStaffId" placeholder="Enter stfStaffId" value={this.state.stfStaffId} onChange={this.handleInputChange}/>
                </div>

                <div className="form-group" style={{marginBottom:'15px'}}>
                    <label style={{marginBottom:'5px',fontWeight:'bold',color:'black',fontSize:'20px'}}>JOB ROLE</label>
                    <input type="text" className="form-control" name="stfJobRole" placeholder="Enter stfJobRole" value={this.state.stfJobRole} onChange={this.handleInputChange}/>
                    
                </div>

                <div className="form-group" style={{marginBottom:'15px'}}>
                    <label style={{marginBottom:'5px',fontWeight:'bold',color:'black',fontSize:'20px'}}>RESEARCH FIELD</label>
                    <input type="text" className="form-control" name="stfResField" placeholder="Enter stfResField" value={this.state.stfResField} onChange={this.handleInputChange}/>
                    
                </div>
            
                    <div style={{marginBottom:'5px',fontWeight:'bold',color:'black',fontSize:'20px'}}>ACTIVE/INACTIVE USER <br/>
                     <label className="toggle-switch"> 
                        <input type="checkbox" checked={this.state.isToggled} onChange={()=>this.onToggle(this.state.isToggled)} /> 
                        <span className="switch" /> 
                    </label>
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
