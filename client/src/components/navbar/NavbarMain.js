import React, { useContext, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { loginContext } from "../../context/loginContext";
import "./NavbarMain.css";
import { FaWheelchair, FaHome, FaSignInAlt, FaSignOutAlt, FaUser, FaFileAlt, FaBookReader,FaVolumeUp } from 'react-icons/fa';
import { GiSpeaker } from "react-icons/gi";
import { Link } from "react-router-dom";
import { RiUserSearchFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
function NavbarMain(props) {
  let [currentUser, error, userLoginStatus, loginUser, logoutUser, role] =
    useContext(loginContext);

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.type = 'text/javascript';
  //   script.text = `
  //     function googleTranslateElementInit() {
  //       new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
  //     }
  //   `;
  //   document.body.appendChild(script);

  //   const translateScript = document.createElement('script');
  //   translateScript.type = 'text/javascript';
  //   translateScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  //   translateScript.async = true;
  //   document.body.appendChild(translateScript);

  //   return () => {
  //     document.body.removeChild(script);
  //     document.body.removeChild(translateScript);

  //     // Check if the property exists before attempting to delete
  //     if (window && window.googleTranslateElementInit) {
  //       delete window.googleTranslateElementInit;
  //     }
  //   };
  // }, []);
  const downloadNVDA = () => {
    // Replace this URL with the actual NVDA installer URL
    const nvdaInstallerUrl =
      "https://www.nvaccess.org/download/nvda/releases/2017.3/nvda_2017.3.exe";

    // Create an anchor element
    const anchor = document.createElement("a");

    // Set the href and download attributes
    anchor.href = nvdaInstallerUrl;
    anchor.download = "NVDA_2023.3.exe";

    // Append the anchor to the document
    document.body.appendChild(anchor);

    // Trigger a click on the anchor element
    anchor.click();

    // Remove the anchor from the document
    document.body.removeChild(anchor);
  };
  const dropdownStyle = {
    position: "relative",
    zIndex: 1000, // Set the zIndex to a value higher than other elements
  };

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
            <Dropdown className="mt-3 mx-2 ms-auto" style={{ zIndex: 1000 }}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <i className="fas fa-wheelchair"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <button
                  onClick={props.increaseFontSize}
                  className="btn d-block m-auto w-100 fs-5 text-dark"
                >
                  {" "}
                  +A
                </button>

                <Dropdown.Divider />
                <button
                  onClick={props.decreaseFontSize}
                  className="btn d-block m-auto w-100 fs-5 text-dark"
                >
                  {" "}
                  -A
                </button>
                <Dropdown.Divider />

                <Dropdown.Divider />
                <Dropdown.Item
                  className="d-block w-75 m-auto p-3"
                  style={{ backgroundColor: "#E50203" }}
                  onClick={() => props.changeColor("#E50203")}
                ></Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  className="d-block w-75 m-auto p-3"
                  style={{ backgroundColor: "#AA9403" }}
                  onClick={() => props.changeColor("#AA9403")}
                ></Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  className="d-block w-75 m-auto p-3"
                  style={{ backgroundColor: "#FF005B" }}
                  onClick={() => props.changeColor("#FF005B")}
                ></Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  className="d-block w-75 m-auto p-3"
                  style={{ backgroundColor: "#FEED00" }}
                  onClick={() => props.changeColor("#FEED00")}
                ></Dropdown.Item>

                <Dropdown.Divider />
                <Dropdown.Item
                  className="text-center"
                  onClick={props.resetColor}
                >
                  D
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <ul className="navbar-nav menu ms-auto text-decoration-none">
              {!userLoginStatus ? (
                <ul className="navbar-nav menu ms-auto text-decoration-none">
                  <li className="nav-item dropdown">
                    <button
                      onClick={downloadNVDA}
                      className="nav-link"
                      style={{
                        padding: "1.3rem",
                        border: "none",
                        background: "none",
                      }}
                    ><GiSpeaker />
                      Screen reader access
                    </button>
                  </li>
                  <li className="nav-item active">
                    <Link
                      className="nav-link  "
                      style={{ padding: "1.3rem" }}
                      to="/"
                    ><FaHome /> 
                      Home
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link   "
                      style={{ padding: "1.3rem" }}
                      to="/login"
                    ><FaSignInAlt /> 
                      Sign in
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link "
                      style={{ padding: "1.3rem" }}
                      to="/register"
                    ><FaSignOutAlt /> 
                      Sign up
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav menu ms-auto text-decoration-none">
                  <li className="nav-item dropdown">
                    <button
                      onClick={downloadNVDA}
                      className="nav-link"
                      style={{
                        padding: "1.3rem",
                        border: "none",
                        background: "none",
                      }}
                    ><GiSpeaker />
                      Screen reader access
                    </button>
                  </li>
                  <li className="nav-item active">
                    <Link
                      className="nav-link  "
                      style={{ padding: "1.3rem" }}
                      to="/"
                    ><FaHome /> 
                      Home
                    </Link>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link "
                      style={{ padding: "1.3rem" }}
                      to="/jobs/public"
                    ><FaFileAlt />
                      Jobs
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link "
                      style={{ padding: "1.3rem" }}
                      to="/coursespage"
                    ><FaBookReader /> 
                      Courses
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link "
                      style={{ padding: "1.3rem" }}
                      to="/mockTestCard"
                    ><FaFileAlt /> 
                      Tests
                    </Link>
                  </li>
               
                 
                </ul>
              )}
              {userLoginStatus && role == "admin" && 
                <ul className="navbar-nav menu ms-auto text-decoration-none">
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link "
                      style={{ padding: "1.3rem" }}
                      to="/users"
                    ><FaUsers />
                      Users
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link "
                      style={{ padding: "1.3rem" }}
                      to="/login"
                      onClick={logoutUser}
                    ><FaSignOutAlt />
                      Sign Out
                    </Link>
                  </li>
                </ul>
              }
                            {userLoginStatus && role == "employee" && 
                <ul className="navbar-nav menu ms-auto text-decoration-none">
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link "
                      style={{ padding: "1.3rem" }}
                      to="/user-profile"
                    ><RiUserSearchFill />
                      User Profile
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link "
                      style={{ padding: "1.3rem" }}
                      to="/login"
                      onClick={logoutUser}
                    ><FaSignOutAlt />
                      Sign Out
                    </Link>
                  </li>
                  
                </ul>
              }
              
              <li className="nav-item active">
                {/* <div id="google_translate_element"></div> */}
              </li>
            </ul>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavbarMain;
