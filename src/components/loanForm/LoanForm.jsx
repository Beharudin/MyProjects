import React, { useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import "./loanform.css";
import axios from "axios";
import { BASE_BACKEND_URL, cookies } from "../..";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui";

const validateFormData = () => {
  return true;
};

const LoanForm = ({ reloadDrawerOptions, reloadBodyOption }) => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(new FormData());
  const [collType, setCollType] = useState("house");
  const [isHouse, setIsHouse] = useState(true);
  const userId = cookies.get("userId");

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
  const changeHandler = (e) => {
    const updatedFormData = Object.assign(
      { ...formData },
      {
        [e.target.name]: e.target.value,
      }
    );
    setFormData(updatedFormData);
  };

  useEffect(() => {
    if (collType === "house") {
      setIsHouse(true);
    } else {
      setIsHouse(false);
    }
  }, [collType]);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      if (activeStep === 3) {
        const data = {
          loanData: formData,
          userId,
        };

        if (!(await validateFormData(data.formData))) {
          dispatch(uiActions.notif({ type: "error", msg: "invalid data" }));
        } else {
          //spin
          dispatch(uiActions.startLoad());

          const result = await axios.post(`${BASE_BACKEND_URL}/initLoan`, data);

          dispatch(uiActions.notif({ type: "success", msg: result.msg }));
          dispatch(uiActions.stopLoad());
          reloadDrawerOptions();
          reloadBodyOption("dashboard");
        }
      }
    } catch (err) {
      console.log("err catched");
      dispatch(uiActions.stopLoad());

      dispatch(
        uiActions.notif({
          type: "error",
          msg: err.msg,
        })
      );
      console.log(err);
    }
  };

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
      <span className="fillInfo"></span>
      <form onSubmit={submitHandler}>
        {activeStep === 0 && (
          <div>
            <div className={"formRow"}>
              <div className="formRowItem">
                <label>name:</label>
                <input
                  name="form1-name"
                  value={formData["form1-name"]}
                  onChange={changeHandler}
                  type={"text"}
                  placeholder="name"
                />
              </div>
              <div className="formRowItem">
                <label>gender:</label>
                <input
                  name="form1-gender"
                  onChange={changeHandler}
                  value={formData["form1-gender"]}
                  type={"text"}
                  placeholder="gender"
                />
              </div>
              <div
                className="formRowItem"
                style={{ alignItems: "center" }}
              ></div>
            </div>
            <div className={"formRow"}>
              <div className="formRowItem">
                <label>birthdate:</label>
                <input
                  name="form1-birthdate"
                  onChange={changeHandler}
                  value={formData["form1-birthdate"]}
                  type={"text"}
                  placeholder="date of birth"
                />
              </div>
              <div className="formRowItem">
                <label>email:</label>
                <input
                  name="form1-email"
                  onChange={changeHandler}
                  value={formData["form1-email"]}
                  type={"text"}
                  placeholder="email"
                />
              </div>
              <div className="formRowItem">
                <label>phone number:</label>
                <input
                  name="form1-phone"
                  onChange={changeHandler}
                  value={formData["form1-phone"]}
                  type={"text"}
                  placeholder="phone number"
                />
              </div>
            </div>
            <div className={"formRow"}>
              <div className="formRowItem">
                <label>country:</label>
                <input
                  name="form1-country"
                  onChange={changeHandler}
                  value={formData["form1-country"]}
                  type={"text"}
                  placeholder="country"
                />
              </div>
              <div className="formRowItem">
                <label>city:</label>
                <input
                  name="form1-city"
                  onChange={changeHandler}
                  value={formData["form1-city"]}
                  type={"text"}
                  placeholder="city"
                />
              </div>
              <div className="formRowItem">
                <label>subcity:</label>
                <input
                  name="form1-subcity"
                  onChange={changeHandler}
                  value={formData["form1-subcity"]}
                  type={"text"}
                  placeholder="subcity"
                />
              </div>
            </div>
            <div className="formRow">
              <div className="formRowItem">
                <label>woreda:</label>
                <input
                  name="form1-woreda"
                  onChange={changeHandler}
                  value={formData["form1-woreda"]}
                  type={"text"}
                  placeholder="woreda"
                />
              </div>
              <div className="formRowItem">
                <label>kebele:</label>
                <input
                  name="form1-kebele"
                  onChange={changeHandler}
                  value={formData["form1-kebele"]}
                  type={"text"}
                  placeholder="kebele"
                />
              </div>
              <div className="formRowItem">
                <label>house number:</label>
                <input
                  name="form1-housenumber"
                  onChange={changeHandler}
                  value={formData["form1-housenumber"]}
                  type={"text"}
                  placeholder="house number"
                />
              </div>
            </div>
          </div>
        )}
        {activeStep === 1 && (
          <div>
            <div className={"formRow"}>
              <div className="formRowItem">
                <label>guarantor name:</label>
                <input
                  name="form2-name"
                  onChange={changeHandler}
                  value={formData["form2-name"]}
                  placeholder="guarantor name"
                  type={"text"}
                />
              </div>
              <div className="formRowItem">
                <label>guarantor email:</label>
                <input
                  name="form2-email"
                  onChange={changeHandler}
                  value={formData["form2-email"]}
                  type={"text"}
                  placeholder="guarantor email"
                />
              </div>
              <div className="formRowItem">
                <label>guarantor phone no.:</label>
                <input
                  name="form2-phone"
                  onChange={changeHandler}
                  value={formData["form2-phone"]}
                  type={"text"}
                  placeholder="guarantor phone no."
                />
              </div>
            </div>
            <div className={"formRow"}>
              <div className="formRowItem">
                <label>collataral type:</label>
                <select
                  name="form2-collataral_type"
                  value={formData["form2-collataral_type"]}
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
                    <input
                      name="form2-collateral_address"
                      onChange={changeHandler}
                      value={formData["form2-collateral_address"]}
                      type={"text"}
                      placeholder="collateral address"
                    />
                  </div>
                  <div className="formRowItem">
                    <label>country:</label>
                    <input
                      name="form2-collateral_country"
                      onChange={changeHandler}
                      value={formData["form2-collateral_country"]}
                      type={"text"}
                      placeholder="country"
                    />
                  </div>
                </>
              )}
              {!isHouse && (
                <>
                  <div className="formRowItem">
                    <label>libre image:</label>
                    <input
                      name="form2-libre"
                      onChange={changeHandler}
                      value={formData["form2-libre"]}
                      type={"file"}
                      placeholder="libre image"
                    />
                  </div>
                  <div className="formRowItem">
                    <label>plate number:</label>
                    <input
                      name="form2-plateNumber"
                      onChange={changeHandler}
                      value={formData["form2-plateNumber"]}
                      type={"text"}
                      placeholder="plate number"
                    />
                  </div>
                </>
              )}
            </div>
            {isHouse && (
              <>
                <div className={"formRow"}>
                  <div className="formRowItem">
                    <label>city:</label>
                    <input
                      name="form2-city"
                      onChange={changeHandler}
                      value={formData["form2-city"]}
                      type={"text"}
                      placeholder="city"
                    />
                  </div>
                  <div className="formRowItem">
                    <label>subcity:</label>
                    <input
                      name="form2-subcity"
                      onChange={changeHandler}
                      value={formData["form2-subcity"]}
                      type={"text"}
                      placeholder="subcity"
                    />
                  </div>
                  <div className="formRowItem">
                    <label>woreda:</label>
                    <input
                      name="form2-woreda"
                      onChange={changeHandler}
                      value={formData["form2-woreda"]}
                      type={"text"}
                      placeholder="woreda"
                    />
                  </div>
                </div>
                <div className={"formRow"}>
                  <div className="formRowItem">
                    <label>kebele:</label>
                    <input
                      name="form2-kebele"
                      onChange={changeHandler}
                      value={formData["form2-kebele"]}
                      type={"text"}
                      placeholder="kebele"
                    />
                  </div>
                  <div className="formRowItem">
                    <label>house number:</label>
                    <input
                      name="form2-houseNumber"
                      onChange={changeHandler}
                      value={formData["form2-houseNumber"]}
                      type={"text"}
                      placeholder="house number"
                    />
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
                <input
                  name="form3-spouseName"
                  onChange={changeHandler}
                  value={formData["form3-spouseName"]}
                  type={"text"}
                  placeholder="spouse name"
                />
              </div>
              <div className="formRowItem">
                <label>credit type:</label>
                <input
                  name="form3-creditType"
                  onChange={changeHandler}
                  value={formData["form3-creditType"]}
                  type={"text"}
                  placeholder="credit type"
                />
              </div>
              <div className="formRowItem">
                <label>requested amount:</label>
                <input
                  name="form3-amount"
                  onChange={changeHandler}
                  value={formData["form3-amount"]}
                  type={"text"}
                  placeholder="requested amount"
                />
              </div>
            </div>
            <div className={"formRow"}>
              <div className="formRowItem">
                <label>requested period:</label>
                <input
                  name="form3-period"
                  onChange={changeHandler}
                  value={formData["form3-period"]}
                  type={"text"}
                  placeholder="requested period"
                />
              </div>
              <div className="formRowItem">
                <label>requested repayment frequency:</label>
                <input
                  name="form3-frequency"
                  onChange={changeHandler}
                  value={formData["form3-frequency"]}
                  type={"text"}
                  placeholder="requested repayment frequency"
                />
              </div>
              <div className="formRowItem">
                <label>purpose of the loan:</label>
                <input
                  name="form3-purpose"
                  onChange={changeHandler}
                  value={formData["form3-purpose"]}
                  type={"text"}
                  placeholder="purpose of the loan"
                />
              </div>
            </div>
            <div className={"formRow"}>
              <div className="formRowItem">
                <label>income of the borrower:</label>
                <input
                  name="form3-income"
                  onChange={changeHandler}
                  value={formData["form3-income"]}
                  type={"text"}
                  placeholder="income of the borrower"
                />
              </div>
              <div className="formRowItem">
                <label>income of the spouse:</label>
                <input
                  name="form3-spouseIncome"
                  onChange={changeHandler}
                  value={formData["form3-spouseIncome"]}
                  type={"text"}
                  placeholder="income of the spouse"
                />
              </div>
              <div className="formRowItem">
                <label>date of birth of the spouse:</label>
                <input
                  name="form3-spouseDob"
                  onChange={changeHandler}
                  value={formData["form3-spouseDob"]}
                  type={"text"}
                  placeholder="date of birth of the spouse"
                />
              </div>
            </div>
            <div className="formRow">
              <div className="formRowItem">
                <label>source of repayment:</label>
                <input
                  name="form3-repaySource"
                  onChange={changeHandler}
                  value={formData["form3-repaySource"]}
                  type={"text"}
                  placeholder="source of repayment"
                />
              </div>
              <div className="formRowItem">
                <label>TIN number of the borrower:</label>
                <input
                  name="form3-tinNumber"
                  onChange={changeHandler}
                  value={formData["form3-tinNumber"]}
                  type={"text"}
                  placeholder="TIN number of the borrower"
                />
              </div>
              <div className="formRowItem">
                <label>TIN number spouse:</label>
                <input
                  name="form3-spouseTinNumber"
                  onChange={changeHandler}
                  value={formData["form3-spouseTinNumber"]}
                  type={"text"}
                  placeholder="TIN number spouse"
                />
              </div>
            </div>
          </div>
        )}
        <div className="buttonsContainer">
          {activeStep === 0 ? (
            <button style={{ visibility: "hidden" }}></button>
          ) : activeStep < 3 ? (
            <button type="submit" onClick={() => setActiveStep(activeStep - 1)}>
              previous
            </button>
          ) : (
            <button style={{ visibility: "hidden" }}></button>
          )}
          {activeStep === 2 ? (
            <button onClick={() => setActiveStep(activeStep + 1)}>
              submit
            </button>
          ) : activeStep < 3 ? (
            <button onClick={() => setActiveStep(activeStep + 1)}>next</button>
          ) : (
            <button style={{ visibility: "hidden" }}></button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoanForm;
