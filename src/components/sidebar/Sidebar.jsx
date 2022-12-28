import "./sidebarStyle.scss";
import Logout from "../logout/Logout";
import logo from "../../img/logo.png";

const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <section>
        <div className="area">
          <nav className="main-menu">
            <ul>
              <li className="has-subnav">
                <i className="fa"></i>
                <img
                  style={{ height: "100px", width: "55px" }}
                  src={logo}
                  alt="Logo"
                />
              </li>
              {props.sidebarOptions}
            </ul>

            <ul className="logout">
              <li>
                <Logout />
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
