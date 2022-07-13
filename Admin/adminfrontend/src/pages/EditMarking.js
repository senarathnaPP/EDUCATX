
import React, { useEffect, useState } from 'react';
import './Markings.css';
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import Footer from '../components/Footer/Footer';
import {Link } from "react-router-dom";

toast.configure()
const EditMarking = props =>{
    const [markingId, setMarkingId] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');
    

    const notify1 = () =>{
    toast.success('Marking Scheme is updated Successfully !', {position: toast.POSITION.TOP_CENTER})
    };

    const notify2 = () =>{
      toast.error('Marking Scheme is not updated !', {position: toast.POSITION.TOP_CENTER})
      };


    const changeOnClick = e => {
        e.preventDefault();

        const markings = {
            markingId,
            title,
            category,
            description,
            updatedDate

        };

        setMarkingId("");
    setTitle("");
    
    if((category >= 'a' && category <= 'z') || (category >= 'A' && category <= 'Z'))
    {
    setCategory("");
    }
    else{
      console.log("Bad Category");
      alert("Category should be a character")
      return false;
    }


    setDescription("");

    // Date shuold be greater than or equal today's date
    var date = new Date();
        console.log("Date: "+date.getDate()+
          "/"+(date.getMonth()+1)+
          "/"+date.getFullYear() );

          var mDate = new Date(updatedDate);
          console.log("MyDate: "+mDate.getDate()+
            "/"+(mDate.getMonth()+1)+
            "/"+mDate.getFullYear() );

          if(date.getFullYear() < mDate.getFullYear()){
            console.log("Good 1");
            setUpdatedDate();
          }
  
          else if(date.getFullYear() == mDate.getFullYear() && (date.getMonth()+1) < (mDate.getMonth()+1)){
            console.log("Good 2");
            setUpdatedDate();
          }

          else if((date.getMonth()+1) == (mDate.getMonth()+1) && date.getDate() <= mDate.getDate()){
            console.log("Good 3");    
            setUpdatedDate();
          }

          else {
            console.log("Bad");
            alert("Date is invalid! It should be greater than or equal to current date")
            return false;
          }

        axios.put(`http://localhost:8000/api/admin/marking/update/${props.match.params.id}`, markings)
            .then(res => {
              notify1("");
              console.log(res.data)
            })
            .catch(error =>{
               alert("Some Fields are Empty"),
               notify2("")
            }
            );
        };

    useEffect(() =>{
        axios
        .get(`http://localhost:8000/api/admin/marking/get/${props.match.params.id}`)
        .then(res => [
            setMarkingId(res.data.marking.markingId),
            setTitle(res.data.marking.title),
            setCategory(res.data.marking.category),
            setDescription(res.data.marking.description),
            setUpdatedDate(res.data.marking.updatedDate)
        ])
        .catch(error => console.log(error));
    }, []);



    return (
      <div>
        <div>
             <AdminNavbar/> 
             </div>
             <br></br>
        <div className='containerA'> 
        <h2>Update Marking Scheme</h2>
        <form onSubmit={changeOnClick} encType="multipart/form-data">
    <div className="form-group">
    <label htmlFor="markingId">ID</label>
    <input 
        type="text" 
        value={markingId}
        onChange={e => setMarkingId(e.target.value)}
        className="form-control" 
        placeholder="Enter marking scheme ID"/>
  </div>


  <div className="form-group">
    <label htmlFor="title">Title</label>
    <input 
        type="text" 
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="form-control" 
        placeholder="Enter title"/>
  </div>

  {/* <div className="form-group">
    <label htmlFor="category">Category</label>
    <input 
    type="text" 
    value={category}
    onChange={e => setCategory(e.target.value)}
    className="form-control" 
    placeholder="Enter category"/>
  </div> */}

<div className="form-group">
<label htmlFor="category">Category</label>
<select class="form-select" aria-label="Default select example" value={category}
    onChange={e => setCategory(e.target.value)}>
  <option selected>Select Category</option>
  <option >A</option>
  <option >B</option>
  <option >C</option>
  <option >D</option>
</select>
</div>

  <div className="form-group">
    <label htmlFor="description">Description</label>
    <textarea 
      value={description}
    className="form-control" 
    onChange={e => setDescription(e.target.value)}
    rows="3"></textarea>
  </div>

  <div className="form-group">
    <label htmlFor="updatedDate">Updated Date</label>
    <input 
    type="date" 
    value={updatedDate}
    className="form-control"
    onChange={e => setUpdatedDate(e.target.value)} 
    placeholder="Enter updated date"/>
  </div>
   <ul>
  <button type="submit" className="buttonAdd">Submit</button>
  <Link to="/viewMarkings" 
  >
  <button className="buttonAdd" >
    BACK TO LIST
  </button>
  </Link>

</ul>
</form>
             
</div>
<div>
              <br></br>
              <br></br>
              <br></br>
             <Footer/> 
             </div>
</div>
    )
};

export default EditMarking;