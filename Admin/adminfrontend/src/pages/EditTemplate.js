import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import Footer from '../components/Footer/Footer';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';
import {Link } from "react-router-dom";

toast.configure()
const EditTemplate = ({ match }) => {
  console.log(match);
  const history = useHistory();
  const [data, setData] = useState({
    name: "",
    image: "",
  });

  const notify1 = () =>{
    toast.success('Template is updated Successfully !', {position: toast.POSITION.TOP_CENTER})
  };

  useEffect(() => {
    fetch(`http://localhost:8000/template/${match.params.id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append("image", data.image);
      formData.append("name", data.name);

      const res = await fetch(`http://localhost:8000/template/${match.params.id}`, {
        method: "PUT",
        body: formData,
      });
      if (res.ok) {
        setData({ name: "", image: "" });
        // history.replace("/");
        notify1("");
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
       <br></br>
       <h3 style={{textAlign: "center", textDecoration: "none", color: "#0d6efd", fontWeight:'bold' }}> UPDATE TEMPLATES </h3>
       <br></br>
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <div className="mb-3">
        <input
          className="form-control"
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange("name")}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          type="file"
          // accept="image/*"
          name="image"
          onChange={handleChange("image")}
        />
      </div>
      <ul> 
        <button className="buttonAdd" onClick={handleSubmit}>
          UPDATE TEMPLATE
        </button>
        <Link to="/viewTemplates" 
        >
        <button className="buttonAdd">
          BACK TO LIST
        </button>
        </Link>
      </ul>
    </div>
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
             <Footer/> 
             </div>
    </div>
  );
};

export default EditTemplate;
