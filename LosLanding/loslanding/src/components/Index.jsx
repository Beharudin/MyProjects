import React from "react";
import Button from "@mui/material/Button";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faHandHoldingDollar,
} from "@fortawesome/free-solid-svg-icons";

function Index() {
  return (
    <div>
      <div className="fluid-container">
        <div className="row">
          <div className="col-12 m-3">
            <h1 className="text-center">Cooperative Bank of Oromia</h1>
          </div>
          <div className="d-flex">
            <div className="left-div col-xs-12 col-md-6"></div>
            <div className="right-div col-xs-12 col-md-6 p-3">
              <div className="black-div p-3">
                <div className="d-flex box-div border border-light text-light p-3">
                  <div className="col-1 mr-1 p-3">
                    <FontAwesomeIcon size="2xl" icon={faHandHoldingDollar} />
                  </div>
                  <div className="col-11">
                    <h6>Loan Origination System</h6>
                    <p className="mt-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    </p>
                    <Button variant="contained" href="#text-buttons">
                      Open <ArrowCircleRightIcon />
                    </Button>
                  </div>
                </div>
                <div className="d-flex box-div mt-3 border border-light text-light p-3">
                  <div className="col-1 mr-1 p-3">
                    <FontAwesomeIcon icon={faCircleQuestion} size="2xl" />
                  </div>
                  <div className="col-11">
                    <h6>Legal Advice System</h6>
                    <p className="mt-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <Button variant="contained" href="#text-buttons">
                      Open <ArrowCircleRightIcon />
                    </Button>
                  </div>
                </div>
                <div className="d-flex box-div mt-3 border border-light text-light p-3">
                  <div className="col-1 mr-1 p-3">
                    <FontAwesomeIcon size="2xl" icon={faHandHoldingDollar} />
                  </div>
                  <div className="col-11">
                    <h6>Another System</h6>
                    <p className="mt-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <Button variant="contained" href="#text-buttons">
                      Open <ArrowCircleRightIcon />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
