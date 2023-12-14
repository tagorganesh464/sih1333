import React, { useContext,useEffect } from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { loginContext } from "../../context/loginContext";
import "./NavbarMain.css";
import { Link } from "react-router-dom";
function NavbarMain() {
  let [currentUser, error, userLoginStatus, loginUser, logoutUser, role] =
    useContext(loginContext);

    useEffect(() => {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
  
      script.onload = () => {
        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
        };
      };
  
      return () => {
        document.body.removeChild(script);
        delete window.googleTranslateElementInit;
      };
    }, []);
  return (
    <Navbar expand="lg" className="p-0 body ">
      <div className="container-fluid px-3 body1">
        <div className="flex">
          <Link className="nav-link text-black" to="/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6491/6491579.png"
              width="55px"
              height="55px"
            ></img>
            Udyog Saarathi
          </Link>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto  ">
            <ul className="navbar-nav menu ms-auto text-decoration-none">
              <li className="nav-item active">
                <Link
                  className="nav-link  "
                  style={{ padding: "1.3rem" }}
                  to="/"
                >
                  Home
                </Link>
              </li>

              {!userLoginStatus ? (
                <ul className="navbar-nav menu ms-auto text-decoration-none">
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link   "
                      style={{ padding: "1.3rem" }}
                      to="/login"
                    >
                      Sign in
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link "
                      style={{ padding: "1.3rem" }}
                      to="/register"
                    >
                      Sign up
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav menu ms-auto text-decoration-none">
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link "
                      style={{ padding: "1.3rem" }}
                      to="/login"
                      onClick={logoutUser}
                    >
                      Sign Out
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link "
                      style={{ padding: "1.3rem" }}
                      to="/jobs"
                    >
                      Jobs
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link "
                      style={{ padding: "1.3rem" }}
                      to="/courses"
                    >
                      Courses
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link "
                      style={{ padding: "1.3rem" }}
                      to="/mocktest"
                    >
                      Mock Test
                    </Link>
                  </li>
                </ul>
              )}

              <li className="nav-item active">
              <div id="google_translate_element"></div>
              </li>
            </ul>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavbarMain;
