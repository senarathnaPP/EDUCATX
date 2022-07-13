import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link } from "react-router-dom";
import './Markings.css';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import Footer from '../components/Footer/Footer';


toast.configure()
function MarkCatC() {
    const [markings, setMarkings] = useState([])


    useEffect(() =>{
        
        axios.get('http://localhost:8000/api/admin/marking/getcategoryC')
            .then(res => {
                console.log("Ishani", res)  
                setMarkings(res.data.existingMarkings) 
            }
            )
            .catch(err =>{
                console.log(err)
            })
    }, [])


      

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
                                <h1> MARKING CATEGORY : C</h1>
                                <br></br>
                                     
                                    <Link to="/viewMarkings" 
                                     >
                                         <button className="buttonAdd"> 
                                        Back to All Marking Schemes
                                        </button>
                                    </Link>
                                     
                                </div>
                                 
                                
                {
                    markings.map((marking, key) => 
                    
                        <div className='containerA' key={key}> 
                            <h2><b>Marking Scheme:</b>  {marking.title}</h2>
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


export default MarkCatC;

 