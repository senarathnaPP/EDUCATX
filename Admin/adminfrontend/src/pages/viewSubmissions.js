import React, { Component } from 'react';
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import Footer from '../components/Footer/Footer';
import axios from 'axios'

export default class viewSubmissions extends Component {

    constructor(props){
        super(props);

        this.state={
            submissions:[]
        };
    }

    componentDidMount(){
        this.retrieveSubmissions();   
    }

    retrieveSubmissions(){
        axios.get("http://localhost:8000/api/admin/submission/get").then(res=>{
            if(res.data.success){
                this.setState({
                    submissions:res.data.existingSubmissions
                });
                console.log(this.state.submissions)
            }
        });
    }

   

    onDelete = (id) => {
        if (window.confirm("Do you want to remove this submission?")) {
          axios.delete(`http://localhost:8000/api/admin/submission/delete/${id}`).then((res) => {
            alert("Submission removed Successfully!");
            this.retrieveSubmissions();
          });
        }
      };

       //Search bar
  filterData(submissions, searchKey) {
    const result = submissions.filter(
      (item) =>
        item.submissionId.toLowerCase().includes(searchKey) || //toLowerCase() helps to filter the data using the lowercase letters.
        item.submissionId.toUpperCase().includes(searchKey) || //toUpperCase() helps to filter the data using the Uppercase letters.
        item.topic.toUpperCase().includes(searchKey) ||
        item.topic.toLowerCase().includes(searchKey)
    );

    this.setState({ submissions: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8000/api/admin/submission/get").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingSubmissions, searchKey);
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
                    marginTop: "0px",
                    background: "#D3D3D3",
                    }}>
               
            <br />
            <div className='card'
                style={{
                    //marginTop:'400px',
                    height:'auto'
                }}
            ><br/>
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
              ALL SUBMISSIONS
            </h4>
     
          <ul> 
          <button className='btn btn-success' style={{width:'200px',marginLeft:'500px',marginTop:"46px",backgroundColor:'rgba(35, 84, 137 , 1)',height:'auto'}}><a href='/createSubmission' style={{textDecoration:'none',color:'white', fontWeight:'bold'}}>
                        ADD A SUBMISSION
          </a></button>
          <button className='btn btn-success' style={{width:'200px',marginLeft:'500px',marginTop:"46px",backgroundColor:'rgba(35, 84, 137 , 1)',height:'auto'}}><a href='/viewEvaluation' style={{textDecoration:'none',color:'white', fontWeight:'bold'}}>
                        EVALUATIONS
          </a></button>
          </ul>
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
                marginTop: "-30px",
                borderColor: "rgba(6, 21, 117,0.5)",
              }}
            ></input>
          </div>
          <br />
  
          <br/>
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
                            <th scope="row">SUBMISSION ID</th>
                            <th scope="row">TOPIC</th>
                            <th scope="row">DESCRIPTION</th>
                            <th scope="row">DUE DATE</th>
                            <th scope="row">DUE TIME</th>
                            <th scope="row">TYPE</th>
                            <th scope="row">MARKING CATEGORY</th>
                            <th scope="row" style={{width:'auto'}}>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.submissions.map((submissions,index)=>(
                            <tr>
                                <th scope='row'>{index+1}</th>
                                <td>
                               
                                 {submissions.submissionId}
                             
                                </td>
                                <td>{submissions.topic}</td>
                                <td>{submissions.description}</td>
                                <td>{submissions.dueDate}</td>
                                <td>{submissions.dueTime}</td>
                                <td>{submissions.type}</td>
                                <td>{submissions.category}</td>
                                <td>
                                   <button  className='btn btn-warning' style={{backgroundColor:'rgb(17, 100, 6)'}}><a href={`/edit/submissions/${submissions._id}`} style={{color:'white',textDecoration:'none', fontWeight:'bold'}}>
                                        <i className='fas fa-edit'></i>
                                        &nbsp;EDIT
                                    </a>
                                    </button><br/>
                                   
                                    <a className ="btn btn-danger" href="#" onClick={() => this.onDelete(submissions._id)} style={{ backgroundColor:'rgb(158, 7, 7)', textDecoration: "none", color: "white" ,marginTop:'5px'}}
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
