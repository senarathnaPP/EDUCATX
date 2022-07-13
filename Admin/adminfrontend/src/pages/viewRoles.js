import React, { Component } from 'react';
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import Footer from '../components/Footer/Footer';
import axios from 'axios'
import { Button, Dropdown } from 'react-bootstrap';
import "./ToggleSwitch.css"; 
//import Switch from 'react-toggle-switch'

export default class viewRoles extends Component {

    constructor(props){
        super(props);

        this.state={
            roles:[],
            isToggled:true,
            //switched: false,
            agreement: false
        };
        this.onToggle = this.onToggle.bind(this)
    }

    componentDidMount(){
        this.retrieveRoles();
    }

    onToggle=(data)=>{
      console.log("toogle1",data)
      const value=this.state.data ? false: true
      this.setState({isToggled:value})
      console.log("toggle",this.state.isToggled)
    }

    retrieveRoles(){
        axios.get("http://localhost:8000/api/admin/roles/get").then(res=>{
            if(res.data.success){
                this.setState({
                    roles:res.data.existingRoles

                    
                });
                console.log("roles",this.state.roles)
            }
        });
    }


    onClickDisabled = (data,id) =>{
      if (data=='N' || data=='n'){
       
          if (window.confirm("Do you want to remove this Role?")) {
              axios.delete(`http://localhost:8000/api/admin/role/delete/${id}`).then((res) => {
              alert("Role removed Successfully!");
              this.retrieveRoles();
            });
          
        };
            
      }
      console.log(data)
    }

    

       //Search bar
  filterData(roles, searchKey) {
    const result = roles.filter(
      (item) =>
        item.stfStaffId.toLowerCase().includes(searchKey) || //toLowerCase() helps to filter the data using the lowercase letters.
        item.stfStaffId.toUpperCase().includes(searchKey) || //toUpperCase() helps to filter the data using the Uppercase letters.
        item.stfResField.toUpperCase().includes(searchKey) ||
        item.stfResField.toLowerCase().includes(searchKey)
    );

    this.setState({ roles: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8000/api/admin/roles/get").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingRoles, searchKey);
      }
    });
  };

  handleChange = e => this.setState({ agreement: e.target.checked });
  handleSubmit = e => {
    e.preventDefault();
    console.log(`checked: ${this.state.agreement}`);
  };
  // toggleSwitch = () => {
  //   this.setState(prevState => {
  //     return {
  //       switched: !prevState.switched
  //     };
  //   });
  // };

  render() {
    return (
        <div>
            <AdminNavbar/>
            {/* <Sidebar /> */}
            <div className="container"
                    style={{
                    // margin: "40px",
                    // marginLeft: "0px",
                    width: "100%",
                    borderRadius: "0px",
                    height:'auto',
                    background: "#D3D3D3",
                    }}>

            <br /><br/>
            <div className='card'>            
          <br/>
            <h4
              style={{
                color: 'rgba(6, 21, 117)',
                fontSize: "48px",
                fontWeight: "bold",
                textAlign: "center",
                marginLeft:'100px',
                marginTop:'0px',
                height:'auto'
              }}
            >
              ALL STAFF MEMBERS
            </h4>
     

          <div>
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}
              style={{
                width: "350px",
                marginLeft: "10px",
                marginTop: "30px",
                borderColor: "rgba(6, 21, 117,0.5)",
              }}
            ></input>
          </div>
          <br />
          
              <div className='table-responsive'>
                <table className="table table-hover" onSubmit={this.handleSubmit}
                style={{
                    //marginLeft:'0px',
                    backgroundColor: "#ffff",
                    borderRadius: "5px",
                    width: "auto",
                    height:'auto'
                    //border: "none",
                }}>
                    <thead style={{backgroundColor:'rgba(1, 11, 67 )',color:'white'}}>
                        <tr>
                            <th scope="row">#</th>
                            <th scope="row">STAFF ID</th>
                            <th scope="row">STAFF JOB ROLE</th>
                            <th scope="row">RESEARCH FIELD</th>

                            <th scope="row">NAME</th>
                            <th scope="row">ACTIVE/INACTIVE STATUS</th>
                            <th scope="row">EMAIL</th>

                            <th scope="row">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.roles.map((roles,index)=>(
                            <tr>
                                <th scope='row'>{index+1}</th>

                                <td onClick={()=>this.onClickDisabled(roles.stfUserActive,roles._id)}>
                                
                                 {roles.stfStaffId}
                                
                                </td>
                                <td>{roles.stfJobRole}</td>
                                <td>{roles.stfResField}</td>
                                <td>{roles.stfName}</td>
                                
                                <td>
                                <label className="toggle-switch"> 
                                    <input type="checkbox" checked={roles.stfUserActive=='Y'? true : false}/> 
                                    <span className="switch" /> 
                                </label>
                                    
                                {/* <label className="toggle-switch"> 
                                <input type="checkbox" checked={isToggled} onChange={onToggle} /> 
                                <span className="switch" /> 
                                </label>  */}
                                 
                                </td>
                                <td>{roles.stfEmail}</td>
                                
                                <td>
                                   <button className='btn btn-warning'  style={{backgroundColor:'rgb(17, 100, 6)'}}><a href={`/edit/roles/${roles._id}`} style={{color:'white',textDecoration:'none', fontWeight:'bold'}}>
                                      EDIT
                                   </a>

                                   </button>
                                
                      </td>
                               
                                
                            </tr>
                        ))}
                    </tbody>

                </table>
                </div>    
           
        </div>
        </div>
        <Footer/>
        </div>

    )
  }
}
