import * as React from "react";
import "./Topbar.scss";
// import SearchIcon
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <div class="topbar">
      <nav
        className="navbar navbar-expand-lg navbar-dark nav"
        style={{ backgroundColor: "#12b8e1" }}
      >
        <img src="https://picsum.photos/30" className="logoImg" alt="" />
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <Link className="Link" to="/">
              <li className="nav-item active topList">
                <a className="nav-link topListLink">
                  HOME <span className="sr-only">(current)</span>
                </a>
              </li>
            </Link>
            <Link className="Link" to="/service">
              <li className="nav-item topList">
                <a className="nav-link topListLink">
                  SERVICE <span className="sr-only"></span>
                </a>
              </li>
            </Link>
            <Link className="Link" to="/about">
              <li className="nav-item topList">
                <a className="nav-link topListLink">
                  ABOUT <span className="sr-only"></span>
                </a>
              </li>
            </Link>
            <Link className="Link" to="/contact">
              <li className="nav-item topList">
                <a className="nav-link topListLink">
                  CONTACT <span className="sr-only"></span>
                </a>
              </li>
            </Link>
            <li className="nav-item dropdown topList">
              <a
                className="nav-link dropdown-toggle topListLink"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                PAGES
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item">GALLERY</a>
                <a className="dropdown-item">VIDEO</a>
                <div className="dropdown-divider" />
                <a className="dropdown-item">ADS</a>
              </div>
            </li>
          </ul>
                
          <Link className="Link" to="/login">
            <li className="nav-item topList">
              <a className="nav-link topListLink">
                Login <span className="sr-only"></span>
              </a>
            </li>
          </Link>
          <Link className="Link" to="/signup">
            <li className="nav-item topList">
              <a className="nav-link topListLink">
                Signup <span className="sr-only"></span>
              </a>
            </li>
          </Link>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2 searchInput"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn searchBtn" type="submit">
              <SearchIcon className="searchIcon" />
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};
export default Topbar;
