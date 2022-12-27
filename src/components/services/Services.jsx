import React from "react";
import "./services.scss";
import { ArrowCircleRight } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { services } from "./../../assets/files/service.js";

function Services() {
  return (
    <div className="services">
      <heading class="heading">PRODUCTS LISTS</heading>
      <span className="sub-heading text-center">
        Find out all our advanced products directly online
      </span>
      <div class="row rows">
        {services.map((service) => (
          <div class="col-md-3 serviceBox">
            <span className="serviceTitle">{service.title}</span>
            <img src={service.img} alt="" class="serviceImage" />
            <p class="serviceDesc">{service.desc}</p>
            <Link className="Link" to="/single/12345">
              <button className="btn readBtn">
                Read More <ArrowCircleRight />
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
