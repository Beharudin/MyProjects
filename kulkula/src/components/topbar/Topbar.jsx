import React from "react";
import "./topbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";

function Topbar() {
  return (
    <nav id="top" className="navbar navbar-expand-lg bg-primary fixed-top">
      <Link className="navbar-brand" to="#top">
        Kulkula
      </Link>
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
            <Link className="nav-link" to="#posts">
              Posts
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#testimonials">
              Testimonials
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#top">
              Contacts
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Topbar;
