import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from "react-router"; 
export default class editTopics extends Component {

    constructor(props){
        super(props);
        this.state={
            
            topic:"",
            researchField:""
        }
    }

    handleInputChange=(e)=>{
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }

    onSubmit=(e)=> {
        e.preventDefault();
        /** */
            const id = this.props.match.params.id;

            const {topic, researchField} = this.state;

            const data = {
                
                topic: topic,
                researchField:researchField
            }

            console.log(data);

            axios.put(`http://localhost:8000/api/admin/topics/update/${id}`, data).then((res) => {
                if (res.data.success) {
                    alert("Topic Details Updated Successfully!")
                    this.setState(
                        {
                            topic: "",
                            researchField:""
                        }
                    )
                }
            })
        }
    
        componentDidMount(){
            const id=this.props.match.params.id;
    
            axios.get(`http://localhost:8000/api/admin/topics/get/${id}`).then((res) =>{
                if(res.data.success){
                    this.setState({
                        
                        topic:res.data.researchTopic.topic,
                        researchField:res.data.researchTopic.researchField,
                        
                    });
    
                    console.log(this.state.topic);
                }
            });
        }

  render() {
    return (
        <div className='container'>
        <div style={{width:'100%',margin:'40px',borderRadius:'0px',backgroundColor: '#D3D3D3',marginTop:'-30px',marginLeft:'0px'}}>
        <div className="col-md-8 mt-4 mx-auto"><br/><br/><br/>
        

    <h1 className="h3 mb-3 font-weight-normal" style={{color: 'rgba(6, 21, 117)',fontWeight:'bolder'}}>EDIT THE TOPIC DETAILS</h1>
    <button className="btn btn-danger" style={{width:'160px',backgroundColor:'rgb(9, 38, 68 )'}}>
        <a href="/getTopics" style={{textDecoration:'none',color:'white',fontWeight:'bold'}}>
          View Topics
        </a></button><br/><br/>
            
            <form className="needs-validation" noValidate>
               
                <div className="form-group" style={{marginBottom:'15px'}}>
                    <label style={{marginBottom:'5px',fontWeight:'bold',color:'black',fontSize:'20px'}}>TOPIC</label>
                    <input type="text" className="form-control" name="topic" placeholder="Enter Unit Price" value={this.state.topic} onChange={this.handleInputChange}/>
                </div>

                <div className="form-group" style={{marginBottom:'15px'}}>
                    <label style={{marginBottom:'5px',fontWeight:'bold',color:'black',fontSize:'20px'}}>RESEARCH FIELD</label>
                    <input type="text" className="form-control" name="researchField" placeholder="Enter researchField" value={this.state.researchField} onChange={this.handleInputChange}/>
                    
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
