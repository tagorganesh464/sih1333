import React, { useEffect, useContext } from "react";
import { loginContext } from "../../context/loginContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./Login.css";
function Login() {
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let [currentUser, error, userLoginStatus, loginUser, logoutUser, role] =
    useContext(loginContext);
  // let [err,setErr]=useState("")
  let handleUserLogin = (userobj) => {
    loginUser(userobj);
  };
  useEffect(() => {
    if (userLoginStatus === true ) {
      navigate("/jobs/public");
    } 
  }, [userLoginStatus]);
  return (
  <div className="Login container">
 
 {error?.length !== 0 && <p className="text-danger display-1"> {error}</p>}
     
     
    <div className="cat m-auto mt-5 " >
    <h2 className="title">Login</h2>
    <form onSubmit={handleSubmit(handleUserLogin)} action="">
    
    <div className="inputbox form-floating">
      <i className="fa-regular fa-user"></i>
      <input
        type="text"
        id="username"
        className="form-control "
        {...register("username", {
          required: true,
          minLength: 4,
          maxLength: 22,
        })}
        placeholder="xyz"
      ></input>
        <label htmlFor="username" className="text-dark" >
        UserName
      </label>
      {errors.username?.type === "required" && (
        <p className=" text-danger">*enter your first name</p>
      )}
      {errors.username?.type === "minLength" && (
        <p className=" text-danger">*minimum 4 letter word is required</p>
      )}
      {errors.username?.type === "maxLength" && (
        <p className=" text-danger">
          *maximum 22 letter word is required
        </p>
      )}
    </div>

    <div className="inputbox form-floating">
      <i className="fa-solid fa-lock"></i>
     
      <input
        type="password"
        id="password"
        className="form-control "
        {...register("password", { required: true, minLength: 4 })}
        placeholder="xyz"
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
    
  <button type="submit" className="button-l d-block m-auto mt-5">Login</button>


  </form>
    </div>
    </div>
      
    

   
   
      

    
    
 
      
      
  )
}

export default Login;