import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faBook,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";

function Footer() {
  const data = useSelector((state) => state.website.webInfo);

  return (
    <div className="fluid-container my-5" id="footer">
      <footer className="text-white" style={{ backgroundColor: "#23242a" }}>
        <div className="card p-4" style={{ backgroundColor: "#23242a" }}>
          <div className="row mt-4">
            <div className="col-lg-6 col-xs-12 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4">{data.name}</h5>
              <p className="ml-2">{data.footer_description}</p>

              <div className="mt-4 ml-2">
                <a
                  type="button"
                  className="btn btn-floating btn-warning rounded-circle m-2"
                  href={data.facebook}
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>

                <a
                  type="button"
                  className="btn btn-floating btn-warning rounded-circle m-2"
                  href={data.instagram}
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>

                <a
                  type="button"
                  className="btn btn-floating btn-warning rounded-circle m-2"
                  href={data.twitter}
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a
                  type="button"
                  className="btn btn-floating btn-warning rounded-circle m-2"
                  href={data.youtube}
                >
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
                  <span className="ms-2">{data.address}</span>
                </li>
                <li className="mb-3">
                  <span className="fa-li">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <span className="ms-2">{data.email}</span>
                </li>
                <li className="mb-3">
                  <span className="fa-li">
                    <FontAwesomeIcon icon={faPhone} />
                  </span>
                  <span className="ms-2">+ {data.mobile}</span>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4">Books</h5>

              <ul className="fa-ul ml-4">
                {data.books
                  ? data.books.split(",").map((book) => (
                      <li className="mb-3">
                        <span className="fa-li">
                          <FontAwesomeIcon icon={faBook} />
                        </span>
                        <span className="ms-2">{book}</span>
                      </li>
                    ))
                  : "loading"}
              </ul>
            </div>
          </div>
        </div>
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2023 {data.name}. Designed By:{" "}
          <a className="text-white" href="#">
            Beharudin Mohammed
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
