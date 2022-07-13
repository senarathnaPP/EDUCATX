import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import Footer from '../components/Footer/Footer';
import pdf from "../Images/file.jpg"
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';

toast.configure()
const Template = () => {
  const [templates, setTemplates] = useState();

  const notifyDel = () =>{
    toast.success('Template is deleted !', {position: toast.POSITION.TOP_CENTER})
};

  useEffect(() => {
    const fetchTemplates = async () => {
      const res = await fetch(`http://localhost:8000/template`);
      const data = await res.json();
      setTemplates(data);
    };
    fetchTemplates();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/template/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const updatedTemplates = templates.filter((template) => template._id !== id);
        setTemplates(updatedTemplates);
        notifyDel("")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <AdminNavbar/> 
       </div>
        <br></br>
        <div className='template__container'> 
                                <br></br>
                                <h1> DOCUMENT/PRESENTATION TEMPLATES </h1>
                                <br></br>
      <div>
      <Link to="/template/add"
      >
        <button className="buttonAdd">
          UPLOAD TEMPLATE
        </button>
      </Link>
      <div className='containerTemp' >
      <div className="row">
        {templates?.map((template) => (
          <div className='cards__item' key={template._id}>
            {/* className="col-md-1 card me-3 mt-2 p-0" */}
            <ul> 
            <img src={pdf} alt="" width={200} height={200} />
            </ul>
            <div className="p-2">
              <ul> 
              <h4  style={{ textDecoration: "none", color: "#0d6efd", fontWeight:'bold' }}>TEMPLATE :{template.name}</h4>
              <br></br>
              <div className="d-flex justify-content-between align-items-center">
                <div> 
              <button className="btn btn-success btn-sm" style={{backgroundColor:'rgba(35, 84, 137 , 1)',textDecoration:'none',color:'white',fontWeight:'bold'}}> 
              <a href={template.avatar} style={{ textDecoration: "none", color: "white" }} download>VIEW & DOWNLOAD </a>
              </button>
              </div>
              <div> 
                <button
                  className="btn btn-warning btn-sm"
                  style={{backgroundColor:'rgb(17, 100, 6)'}}
                >
                  <Link to={`/template/edit/${template._id}`} style={{ textDecoration: "none", color: "white", fontWeight:'bold' }}>
                    EDIT TEMPLATE
                  </Link>
                </button>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  style={{ textDecoration: "none", color: "white", fontWeight:'bold', backgroundColor:'rgb(158, 7, 7)' }}
                  onClick={() => handleDelete(template._id)}
                >
                  DELETE TEMPLATE
                </button>
    
              </div>
              </ul>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
        </div>
        <div>
             <Footer/> 
        </div>
             
    </div>
  );
};

export default Template;
