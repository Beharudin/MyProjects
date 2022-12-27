import React from "react";
import "./Advert.scss";

function Advert() {
  return (
    <div className="row advert">
      <heading class="heading text-center">OUR SERVICES</heading>
      <span className="sub-heading text-center">
        uniquely designed services are available for our customer
      </span>
      <div class="advert-row">
        <div class="innerAdvert">
          <span className="advertName">Advanced Loan</span>
          <img src="https://picsum.photos/300" alt="" class="advertImg" />
        </div>
        <div class="innerAdvert">
          <span className="advertName">Personal Loan</span>
          <img src="https://picsum.photos/302" alt="" class="advertImg" />
        </div>
        <div class="innerAdvert">
          <span className="advertName">Business Loan</span>
          <img src="https://picsum.photos/301" alt="" class="advertImg" />
        </div>
        <div class="innerAdvert">
          <span className="advertName">Medical Loan</span>
          <img src="https://picsum.photos/301" alt="" class="advertImg" />
        </div>
      </div>
    </div>
  );
}

export default Advert;
