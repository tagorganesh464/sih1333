import axios from "axios";

import React from "react";
import { useState ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { useForm } from "react-hook-form";

const Register = () => {
  let [error, setError] = useState("");
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  

  let formSubmit = (newUser) => {
    

    axios
      .post(`/user-api/register-user`, newUser)
      .then((response) => {
        if (response.status === 201) {
          navigate("/login");
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

  return (
    <div className="register container ">
      <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.4.0/css/all.css"
      ></link>
      {/* first row for username */}
      {error?.length !== 0 && <p className="text-danger display-1"> {error}</p>}
      <div className="pt-4">
        <div className="card dog  bg-transparent  m-auto my-5">
          <div className="card-body  mb-5  ">
            <h3 className="title">Sign up</h3>

            <form onSubmit={handleSubmit(formSubmit)}>
              <div className="row justify-content-center ">
                <div className="col">
                  {/* first name */}
                  <div className="inputbox1 form-floating">
                    <i className="fa-regular fa-user"></i>
                    <input
                      type="text"
                      id="firstname"
                      className="form-control "
                      placeholder="xyz"
                      {...register("firstname", {
                        required: true,
                        
                      })}
                    ></input>
                    <label htmlFor="firstname" className="text-dark">
                      First Name
                    </label>

                    {errors.username?.type === "required" && (
                      <p className=" text-danger">*enter your first name</p>
                    )}
                    
                  </div>
                  {/* middle name */}
                  <div className="inputbox1 form-floating">
                    <i className="fa-regular fa-user"></i>
                    <input
                      type="text"
                      id="middlename"
                      className="form-control "
                      placeholder="xyz"
                      {...register("middlename", {
                        required: true,
                        
                      })}
                    ></input>
                    <label htmlFor="middlename" className="text-dark">
                      Middle Name
                    </label>

                    {errors.username?.type === "required" && (
                      <p className=" text-danger">*enter your first name</p>
                    )}
                    
                  </div>
                  {/*  last name*/}
                  <div className="inputbox1 form-floating">
                    <i className="fa-regular fa-user"></i>
                    <input
                      type="text"
                      id="lastname"
                      className="form-control "
                      placeholder="xyz"
                      {...register("lastname", {
                        required: true,
                        
                      })}
                    ></input>
                    <label htmlFor="lastname" className="text-dark">
                      Last Name
                    </label>

                    {errors.username?.type === "required" && (
                      <p className=" text-danger">*enter your first name</p>
                    )}
                    
                  </div>
                  <div className="inputbox1 form-floating">
                    <i className="fa-solid fa-lock"></i>
                    <input
                      type="password"
                      id="password"
                      className="form-control "
                      placeholder="xyz"
                      {...register("password", {
                        required: true,
                        minLength: 4,
                      })}
                    ></input>
                    <label htmlFor="password" className="text-dark">
                      password
                    </label>

                    {errors.password?.type === "required" && (
                      <p className=" text-danger">*enter your password</p>
                    )}
                    {errors.password?.type === "minLength" && (
                      <p className=" text-danger">
                        *minimum 4 password word is required
                      </p>
                    )}
                  </div>

                  {/* second row   */}

                  <div className="inputbox1 form-floating">
                    <i className="fa-solid fa-calendar-days"></i>
                    <input
                      type="date"
                      id="dob"
                      className="form-control "
                      placeholder="xyz"
                      {...register("dob", { required: true })}
                    ></input>
                    <label htmlFor="dob" className="text-dark">
                      date of birth
                    </label>

                    {errors.dob?.type === "required" && (
                      <span className="text-sm text-danger">
                        *date of birth is required
                      </span>
                    )}
                  </div>

                  {/*  another col */}
                  <div className="inputbox1 form-floating">
                    <i className="fa-solid fa-user-magnifying-glass"></i>
                    <input
                      type="text"
                      id="gender"
                      className="form-control "
                      placeholder="xyz"
                      {...register("gender", { required: true })}
                    ></input>
                    <label htmlFor="gender" className="text-dark">
                      Gender
                    </label>

                    {errors.gender?.type === "required" && (
                      <p className=" text-danger">*enter your gender</p>
                    )}
                  </div>

                  {/* third row  contains Email and Phone Number*/}

                  <div className="inputbox1 form-floating">
                    <i className="fa-solid fa-envelope"></i>
                    <input
                      type="email"
                      id="email"
                      className="form-control "
                      placeholder="xyz"
                      {...register("email", { required: true })}
                    ></input>
                    <label htmlFor="email" className="text-dark">
                      Email
                    </label>

                    {errors.email?.type === "required" && (
                      <p className=" text-danger">*enter your valid email id</p>
                    )}
                  </div>
                  <div className="inputbox1 form-floating">
                    <i className="fa-solid fa-phone"></i>
                    <input
                      type="number"
                      id="phone"
                      className="form-control "
                      placeholder="xyz"
                      {...register("phone", { required: true, maxLength: 11 })}
                    ></input>
                    <label htmlFor="phone" className="text-dark">
                      Phone Number
                    </label>

                    {errors.phone?.type === "required" && (
                      <p className=" text-danger">*enter your Phone number</p>
                    )}
                    {errors.phone?.type === "maxLength" && (
                      <p className=" text-danger">
                        *maximum number length should be 10
                      </p>
                    )}
                  </div>
                </div>
               
              </div>

              <button type="submit" className="button d-block m-auto mt-5">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;