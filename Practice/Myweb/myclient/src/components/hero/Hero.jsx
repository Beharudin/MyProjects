import React from "react";
import { motion } from "framer-motion";
import { fadeIn, slideIn, staggerContainer } from "../../utils/motion";
import "./hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="wrapper paddings top">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
      className="container innerWidth">
        <div className="upperElements">
          <motion.span variants={fadeIn("right", "tween", 0.2, 1)} className="primaryText">
            Hey There, <br /> I'm Beharudin
          </motion.span>
          <motion.span variants={fadeIn("left", "tween", 0.4, 1)} className="secondaryText">
            I develop beutiful simple <br /> websites, and I love what I do
          </motion.span>
        </div>
        <motion.div className="person" variants={fadeIn("up", "tween", 0.3, 1)}>
            <motion.img variants={slideIn("up", "tween", 0.5, 1.3)} src="./assets/person.png" alt="" />
        </motion.div>

        <Link className="email" to="mailto:beharudinmm@gmail.com">beharudinmm@gmail.com</Link>
        <div className="lowerElements">
          <motion.div variants={fadeIn("right", "tween", 0.3, 1)} className="experience">
            <div className="primaryText">10</div>
            <div className="secondaryText">
              <div>Years</div>
              <div>Experience</div>
            </div>
          </motion.div>
          <motion.div variants={fadeIn("left", "tween", 0.5, 1)} className="certificate">
            <img src="./assets/certificate.png" alt="" />
            <span>CERTIFIED PROFESSIONAL</span>
            <span>WEB DEVELOPER</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
