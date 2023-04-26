import React from "react";
import "./topbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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
            <a className="nav-link" href="#novels">
              Novels
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#poems">
              Poems
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#posts">
              Posts
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#videos">
              Videos
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#about">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#testimonials">
              Testimonials
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#top">
              Contacts
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Topbar;
