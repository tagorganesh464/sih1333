import React, { useContext, useEffect } from "react";
import NavbarMain from "../navbar/NavbarMain";
import Footer from "../footer/Footer";

import "./RootLayout.css";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

function RootLayout() {
  const [selectedColor, setSelectedColor] = useState("default");

  const changeColor = (color) => {
    setSelectedColor(color);
  };

  const resetColor = () => {
    setSelectedColor("transparent");
  };
  const getStyles = () => {
    switch (selectedColor) {
      case "blue":
        return { backgroundColor: "blue", color: "white" };
      case "red":
        return { backgroundColor: "red", color: "white" };
      case "green":
        return { backgroundColor: "green", color: "white" };
      default:
        // Set a transparent color for the default state
        return { backgroundColor: "rgba(0, 0, 0, 0)", color: "black" };
    }
  };
  const [fontSize, setFontSize] = useState(16);
  let location = useLocation();
  let [path, setPath] = useState("none");
  useEffect(() => {
    let url = location.pathname.replace("/", "");
    console.log(url);
    if (url.length === 0) {
      setPath("home");
    } else {
      setPath(url);
    }
  }, [location]);

  // let [domain,setDomain]=useContext(domainContext)
  // useEffect(()=>{
  //   let url=window.location.href;
  //   let baseURL = url.split("/").slice(0, 3).join("/")
  //   console.log(baseURL)
  //   setDomain(baseURL.replace("://","://server."))
  //   console.log(domain)
  // },[location])

  const increaseFontSize = () => {
    setFontSize(fontSize + 2);
  };

  const decreaseFontSize = () => {
    setFontSize(fontSize - 2);
  };
  return (
    <div className={path}>
      <div className="body-main">
        <div
          className="head"
          style={{ ...getStyles(), fontSize: `${fontSize}px` }}
        >
          <NavbarMain />

         
        </div>
        <div className="d-flex align-items-end flex-column bd-highlight mx-4   ">

<button onClick={increaseFontSize} className="btn-success p-3 text-center">A+</button>
<button onClick={decreaseFontSize}className="btn-primary p-3">A-</button>
</div> 
        
        <div className="sidebar " style={{marginTop:"6rem"}}>
        
            <button
              style={{ backgroundColor: "red"}}
              onClick={() => changeColor("red")}
            ></button>
            <button
              style={{ backgroundColor: "white" }}
              onClick={resetColor}
            ></button>
            <button
              style={{ backgroundColor: "green" }}
              onClick={() => changeColor("green")}
            ></button>
            <button
              style={{ backgroundColor: "blue" }}
              onClick={() => changeColor("blue")}
            ></button>
          </div>
       
        {/* placeholder */}
        <div
          className="main  "
          style={{ ...getStyles(), fontSize: `${fontSize}px` }}
        >
          <Outlet />
        </div>
        <div className="sticky-footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
