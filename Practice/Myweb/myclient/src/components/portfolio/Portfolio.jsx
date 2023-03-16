import React from "react";
import { motion } from "framer-motion";
import css from "./portfolio.css";
import { fadeIn, staggerChildren, textVariant, textVariant2 } from "../../utils/motion";
const Portfolio = () => {
  return (
    <motion.section
    variants={staggerChildren}
    initial="hidden"
    whileInView="show"
    viewport={{ once: false, amount: 0.25 }}
    className="paddings wrapper">

      <a className="anchor" id="portfolio"></a>

      <div className="innerWidth flexCenter container">


        <motion.div variants={textVariant(.4)} className="flexCenter heading">
          <div>
            <span className="primaryText">My Latest Works</span>
            <p style={{marginTop: "10px"}}>Perfect solution for digital experience</p>
          </div>
          <span className="secondaryText">Explore More Works</span>
        </motion.div>


        <div className="flexCenter showCase">
            <motion.img variants={fadeIn("up", "tween", .5, .6)} src="../../assets/showCase1.png" alt="project" />
            <motion.img variants={fadeIn("up", "tween", .7, .6)} src="../../assets/showCase2.png" alt="project" />
            <motion.img variants={fadeIn("up", "tween", .9, .6)} src="../../assets/showCase3.png" alt="project" />
        </div>
      </div>
    </motion.section>
  );
};

export default Portfolio;