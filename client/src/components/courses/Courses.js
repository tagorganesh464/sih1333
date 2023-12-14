import React from 'react';
import "./Courses.css"
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const Courses = () => {
  let navigate = useNavigate();
  const goToUpsc=()=>{
    navigate('/upsc')
  }
  
  const goToRailway=()=>{
    navigate('/railway')
  }
  const goToBank=()=>{
    navigate('/banking')
  }
  const goToSoftware=()=>{
    navigate('/software-development')
  }
  return (
    <div>
      
      <div className="container mt-2">
{/* <!--   <div className="card card-block mb-2">
    <h4 className="card-c-title">Card 1</h4>
    <p className="card-c-text">Welcom to bootstrap card styles</p>
    <a href="#" className="btn btn-primary">Submit</a>
  </div>   --> */}
  <div className="row">
    <div className="col-md-3 col-sm-6">
      <div className="card card-c card-block" onClick={goToUpsc}>
      <h4 className="card-c-title text-right"></h4>
    <img className='img4' src="https://static.pexels.com/photos/7096/people-woman-coffee-meeting.jpg" alt="Photo of sunset"></img>
        <h5 className="card-c-title mt-3 mb-3 text-center">UPSC</h5>
      
  </div>
    </div>
    <div className="col-md-3 col-sm-6">
      <div className="card card-c card-block" onClick={goToRailway}>
      <h4 className="card-c-title text-right"></h4>
    <img className='img4' src="https://static.pexels.com/photos/7357/startup-photos.jpg" alt="Photo of sunset"></img>
        <h5 className="card-c-title  mt-3 mb-3 text-center">Railways</h5>
         
  </div>
    </div>
    <div className="col-md-3 col-sm-6">
      <div className="card card-c card-block" onClick={goToBank}>
      <h4 className="card-c-title text-right"></h4>
    <img className='img4' src="https://static.pexels.com/photos/262550/pexels-photo-262550.jpeg" alt="Photo of sunset"></img>
        <h5 className="card-c-title  mt-3 mb-3 text-center">Banking</h5>
       
  </div>
    </div>
    <div className="col-md-3 col-sm-6">
      <div className="card card-c card-block" onClick={goToSoftware}>
      <h4 className="card-c-title text-right"></h4>
    <img className='img4' src="https://static.pexels.com/photos/326424/pexels-photo-326424.jpeg" alt="Photo of sunset"></img>
        <h5 className="card-c-title  mt-3 mb-3 text-center">Software Development</h5>
        
  </div>
    </div>    
  </div>
  
</div>

   </div>
  )
}

export default Courses
