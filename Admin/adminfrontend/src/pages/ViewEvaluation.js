import React, { Component } from 'react';
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import Footer from '../components/Footer/Footer';
import axios from 'axios'
import { Button, Dropdown } from 'react-bootstrap';

export default class ViewEvaluation extends Component {

    constructor(props){
        super(props);

        this.state={
            eveluations:[]
        };
    }

    componentDidMount(){
        this.retrieveEvaluation();
    }



    retrieveEvaluation(){
        axios.get("http://localhost:8000/api/admin/evaluation/get").then(res=>{
            if(res.data.success){
                this.setState({
                    eveluations:res.data.existingEveluation

                    
                });
                console.log(this.state.eveluations)
            }
        });
    }


       //Search bar
  filterData(roles, searchKey) {
    const result = eveluations.filter(
      (item) =>
        item.stfStaffId.toLowerCase().includes(searchKey) || //toLowerCase() helps to filter the data using the lowercase letters.
        item.stfStaffId.toUpperCase().includes(searchKey) || //toUpperCase() helps to filter the data using the Uppercase letters.
        item.stfResField.toUpperCase().includes(searchKey) ||
        item.stfResField.toLowerCase().includes(searchKey)
    );

    this.setState({ eveluations: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8000/api/admin/evaluation/get").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingEveluation, searchKey);
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
            SUPERVISOR EVALUATIONS
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
                            <th scope='col'>S.TITLE</th>
                            {/* <th scope='col'>DESCRIPTION</th> */}
                            <th scope='col'>GROUP NAME</th>
                            <th scope='col'>MEMBER NAME</th>
                            <th scope='col'>TOTAL MARKS</th>
                            {/* <th scope='col'>submission</th> */}
                            <th scope='col'>SUPERVISOR</th>


                            {/* <th scope='col'>ACTION</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.eveluations.map((eveluations,index)=>(
                            <tr>
                                <th scope='row'>{index+1}</th>

                                {/* <td onClick={()=>this.onClickDisabled(eveluations.stfUserActive,eveluations._id)}>
                                
                                 {eveluations.stfStaffId}
                                
                                </td> */}
                                <td>{eveluations.markingschemaTit}</td>
                                {/* <td>{eveluations.markingschemaDi}</td> */}
                                <td>{eveluations.groupName}</td>
                                <td>{eveluations.memeberName}</td>
                                <td>{eveluations.totalMarks}</td>
                                {/* <td>{eveluations.submission}</td> */}
                                <td>{eveluations.supervisor}</td>
                                
                                {/* <td> */}
                                   {/* <button className='btn btn-primary' style={{backgroundColor:'rgba(35, 84, 137 , 1'}}>
                                       <a href={`/view/roles/${roles._id}`} style={{color:'white',textDecoration:'none', fontWeight:'bold'}}>
                                      VIEW PROFILE
                                       </a>

                                   </button> */}
                                
                      {/* </td> */}
                               
                                
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
