import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link } from "react-router-dom";
import './Markings.css';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import Footer from '../components/Footer/Footer';


toast.configure()
function ViewMarkings() {
    const [markings, setMarkings] = useState([])

    const notifyDel = () =>{
        toast.success('Marking Scheme is deleted !', {position: toast.POSITION.TOP_CENTER})
    };

    const notify2 = () =>{
        toast.error('Template is not added !', {position: toast.POSITION.TOP_CENTER})
       };
       
    useEffect(() =>{
        axios.get('http://localhost:8000/api/admin/marking/get')
            .then(res => {
                console.log(res)  
                setMarkings(res.data.existingMarkings) 
            })
            .catch(err =>{
                console.log(err)
            })
    }, [])

    //Delete Marking Scheme by ID
      const deleteMarking = id => {
          axios.delete(`http://localhost:8000/api/admin/marking/delete/${id}`)
          .then(res => 
            console.log(res.data),
            notifyDel(""))
          setMarkings(markings.filter(elem => elem._id !==id))
      } 

      

    return(
        <div>
             <div>
             <AdminNavbar/> 
             </div>
             <br></br>
                {/* {
                    markings.map(marking => 
                    <li key={marking.markingId}>{marking.title}</li>)    
                } */}
                                  
                                <div className='markings__container'> 
                                <br></br>
                                <h1> MARKING SCHEMES</h1>
                                <br></br>
                                   <ul>
                                    <Link to="/createMarking" 
                                     >
                                         <button className="buttonAdd"> 
                                        Create Marking Scheme
                                        </button>
                                    </Link>
                                    </ul>
                                    <ul>
                                    <Link to="/markingCatA" 
                                     >
                                         <button className="buttonAdd"> 
                                          A 
                                        </button>
                                    </Link>
                                    <Link to="/markingCatB" 
                                     >
                                         <button className="buttonAdd"> 
                                          B 
                                        </button>
                                    </Link>
                                    <Link to="/markingCatC" 
                                     >
                                         <button className="buttonAdd"> 
                                          C
                                        </button>
                                    </Link>
                                    <Link to="/markingCatD" 
                                     >
                                         <button className="buttonAdd"> 
                                          D 
                                        </button>
                                    </Link>

                                    </ul>
                                     
                                </div>
                                 
                                
                {
                    markings.map((marking, key) => 
                    
                        <div className='containerA' key={key}> 
                            <h3><b>MARKING SCHEME:</b>  {marking.title}</h3>
                            <h5>CATEGORY: {marking.category}</h5>
                            <div className='containerB'>
                            <style>
                             {`#p-wrap {
                              white-space: pre-line;
                             }`}
                            </style>
                            <p id="p-wrap">{marking.description}</p>
                            </div>
                            <br></br>
                            <div  className='dateBox'>
                            <span >{marking.updatedDate}</span>
                            </div>

                            <div className="row my-5">
                                 
                                    <Link to={`/edit/markings/${marking._id}`} 
                                    className="btn btn-success" style={{height: '60px', width : '140px',backgroundColor:'rgb(17, 100, 6)', color:'white',textDecoration:'none', fontWeight:'bold'}}>
                                        Edit Marking Scheme
                                    </Link>
                                 

                                <div className="col-sm-2"> 
                                    <button onClick={() => deleteMarking(marking._id)} className="btn btn-danger" style={{height: '60px', width : '170px',backgroundColor:'rgb(158, 7, 7)', color:'white',textDecoration:'none', fontWeight:'bold'}}>
                                        Delete Marking Scheme
                                    </button>
                                </div>
                            </div>

                                
                            <hr/>

                        </div>  
                         
                         )
                         
                }

             <div>
             <Footer/> 
             </div>
             
        </div>
    )
            
} 


export default ViewMarkings;

 