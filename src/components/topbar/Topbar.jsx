import React, { useEffect, useState } from "react";
import "./topbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from "react-redux";

function Topbar() {
  const data = useSelector(state=>state.website.name);


  return (
    <nav className="navbar navbar-expand-lg bg-primary fixed-top">
      <a className="navbar-brand" href="/">
      {data ? data.name : 'Bakkalcha Fedis'}
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
            <a className="nav-link" href="/#novels">
              Novels
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/#poems">
              Poems
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/#posts">
              Posts
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#videos">
              Videos
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/#about">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/#testimonials">
              Testimonials
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/#footer">
              Contacts
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/admin/login">
              login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Topbar;
