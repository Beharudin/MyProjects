import React from "react";
import { comments, sliderSettings } from "../../utils/data";
import "./people.css";
import Slider from "react-slick";
import {motion} from 'framer-motion'
import { footerVariants, staggerChildren, textVariant, textVariant2 } from "../../utils/motion";
const People = () => {
  return (
    <motion.section
    variants={staggerChildren}
    initial="hidden"
    whileInView="show"
    viewport={{ once: false, amount: 0.25 }}
    section className="paddings wrapper">

      <a className="anchor" id="people"></a>

      <motion.div
      variants={footerVariants}
      className="yPaddings innerWidth container">


        <div className="flexCenter heading">
          <span className="primaryText">People talk about us</span>
          <p style={{ marginTop: "2rem" }}>
            I got a job that was in accordance with the salary and field of work
          </p>
          <p>The process of submitting an appilication was quite cosy</p>
        </div>



        <div className="yPaddings comments">
          {/* to use slider , we have to inlcude css in index.html head */}
          <Slider {...sliderSettings} className="slider">
            {comments.map((comment, i) => {
              return (
                <div className="flexCenter comment">
                  <img src={comment.img} alt="" />
                  <p>{comment.comment}</p>
                  <div className="line"></div>
                  <div className="bio">
                    <span>{comment.name}</span>
                    <span>{comment.post}</span>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>


      </motion.div>

    </motion.section>
  );
};

export default People;