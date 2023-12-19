import React from "react";
import axios from "axios";


import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Forgot.css";
import { useForm } from "react-hook-form";
function Forgot() {
    let navigate = useNavigate();
  let [error, setError] = useState("");
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  let formSubmit = (newUser) => {
    newUser = {
      ...newUser,
      middlename: newUser.middlename || "",
      role: "employee",
      tasks: [],
    };

    axios
      .post(`/user-api/forgot-password`, newUser)
      .then((response) => {
        if (response.status === 201) {
          navigate("/login");
        }
        if (response.status !== 201) {
          setError(response.data.message);
          alert(response.data.message);
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

  return (
    <div className="forgot-main">
      {error?.length !== 0 && <p className="text-danger display-1"> {error}</p>}
      <div className="cat m-auto  shadow-lg  rounded">
        <h2 className="title">Forgot Password</h2>
        <p>Enter you email for an otp</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="inputbox form-floating">
            <i className="fa-regular fa-user"></i>
            <input
              type="email"
              id="email"
              className="form-control "
              {...register("email", {
                required: true,
                minLength: 4,
              })}
              placeholder="xyz"
            ></input>
            <label htmlFor="email" className="text-dark">
              email
            </label>
            {errors.username?.type === "required" && (
              <p className=" text-danger">*enter your email</p>
            )}
            {errors.username?.type === "minLength" && (
              <p className=" text-danger">*minimum 4 letter word is required</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary d-block m-auto">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forgot;
