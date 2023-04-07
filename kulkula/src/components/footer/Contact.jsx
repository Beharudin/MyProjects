import React, { useState } from "react";
import data from "../../data/data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faBook, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

function Contact() {

  return (
    <div>
      <div className="fluid-container my-5">
        <footer
          className="text-white"
          style={{backgroundColor:"#23242a"}}
        >
          <div className="container p-4">
            <div className="row mt-4">
              <div className="col-lg-6 col-xs-12 mb-4 mb-md-0">
                <h5 className="text-uppercase mb-4">About Kulkula</h5>
                <p className="ml-2">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti.
                </p>

                <p className="ml-2">
                  Blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et quas molestias.
                </p>

                <div className="mt-4 ml-2">
                  <a type="button" className="btn btn-floating btn-warning rounded-circle m-2" href="http://www.facebook.com">
                  <FontAwesomeIcon icon={faFacebookF} />
                  </a>

                  <a type="button" className="btn btn-floating btn-warning rounded-circle m-2" href="http://www.inistigram.com">
                  <FontAwesomeIcon icon={faInstagram} />
                  </a>

                  <a type="button" className="btn btn-floating btn-warning rounded-circle m-2" href="http://www.twitter.com">
                  <FontAwesomeIcon icon={faTwitter} />
                  </a>
                  <a type="button" className="btn btn-floating btn-warning rounded-circle m-2" href="http://www.youtube.com">
                  <FontAwesomeIcon icon={faYoutube} />
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase mb-4 pb-1">Contacts</h5>

                <ul className="fa-ul ml-4">
                  <li className="mb-3">
                    <span className="fa-li">
                    <FontAwesomeIcon icon={faLocationDot} />
                    </span>
                    <span className="ms-2">Fedis, Oromia, Ethiopia</span>
                  </li>
                  <li className="mb-3">
                    <span className="fa-li">
                    <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <span className="ms-2">mohammed@gmail.com</span>
                  </li>
                  <li className="mb-3">
                    <span className="fa-li">
                    <FontAwesomeIcon icon={faPhone} />
                    </span>
                    <span className="ms-2">+ 01 234 567 89</span>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase mb-4">Books</h5>

                <ul className="fa-ul ml-4">
                  <li className="mb-3">
                  <span className="fa-li">
                    <FontAwesomeIcon icon={faBook} />
                    </span>
                    <span className="ms-2">Kulkula Dhugaa Dhikkifate</span>
                  </li>
                  <li className="mb-3">
                  <span className="fa-li">
                    <FontAwesomeIcon icon={faBook} />
                    </span>
                    <span className="ms-2">Riqicha Bultii Islaamaa</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className="text-center p-3"
            style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
          >
            © 2023 Kulkula. Designed By: {" "}
            <a className="text-white" href="#">
              Beharudin Mohammed
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Contact;
