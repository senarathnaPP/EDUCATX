import React, { Component } from 'react';
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import Footer from '../components/Footer/Footer';
import axios from 'axios'
import { Button, Dropdown } from 'react-bootstrap';
//import uuid v4
import { v4 as uuid } from 'uuid';

export default class viewPanels extends Component {
    
    constructor(props){
        super(props);

        this.state={
            panels:[]
        };
    }

    componentDidMount(){
        this.retrievePanels();
    }

    retrievePanels(){
        axios.get("http://localhost:8000/api/admin/panels/get").then(res=>{
            if(res.data.success){
                this.setState({
                    panels:res.data.existingPanels
                });
                console.log(this.state.panels)
            }
        });
    }

       //Search bar
  filterData(panels, searchKey) {
    const result = panels.filter(
      (item) =>
        item.panelId.toLowerCase().includes(searchKey) || //toLowerCase() helps to filter the data using the lowercase letters.
        item.panelId.toUpperCase().includes(searchKey) || //toUpperCase() helps to filter the data using the Uppercase letters.
        item.studentGroup.toLowerCase().includes(searchKey) ||
        item.studentGroup.toUpperCase().includes(searchKey)
    );

    this.setState({ panels: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8000/api/admin/panels/get").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingPanels, searchKey);
      }
    });
  };

  onDelete = (id) => {
    if (window.confirm("Do you want to remove this panel?")) {
      axios.delete(`http://localhost:8000/api/admin/panel/delete/${id}`).then((res) => {
        alert("Panel removed Successfully!");
        this.retrievePanels();
      });
    }
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
                    marginTop: "0px",
                    background: "#D3D3D3",
                    }}>
               
  
            <div className='card'
                style={{
                    //marginTop:'250px',
                    height:'auto'
                }}
            >
            <h4
              style={{
                color: 'rgba(6, 21, 117)',
                fontSize: "48px",
                fontWeight: "bold",
                textAlign: "center",
                marginLeft:'100px',
                marginTop:'20px',
                height:'auto'
              }}
            >
              ALL PANELS
            </h4><br/>
              &nbsp;&nbsp;&nbsp;
            <button
              style={{width:'200px',marginLeft:'500px',marginBottom:'-20px',backgroundColor:'rgba(35, 84, 137 , 1)'}}
              className='btn btn-success'
            ><a href="/createPanels" style={{textDecoration:'none',color:'white',fontWeight:'bold'}}>ADD PANEL</a></button>
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
                marginTop: "-20px",
                borderColor: "rgba(6, 21, 117,0.5)",
              }}
            ></input>
          </div>
          <br/><br/>
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
                            <th scope="row">PANEL ID</th>
                            <th scope="row">NAME OF THE MEMBERS</th>
                            <th scope="row">GROUP ID</th>
                            <th scope="row">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.panels.map((panels,index)=>(
                            <tr>
                                <th scope='row'>{index+1}</th>
                                <td>
                                
                                 {panels.panelId}
                            
                                </td>
                                <td>
                                  {panels.memberName.map((singleMember,index)=>(
                                    <ul key={index}>
                                     {singleMember.memberName &&
                                     <li>
                                      {singleMember.memberName}
                                     </li>
                                     }
                                    </ul>
                                  ))}

                                </td>
                                <td>{panels.studentGroup}</td>
                                <td>
                               <button className='btn btn-warning ' style={{backgroundColor:'rgb(17, 100, 6)'}}><a  href={`/update/panel/${panels._id}`} style={{color:'white', textDecoration:'none', fontWeight:'bold'}}>
                                        <i className='fas fa-edit'></i>
                                        &nbsp;EDIT
                                    </a>
                                    </button>
                                    &nbsp;
                                    <a className ="btn btn-danger" href="#" onClick={() => this.onDelete(panels._id)} style={{ backgroundColor:'rgb(158, 7, 7)', textDecoration: "none", color: "white", fontWeight:'bold' }}
                                        >
                                        <i className='fas fa-trash-alt'></i>
                                        &nbsp;REMOVE
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
               </div>    
           
        </div>
        <br/></div>
        <Footer/>
        </div>

    )
  }
}
