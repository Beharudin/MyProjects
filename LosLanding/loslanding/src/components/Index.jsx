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
            <img
              className="float-center img"
              src="/images/coop-transparent.png"
              alt="Coop"
            />
          </div>
          <div className="col-xs-12 col-sm-6 p-0">
            <div className="left-div"></div>
          </div>
          <div className="col-xs-12 col-sm-6 pl-0 pr-3">
            <div className="right-div p-3">
              <div className="black-div p-3">
                <div className="d-flex box-div border border-light text-light p-3">
                  <div className="col-1 mr-1 p-3">
                    <FontAwesomeIcon size="2xl" icon={faHandHoldingDollar} />
                  </div>
                  <div className="col-11">
                    <h6>Loan Origination System [customer]</h6>
                    <p className="mt-4">
                      This platform allows you to apply for, monitor the
                      progress of, and get informtion about the different types
                      of loan services available for CBO customers.
                    </p>
                    <Button variant="contained" href="/credit">
                      Open <ArrowCircleRightIcon />
                    </Button>
                  </div>
                </div>

                <div className="d-flex box-div mt-3 border border-light text-light p-3">
                  <div className="col-1 mr-1 p-3">
                    <FontAwesomeIcon size="2xl" icon={faHandHoldingDollar} />
                  </div>
                  <div className="col-11">
                    <h6>Loan Origination System</h6>
                    <p className="mt-4">
                      This platform allows you to perform all tasks involved in
                      the loan origination process. Including but not limited
                      to, reviewing requests, making approval decisions, and
                      capturing necessary information such as estimation values,
                      document files, recommendation remarks ...
                    </p>
                    <Button variant="contained" href="/LOS">
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
                      This is a portal for sending your inquiries and questions
                      regarding any legal issues you might encounter in your
                      day-to-day operations.
                    </p>
                    <Button variant="contained" href="/legal">
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
