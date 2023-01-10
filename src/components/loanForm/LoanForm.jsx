import React, { useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import "./loanform.css";

const LoanForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [collType, setCollType] = useState("house");
  const [isHouse, setIsHouse] = useState(true);

  const steps = [
    "Personal Information",
    "Guarantor Information",
    "Loan Information",
  ];

  const stepIcon = (index) => {
    return index === 0 ? (
      <SettingsIcon />
    ) : index === 1 ? (
      <GroupAddIcon />
    ) : (
      <VideoLabelIcon />
    );
  };

  const handleType = (e) => {
    setCollType(e.target.value);
  };

  useEffect(() => {
    if (collType === "house") {
      setIsHouse(true);
    } else {
      setIsHouse(false);
    }
  }, [collType]);

  return (
    <div className="loanFormPage">
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        sx={{
          width: "100%",
        }}
      >
        {steps.map((label, index) => (
          <Step
            key={label}
            sx={{
              "& .MuiStepLabel-root .Mui-completed": {
                color: "success.light", // circle color (COMPLETED)
              },
              "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                {
                  color: "grey.700", // Just text label (COMPLETED)
                },
              "& .MuiStepLabel-root .Mui-active": {
                color: "success.light", // circle color (ACTIVE)
              },
              "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                {
                  color: "common.black", // Just text label (ACTIVE)
                },
              "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                fill: "black", // circle's number (ACTIVE)
              },
            }}
          >
            <StepLabel StepIconComponent={() => stepIcon(index)}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <span className="fillInfo">fill requested information</span>
      {activeStep === 0 && (
        <div>
          <div className={"formRow"}>
            <div className="formRowItem">
              <label>name:</label>
              <input type={"text"} placeholder="name" disabled />
            </div>
            <div className="formRowItem">
              <label>gender:</label>
              <input type={"text"} placeholder="gender" disabled />
            </div>
            <div className="formRowItem" style={{ alignItems: "center" }}></div>
          </div>
          <div className={"formRow"}>
            <div className="formRowItem">
              <label>birthdate:</label>
              <input type={"text"} placeholder="date of birth" disabled />
            </div>
            <div className="formRowItem">
              <label>email:</label>
              <input type={"text"} placeholder="email" disabled />
            </div>
            <div className="formRowItem">
              <label>phone number:</label>
              <input type={"text"} placeholder="phone number" disabled />
            </div>
          </div>
          <div className={"formRow"}>
            <div className="formRowItem">
              <label>country:</label>
              <input type={"text"} placeholder="country" disabled />
            </div>
            <div className="formRowItem">
              <label>city:</label>
              <input type={"text"} placeholder="city" disabled />
            </div>
            <div className="formRowItem">
              <label>subcity:</label>
              <input type={"text"} placeholder="subcity" disabled />
            </div>
          </div>
          <div className="formRow">
            <div className="formRowItem">
              <label>subcity:</label>
              <input type={"text"} placeholder="woreda" disabled />
            </div>
            <div className="formRowItem">
              <label>kebele:</label>
              <input type={"text"} placeholder="kebele" disabled />
            </div>
            <div className="formRowItem">
              <label>house number:</label>
              <input type={"text"} placeholder="house number" disabled />
            </div>
          </div>
        </div>
      )}
      {activeStep === 1 && (
        <div>
          <div className={"formRow"}>
            <div className="formRowItem">
              <label>guarantor name:</label>
              <input type={"text"} placeholder="guarantor name" />
            </div>
            <div className="formRowItem">
              <label>guarantor email:</label>
              <input type={"text"} placeholder="guarantor email" />
            </div>
            <div className="formRowItem">
              <label>guarantor phone no.:</label>
              <input type={"text"} placeholder="guarantor phone no." />
            </div>
          </div>
          <div className={"formRow"}>
            <div className="formRowItem">
              <label>collataral type:</label>
              <select
                name="collataral_type"
                id="collataral_type"
                onChange={handleType}
              >
                <option value="">-collataral type-</option>
                <option value="house">House</option>
                <option value="car">car</option>
              </select>
            </div>
            {isHouse && (
              <>
                <div className="formRowItem">
                  <label>collateral address:</label>
                  <input type={"text"} placeholder="collateral address" />
                </div>
                <div className="formRowItem">
                  <label>ccountry:</label>
                  <input type={"text"} placeholder="country" />
                </div>
              </>
            )}
            {!isHouse && (
              <>
                <div className="formRowItem">
                  <label>libre image:</label>
                  <input type={"file"} placeholder="libre image" />
                </div>
                <div className="formRowItem">
                  <label>plate number:</label>
                  <input type={"text"} placeholder="plate number" />
                </div>
              </>
            )}
          </div>
          {isHouse && (
            <>
              <div className={"formRow"}>
                <div className="formRowItem">
                  <label>city:</label>
                  <input type={"text"} placeholder="city" />
                </div>
                <div className="formRowItem">
                  <label>subcity:</label>
                  <input type={"text"} placeholder="subcity" />
                </div>
                <div className="formRowItem">
                  <label>woreda:</label>
                  <input type={"text"} placeholder="woreda" />
                </div>
              </div>
              <div className={"formRow"}>
                <div className="formRowItem">
                  <label>kebele:</label>
                  <input type={"text"} placeholder="kebele" />
                </div>
                <div className="formRowItem">
                  <label>house number:</label>
                  <input type={"text"} placeholder="house number" />
                </div>
                <div className="formRowItem"></div>
              </div>
            </>
          )}
        </div>
      )}
      {activeStep === 2 && (
        <div>
          <div className={"formRow"}>
            <div className="formRowItem">
              <label>spouse name:</label>
              <input type={"text"} placeholder="spouse name" />
            </div>
            <div className="formRowItem">
              <label>credit type:</label>
              <input type={"text"} placeholder="credit type" />
            </div>
            <div className="formRowItem">
              <label>requested amount:</label>
              <input type={"text"} placeholder="requested amount" />
            </div>
          </div>
          <div className={"formRow"}>
            <div className="formRowItem">
              <label>requested period:</label>
              <input type={"text"} placeholder="requested period" />
            </div>
            <div className="formRowItem">
              <label>requested repayment frequency:</label>
              <input
                type={"text"}
                placeholder="requested repayment frequency"
              />
            </div>
            <div className="formRowItem">
              <label>purpose of the loan:</label>
              <input type={"text"} placeholder="purpose of the loan" />
            </div>
          </div>
          <div className={"formRow"}>
            <div className="formRowItem">
              <label>income of the borrower:</label>
              <input type={"text"} placeholder="income of the borrower" />
            </div>
            <div className="formRowItem">
              <label>income of the spouse:</label>
              <input type={"text"} placeholder="income of the spouse" />
            </div>
            <div className="formRowItem">
              <label>date of birth of the spouse:</label>
              <input type={"text"} placeholder="date of birth of the spouse" />
            </div>
          </div>
          <div className="formRow">
            <div className="formRowItem">
              <label>source of repayment:</label>
              <input type={"text"} placeholder="source of repayment" />
            </div>
            <div className="formRowItem">
              <label>TIN number of the borrower:</label>
              <input type={"text"} placeholder="TIN number of the borrower" />
            </div>
            <div className="formRowItem">
              <label>TIN number spouse:</label>
              <input type={"text"} placeholder="TIN number spouse" />
            </div>
          </div>
        </div>
      )}
      <div className="buttonsContainer">
        {activeStep === 0 ? (
          <button style={{ visibility: "hidden" }}></button>
        ) : (
          <button onClick={() => setActiveStep(activeStep - 1)}>
            previous
          </button>
        )}
        {activeStep === 2 ? (
          <button>submit</button>
        ) : (
          <button onClick={() => setActiveStep(activeStep + 1)}>next</button>
        )}
      </div>
    </div>
  );
};

export default LoanForm;
