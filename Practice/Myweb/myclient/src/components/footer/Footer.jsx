import React from "react";
import { footerVariants, staggerChildren } from "../../utils/motion";
import "./footer.css";
import { motion } from "framer-motion";
const Footer = () => {
  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="paddings wrapper"
    >
      <motion.div
        variants={footerVariants}
        className="innerWidth yPaddings flexCenter container"
      >
        <div className="left">
          <span className="primaryText">
            Let's make something <br />
            amazing together.
          </span>
          <span className="primaryText">
            Start by <a href="mailto:beharudinmm@gmail.com">saying hi</a>
          </span>
        </div>

        <div className="right">
          <div className="info">
            <span className="secondaryText">Information</span>
            <p>Oromia, Ethiopia</p>
          </div>
          <ul className="menu">
            <li>Services</li>
            <li>Works</li>
            <li>Notes</li>
            <li>Experience</li>
          </ul>
        </div>
      </motion.div>
    </motion.section>
  );};

export default Footer;
