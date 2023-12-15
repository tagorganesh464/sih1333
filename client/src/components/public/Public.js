import React, { useState, useEffect} from "react";
import { imgDB } from "../config/firebase.config";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Public = () => {
  const [data, setData] = useState([]);

  let [error, setError] = useState("");
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    img: "",
    post: "",
    role: "public",
  });
  const handleUpload = (e) => {
    console.log(e.target.files[0]);
    const imgs = ref(imgDB, `Imgs/${v4()}`);
    uploadBytes(imgs, e.target.files[0]).then((data) => {
      console.log(data, "imgs");
      getDownloadURL(data.ref).then((val) => {
        setFormData({
          ...formData,
          [e.target.name]: val,
        });
      });
    });
  };
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
   
   
  };
  const modifiedFormData = {
    img: formData.img,
    post: formData.post,
    role: formData.role,
  };

  let formSubmit = (newUser) => {
   
    axios
      .post(`/job-api/add-job`, modifiedFormData)
      .then((response) => {
        if (response.status === 201) {
          console.log("successfull");
          getJobs();
        }
        if (response.status !== 201) {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.message);
        } else if (err.request) {
          setError(err.message);
        } else {
          setError(err.message);
        }
      });
    reset();
  };


  
  const getJobs = () => {
    axios
      .get(`/job-api/get-job/public`)
      .then((response) => {
        if (response.status === 200) {
          setData(response.data.payload);
          
         
        }
        if (response.status !== 200) {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.message);
          console.log(err.response);
        } else if (err.request) {
          setError(err.message);
        } else {
          setError(err.message);
        }
      });
  };
  useEffect(() => {
    getJobs();
  }, []);
  return (
    <div>

      {/* job apply cards */}
      {
          data?.map((job,index)=>(<div className="card mb-3" key={index} >
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={job.img} className="card-img" alt="..."></img>
            </div>
             <div className="col-md-8">
              <div className="card-body">
                 <h5 className="card-title">{job.post}</h5>
                <p className="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <p className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </p> 
              </div>
            </div> 
          
        </div>
        </div>
        ))
      }

      {/* input for jobs */}

      <form onSubmit={handleSubmit(formSubmit)} action="" className="mt-5">
        <div className=" form-floating">
          <div className="input-group">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                name="img"
                id="inputGroupFile"
                onChange={(e) => handleUpload(e)}
                // {...register("img", { required: true })}
              ></input>
              <label className="custom-file-label" htmlFor="inputGroupFile">
                Choose file
              </label>
            </div>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">
                Upload
              </button>
            </div>
          </div>
          {errors.img?.type === "required" && (
            <p className=" text-danger">*image is required</p>
          )}
        </div>

        <div className="form-floating">
          <input
            type="text"
            id="post"
            name="post"
            className="form-control "
            value={formData.post}
            onChange={handleChange}
            // {...register("post", { required: true, minLength: 4 })}
            placeholder="xyz"
          ></input>
          <label htmlFor="post" className="text-dark">
            post
          </label>
          {errors.post?.type === "required" && (
            <p className=" text-danger">*enter your post</p>
          )}
          {errors.post?.type === "minLength" && (
            <p className=" text-danger">*minimum 4 post word is required</p>
          )}
        </div>

        <button
          type="submit"
          className="btn-primary button d-block m-auto mt-5"
        >
          Update
        </button>
      </form>
      
    </div>
  );
};

export default Public;
