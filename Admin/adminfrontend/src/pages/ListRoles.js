import React, { Component } from 'react';
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import Footer from '../components/Footer/Footer';
import axios from 'axios'
import { Button, Dropdown } from 'react-bootstrap';

export default class ListRoles extends Component {

    constructor(props){
        super(props);

        this.state={
            roles:[]
        };
    }

    componentDidMount(){
        this.retrieveRoles();
    }



    retrieveRoles(){
        axios.get("http://localhost:8000/api/admin/roles/get").then(res=>{
            if(res.data.success){
                this.setState({
                    roles:res.data.existingRoles

                    
                });
                console.log(this.state.roles)
            }
        });
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
                

              }}
            >
            ROLES LIST
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
                <table className="table table-hover"
                style={{
                    marginLeft:'0px',
                    backgroundColor: "#ffff",
                    borderRadius: "5px",
                    width: "100%",
                    height:'auto'
                    //border: "none",
                }}>
                    <thead style={{backgroundColor:'rgba(1, 11, 67 )',color:'white'}}>
                        <tr>
                            <th scope='col'>NO</th>
                            <th scope='col'>STAFF ID</th>
                            <th scope='col'>STAFF JOB ROLE</th>
                            <th scope='col'>RESEARCH FIELD</th>

                            <th scope='col'>NAME</th>
                            
                            <th scope='col'>EMAIL</th>

                            <th scope='col'>ACTION</th>
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
                                
                                <td>{roles.stfEmail}</td>
                                
                                <td>
                                   <button className='btn btn-primary' style={{backgroundColor:'rgba(35, 84, 137 , 1'}}>
                                       <a href={`/view/roles/${roles._id}`} style={{color:'white',textDecoration:'none', fontWeight:'bold'}}>
                                      VIEW PROFILE
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
