import React from "react";
import "./topbar.css";
import { a } from "react-router-dom";
import { motion } from "framer-motion";
import {headerVariants } from "../../utils/motion";

function Topbar() {
  return (
    <motion.nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
    variants={headerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      >
      <div className="container-fluid">
        <a className="navbar-brand active" href="/">
          Myweb
        </a>
        <div className="ml-auto">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mynavbar"
            aria-controls="mynavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="mynavbar">
          <ul
            className="nav navbar-nav navbar-right mb-2 mb-lg-0r ml-auto"
            id="mynav"
          >
            <li className="nav-item">
              <a className="nav-link" href="#work">
                Services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#experties">
                Experience
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#portfolio">
                Portfolio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#people">
                Testimonals
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                +251912000000
              </a>
            </li>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}

export default Topbar;
