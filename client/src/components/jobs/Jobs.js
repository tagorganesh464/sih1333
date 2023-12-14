import React, { useEffect, useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Jobs.css";

const Jobs = () => {
  return (
    <div className="jobs-portal">
      <nav id="nav" >
        <ul id="ul">
          <li id="li">
            <Link
            id="link"
              className="nav-link  "
              style={{ padding: "1.3rem" }}
              to="/jobs/public"
            >
              Public Sector
            </Link>
          </li>
          <li id="li">
            <Link
            id="link"
              className="nav-link  "
              style={{ padding: "1.3rem" }}
              to="/jobs/private"
            >
              Private Sector
            </Link>
          </li>
        </ul>
      </nav>

      <div className="jobs-list">
        <Outlet />
      </div>
    </div>
  );
};

export default Jobs;
