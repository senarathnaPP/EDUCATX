import React, { Component } from 'react';
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import Footer from '../components/Footer/Footer';
import axios from 'axios'

export default class viewResearchTopics extends Component {

    constructor(props){
        super(props);

        this.state={
            topics:[]
        };
    }

    componentDidMount(){
        this.retrieveTopics();
    }

    retrieveTopics(){
        axios.get("http://localhost:8000/api/admin/topics/get").then(res=>{
            if(res.data.success){
                this.setState({
                    topics:res.data.existingTopics
                });
                console.log(this.state.topics)
            }
        });
    }

    onDelete = (id) => {
        if (window.confirm("Do you want to remove this topic?")) {
          axios.delete(`http://localhost:8000/api/admin/topics/delete/${id}`).then((res) => {
            alert("Topic removed Successfully!");
            this.retrieveTopics();
          });
        }
      };

       //Search bar
  filterData(submissions, searchKey) {
    const result = submissions.filter(
      (item) =>
        item.researchField.toLowerCase().includes(searchKey) || //toLowerCase() helps to filter the data using the lowercase letters.
        item.researchField.toUpperCase().includes(searchKey) || //toUpperCase() helps to filter the data using the Uppercase letters.
        item.topic.toUpperCase().includes(searchKey) ||
        item.topic.toLowerCase().includes(searchKey)
    );

    this.setState({ topics: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8000/api/admin/topics/get").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingTopics, searchKey);
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
                    marginTop: "-90px",
                    background: "#D3D3D3",
                    }}>
               
            <br />
            <div className='card'
                style={{
                    marginTop:'100px',
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
              ALL TOPICS
            </h4><br/>&nbsp;&nbsp;&nbsp;
            <button className='btn btn-success' style={{width:'250px',marginLeft:'350px',marginTop:'20px',backgroundColor:'rgba(35, 84, 137 , 1)'}}><a href='/createTopics' style={{textDecoration:'none',color:'white'}}>
                        ADD RESEARCH TOPICS
          </a></button>

          <div>
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}
              style={{
                width: "250px",
                marginLeft: "10px",
                marginTop: "-40px",
                borderColor: "rgba(6, 21, 117,0.5)",
              }}
            ></input>
          </div>
          <br /><br />
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
                       
                            <th scope="row">TOPIC</th>
                            <th scope="row">RESEARCH FIELD</th>
                            <th scope="row">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.topics.map((topics,index)=>(
                            <tr>
                                <th scope='row'>{index+1}</th>
                               
                                <td>{topics.topic}</td>
                                <td>{topics.researchField}</td>
                                
                                <td>
                                <button  className='btn btn-warning' style={{backgroundColor:'rgb(17, 100, 6)'}}>
                                    <a href={`/topics/edit/${topics._id}`} style={{color:'white', textDecoration:'none', fontWeight:'bold'}}>
                                        <i className='fas fa-edit'></i>
                                        &nbsp;EDIT
                                    </a>
                                    </button>
                                    &nbsp;
                                    <a className ="btn btn-danger" href="#" onClick={() => this.onDelete(topics._id)} style={{backgroundColor:'rgb(158, 7, 7)', textDecoration: "none", color: "white" }}
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
