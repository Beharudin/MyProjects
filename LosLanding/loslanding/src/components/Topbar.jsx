import React from "react";
import "./topbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";


function Topbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-primary fixed-top">
      <a className="navbar-brand" href="/">
        Coop
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-5 ml-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#los">
              CoopLOS
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#legal">
              Legal Advice
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Topbar;
