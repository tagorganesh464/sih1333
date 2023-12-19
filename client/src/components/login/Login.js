import React, { useEffect, useContext } from "react";
import { loginContext } from "../../context/loginContext";
import { useNavigate ,Link} from "react-router-dom";
import { useForm } from "react-hook-form";
import annyang from "annyang";

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

  let handleUserLogin = (userobj) => {
    loginUser(userobj);
    console.log("succesfull login ")
  };

  useEffect(() => {
    if (userLoginStatus === true) {
      navigate("/jobs/public");
    }
  }, [userLoginStatus]);

  useEffect(() => {
    const updateEmailField = (variable) => {
      const emailField = document.getElementById("email");
      emailField.focus();
      emailField.value += variable.toLowerCase(); // Convert to lowercase
    };
    if (annyang) {
      const commands = {
        "Write e-mail *tag": (variable) => {
          document.getElementById("email").focus();
          document.getElementById("email").value += variable;
          updateEmailField(variable);
        },

        "Right email *tag": (variable) => {
          document.getElementById("email").focus();
          document.getElementById("email").value += variable;
          updateEmailField(variable);
        },

        "E-mail *tag": (variable) => {
          document.getElementById("email").focus();
          document.getElementById("email").value += variable;
          updateEmailField(variable);
        },

        "e-mail *tag": (variable) => {
          document.getElementById("email").focus();
          document.getElementById("email").value += variable;
          updateEmailField(variable);
        },

        "write email *tag": (variable) => {
          document.getElementById("email").focus();
          document.getElementById("email").value += variable;
          updateEmailField(variable);
        },
        "write password *tag": (variable) => {
          document.getElementById("password").focus();
          document.getElementById("password").value += variable;
        },
        submit: () => {
          document.getElementById("submit-button").click();
        },
      };

      annyang.debug();
      annyang.addCommands(commands);
      annyang.setLanguage("en-US");
      annyang.start();

      // Clean up annyang when the component unmounts
      return () => {
        annyang.removeCommands();
        annyang.abort();
      };
    } else {
      console.error("Annyang not available");
    }
  }, []);

  return (
    <div className="Login container">
      {error?.length !== 0 && (
        <p className="text-danger display-1"> {error}</p>
      )}

      <div className="cat m-auto  shadow-lg  rounded">
        <h2 className="title">Login</h2>
        <form
          id="loginForm"
          onSubmit={handleSubmit(handleUserLogin)}
          action=""
        >
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
              <p className=" text-danger">
                *minimum 4 letter word is required
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
          <Link
                      className="text-primary"
                      style={{ padding: "1.3rem" }}
                      to="/forgot"
                      
                    >
                      Forgot Your Password?
                    </Link>

          <button type="submit" id="submit-button"
          className="button-l d-block m-auto mt-5">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;