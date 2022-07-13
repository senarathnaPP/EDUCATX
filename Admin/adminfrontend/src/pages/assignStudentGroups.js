import React, { Component } from 'react';
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import Footer from '../components/Footer/Footer';
import axios from 'axios'
import { Button, Dropdown } from 'react-bootstrap';

export default class assignStudentGroups extends Component {

    constructor(props){
        super(props);

        this.state={
            groups:[]
        };
    }

    componentDidMount(){
        this.retrieveGroups();
    }



    retrieveGroups(){
        axios.get("http://localhost:8000/api/admin/get/studentGroups").then(res=>{
            if(res.data.success){
                this.setState({
                    groups:res.data.existingGroups

                    
                });
                console.log(this.state.groups)
            }
        });
    }



       //Search bar
  filterData(groups, searchKey) {
    const result = groups.filter(
      (item) =>
        item.groupName.toLowerCase().includes(searchKey) || //toLowerCase() helps to filter the data using the lowercase letters.
        item.groupName.toUpperCase().includes(searchKey) || //toUpperCase() helps to filter the data using the Uppercase letters.
        item.groupLeaderId.toUpperCase().includes(searchKey) ||
        item.groupLeaderId.toLowerCase().includes(searchKey)
    );

    this.setState({ groups: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8000/api/admin/get/studentGroups").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingGroups, searchKey);
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
              ALL STUDENT GROUPS
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
                    
                    //border: "none",
                }}>
                    <thead style={{backgroundColor:'rgba(1, 11, 67 )',color:'white'}}>
                        <tr>
                            <th scope="row">#</th>
                            <th scope="row">GROUP NAME</th>
                            <th scope="row">LEADER'S STUDENT ID</th>
                            <th scope="row">2ND TEAM MEMBER'S STUDENT ID</th>
                            <th scope="row">3RD TEAM MEMBER'S STUDENT ID</th>
                            <th scope="row">4TH TEAM MEMBER'S STUDENT ID</th>
                            {/* <th scope='col'>ACTION</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.groups.map((groups,index)=>(
                            <tr>
                                <th scope='row'>{index+1}</th>

                                <td>{groups.groupName}</td>
                                <td>{groups.groupLeaderId}</td>
                                <td>{groups.memberTwoId}</td>
                                <td>{groups.memberThreeId}</td>
                                <td>{groups.memberFourId}</td>
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


