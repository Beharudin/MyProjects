import React from "react";
import "./about.scss";
import Topbar from "../../components/topbar/Topbar";
import Footer from "./../../components/footer/Footer";

function About() {
  return (
    <div className="about">
      <Topbar />
      <div className="row  aboutSection">
        <div class="col-md-1"></div>
        <div class="col-md-5">
          <img src="https://picsum.photos/400/400" alt="..." class="aboutImg" />
        </div>
        <div class="col-md-5">
          <h3 className="aboutTitle"> ABOUT US</h3>
          <p class="aboutDesc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit alias
            nisi voluptate est quibusdam. Rerum nesciunt recusandae, cum sed
            impedit dicta beatae amet quae quasi illum illo nisi, consequatur
            nostrum? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Velit alias nisi voluptate est quibusdam. Rerum nesciunt recusandae,
            cum sed impedit dicta beatae amet quae quasi illum illo nisi,
            consequatur nostrum?
          </p>
        </div>
        <div class="col-md-1"></div>
      </div>
      <div className="row  missionSection">
        <div class="col-md-1"></div>
        <div class="col-md-5">
          <h3 className="aboutTitle">OUR MISSION</h3>
          <p class="aboutDesc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit alias
            nisi voluptate est quibusdam. Rerum nesciunt recusandae, cum sed
            impedit dicta beatae amet quae quasi illum illo nisi, consequatur
            nostrum? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Velit alias nisi voluptate est quibusdam. Rerum nesciunt recusandae,
            cum sed impedit dicta beatae amet quae quasi illum illo nisi,
            consequatur nostrum?
          </p>
        </div>
        <div class="col-md-5">
          <img src="https://picsum.photos/400/400" alt="..." class="aboutImg" />
        </div>
        <div class="col-md-1"></div>
      </div>
      <div className="row  missionSection">
        <div class="col-md-1"></div>
        <div class="col-md-5">
          <img src="https://picsum.photos/400/400" alt="..." class="aboutImg" />
        </div>
        <div class="col-md-5">
          <h3 className="aboutTitle">OUR VISSION</h3>
          <p class="aboutDesc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit alias
            nisi voluptate est quibusdam. Rerum nesciunt recusandae, cum sed
            impedit dicta beatae amet quae quasi illum illo nisi, consequatur
            nostrum? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Velit alias nisi voluptate est quibusdam. Rerum nesciunt recusandae,
            cum sed impedit dicta beatae amet quae quasi illum illo nisi,
            consequatur nostrum?
          </p>
        </div>
        <div class="col-md-1"></div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
