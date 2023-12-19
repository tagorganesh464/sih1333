
import { loginContext } from "../../context/loginContext";
import { imgDB } from "../config/firebase.config";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import "./Public.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import { MdOutlineEventSeat } from "react-icons/md";
import React, { createContext, useContext, useEffect, useState } from "react";
import styled from "styled-components";

const RatingContext = createContext();

const StyledPost = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
`;

const StyledRatingContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledRating = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 12px;
  }

  &.post-rating-selected > .post-rating-button,
  &.post-rating-selected > .post-rating-count {
    color: #009578;
  }
`;

const StyledRatingButton = styled.span`
  margin-right: 6px;
  cursor: pointer;
  color: #555555;

  &:not(.post-rating-selected):hover {
    color: #000000;
  }
`;
const Public = () => {
  let [currentUser, error, userLoginStatus, loginUser, logoutUser, role] =
  useContext(loginContext);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [data, setData] = useState([]);

  let [errorr, setError] = useState("");
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    img: "",
    organisation: "",
    post: "",
    method: "",
    lastDate: "",
    vacancies: "",
    link: "",
    role: "public",
    
  });
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return; // Handle if no file is selected
  
    // Replace with your Firebase storage reference

    const imgs = ref(imgDB, `Imgs/${v4()}`);
    const uploadTask = uploadBytesResumable(imgs, file);

    // Listen to the upload progress
    uploadTask.on("state_changed", (snapshot) => {
      // Calculate progress percentage
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress);
    });

    try {
      // Wait for the upload to complete
      await uploadTask;

      // Retrieve the download URL
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log(downloadURL);
      // Update your state or perform other actions
      setFormData({
        ...formData,
        img: downloadURL,
      });
    } catch (error) {
      // Handle errors
      console.error("Error uploading image:", error);
    }
  };
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const modifiedFormData = {
    img: formData.img,
    organisation: formData.organisation,
    post: formData.post,
    method: formData.method,
    lastDate: formData.lastDate,
    vacancies: formData.vacancies,
    link: formData.link,
    role: formData.role,
    
  };

  let formSubmit = (newUser) => {

    axios
      .post(`/job-api/add-public`, modifiedFormData)
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


  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    // Remove stored rating when component unmounts
    return () => {
      localStorage.removeItem("selectedRating");
    };
  }, []);

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
    <div className="container">
      {}
      <div className="tab-content">
        <div id="tab-1" className="tab-pane fade show p-0 active">
          {/* job apply cards */}
          {data?.map((job, index) => (
            <div
              className="job-item p-4 mb-4 card shadow-lg p-3 mb-5 bg-white rounded"
              key={index}
            >
              <div className="card-body">
                <div className="row g-4">
                  <div className="col-sm-12 col-md-8 d-flex align-items-center">
                    <img
                      className="flex-shrink-0 img-fluid border rounded"
                      src={job.img}
                      alt=""
                      style={{ width: "80px", height: "80px" }}
                    />
                    <div className="text-start ps-4">
                      <h3 className="mb-3 font-weight-bold">
                        {job.organisation}
                      </h3>
                      <p className="lead">{job.post}</p>
                      {/* <span className="text-truncate me-3">
              <i className="fa fa-map-marker-alt text-primary me-2"></i>New York, USA
            </span> */}
                      <span className="text-truncate me-3">
                        <i className="far fa-clock text-primary me-2"></i>
                        {job.method}
                      </span>
                      <span className="text-truncate me-3">
                        {/* <i className="far fa-money-bill-alt text-primary me-2"></i> */}
                        <MdOutlineEventSeat className="me-2" />
                        {job.vacancies} Vacancies
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                    <div className="d-flex mb-3">
                    <RatingContext.Provider value={{ selectedRating, setSelectedRating }}>
      <StyledPost className="post" data-post-id="7712">
        <StyledRatingContainer className="post-ratings-container">
          <RatingButton icon="thumb_up" />
          <RatingButton icon="thumb_down" />
        </StyledRatingContainer>
      </StyledPost>
    </RatingContext.Provider>
                      <a className="btn btn-success mx-2" href={job.link}>
                        Get Details
                      </a>
                    </div>
                    <small className="text-truncate">
                      <i className="far fa-calendar-alt text-primary me-2"></i>
                      Last Date: {job.lastDate.split("-").reverse().join("-")}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* input for jobs */}
      {userLoginStatus && role === "admin" && (
        <div className="container spider-man mb-4 w-50 px-5" py-3>
          <form onSubmit={handleSubmit(formSubmit)} action="" className="mt-5">
            <div className="inputbox2 form-floating">
              <div className="input-group">
                <div className="custom-file w-75">
                  <label className="custom-file-label" htmlFor="inputGroupFile">
                    Choose file for image uploading
                  </label>
                  <input
                    type="file"
                    className="custom-file-input"
                    name="img"
                    id="inputGroupFile"
                    onChange={(e) => handleUpload(e)}
                  />
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="progress-container">
                      <ProgressBar
                        now={uploadProgress}
                        label={`${uploadProgress.toFixed(2)}%`}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="inputbox2 form-floating">
              <i className="fa-solid fa-sitemap"></i>
              <input
                type="text"
                id="organisation"
                name="organisation"
                className="form-control "
                placeholder="xyz"
                value={formData.organisation}
                onChange={handleChange}
              ></input>
              <label htmlFor="organisation" className="text-dark">
                Organisation
              </label>
            </div>

            <div className="inputbox2 form-floating">
              <i className="fa-solid fa-signs-post"></i>
              <input
                type="text"
                id="post"
                name="post"
                className="form-control "
                value={formData.post}
                onChange={handleChange}
                placeholder="xyz"
              ></input>
              <label htmlFor="post" className="text-dark">
                post
              </label>
            </div>
            <div className="inputbox2 form-floating">
              <i className="fa-solid fa-calendar-check"></i>
              <input
                type="text"
                id="method"
                className="form-control "
                placeholder="xyz"
                name="method"
                value={formData.method}
                onChange={handleChange}
              ></input>
              <label htmlFor="method" className="text-dark">
               Job type
              </label>
            </div>
            <div className="inputbox2 form-floating">
              <i className="fa-solid fa-calendar-days"></i>
              <input
                type="date"
                id="lastDate"
                className="form-control "
                placeholder="xyz"
                name="lastDate"
                value={formData.lastDate}
                onChange={handleChange}
              ></input>
              <label htmlFor="lastDate" className="text-dark">
                Last Date
              </label>
            </div>
            <div className="inputbox2 form-floating">
              <i className="fa-solid fa-percent"></i>
              <input
                type="number"
                id="vacancies"
                className="form-control "
                placeholder="xyz"
                name="vacancies"
                value={formData.vacancies}
                onChange={handleChange}
              ></input>
              <label htmlFor="vacancies" className="text-dark">
                Vacancies
              </label>
            </div>
            <div className="inputbox2 form-floating">
              <i className="fa-solid fa-link"></i>
              <input
                type="text"
                id="link"
                className="form-control "
                placeholder="xyz"
                name="link"
                value={formData.link}
                onChange={handleChange}
              ></input>
              <label htmlFor="link" className="text-dark">
                Details Doc Link
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary d-block m-auto my-4"
            >
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const RatingButton = ({ icon }) => {
  const { selectedRating, setSelectedRating } = useContext(RatingContext);

  const handleRatingClick = async () => {
    if (selectedRating === icon) {
      return;
    }

    setSelectedRating(icon);

    const postId = document.querySelector(".post").dataset.postId;
    const likeOrDislike = icon === "thumb_up" ? "like" : "dislike";
    // Your API call logic goes here
    // const response = await fetch(`/posts/${postId}/${likeOrDislike}`);
    // const body = await response.json();
    // console.log(body);
  };

  return (
    <StyledRating className={`post-rating ${selectedRating === icon ? "post-rating-selected" : ""}`}>
      <StyledRatingButton className="post-rating-button material-icons" onClick={handleRatingClick}>
        {icon}
      </StyledRatingButton>
     
    </StyledRating>
  );
};

export default Public;
