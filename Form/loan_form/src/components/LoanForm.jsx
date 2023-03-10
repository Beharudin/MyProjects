import React, { useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import StepLabel from "@mui/material/StepLabel";
import AccountBalance from "@mui/icons-material/AccountBalance";
import People from "@mui/icons-material/People";
import Preview from "@mui/icons-material/Preview";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import "./loanform.css";
import { Button, InputLabel, MenuItem, Select } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const LoanForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [collType, setCollType] = useState("house");
  const [isHouse, setIsHouse] = useState(true);

  const steps = [
    "Guarantor & Collateral information",
    "Loan information",
    "Review",
  ];

  const stepIcon = (index) => {
    return index === 0 ? (
      <People />
    ) : index === 1 ? (
      <AccountBalance />
    ) : (
      <Preview />
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

  const initialValues = {
    guarantorFirstName: "",
    guarantorLastName: "",
    guarantorEmail: "",
    guarantorPhoneNumber: "",
    collateralType: "",
    collateralCountry: "",
    collateralCity: "",
    collateralSubCity: "",
    collateralWoreda: "",
    collateralKebele: "",
    collateralHouseNumber: "",
    spouseFirstName: "",
    spouseLastName: "",
    creditType: "",
    requestedAmount: "",
    requestedPeriod: "",
    requestedRepaymentFrequency: "",
    loandPurpose: "",
    userIncome: "",
    spouseIncome: "",
    spouseBirthdate: "",
    repaymentSource: "",
    tinNumber: "",
    spouseTinNumber: "",
    plateNumber: "",
    libreImage: "",
  };

  const loanInitSchema = Yup.object().shape({
    guarantorFirstName: Yup.string().required("First name is required"),
    guarantorLastName: Yup.string().required("Last name is required"),
    guarantorEmail: Yup.string().email().required("Email required"),
    guarantorPhoneNumber: Yup.string().required("Phone number is required"),
    collateralType: Yup.string().required("Collateral type is required"),
    collateralCountry: Yup.string().required("Collateral country is required"),
    collateralCity: Yup.string().required("Collateral city is required"),
    collateralSubCity: Yup.string(),
    collateralWoreda: Yup.string(),
    collateralKebele: Yup.string(),
    collateralHouseNumber: Yup.string(),
    spouseFirstName: Yup.string(),
    spouseLastName: Yup.string(),
    creditType: Yup.string().required("Credit type is required"),
    requestedAmount: Yup.string().required("Requested amount is required"),
    requestedPeriod: Yup.string().required("Requested period is required"),
    requestedRepaymentFrequency: Yup.string().required(
      "Requested repayment frequency is equired"
    ),
    loandPurpose: Yup.string().required("Loan purpose is required"),
    userIncome: Yup.string().required("User income is required"),
    spouseIncome: Yup.string(),
    spouseBirthdate: Yup.string(),
    repaymentSource: Yup.string().required("Repayment source is required"),
    tinNumber: Yup.string().required("TIN number is required"),
    spouseTinNumber: Yup.string(),
    libreImage: Yup.mixed().required("Libre image is required"),
    plateNumber: Yup.string().required("Plate number is required"),
  });

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
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
              <StepLabel
                StepIconComponent={() => stepIcon(index)}
                onClick={() => setActiveStep(index)}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <hr />
        <Formik
          initialValues={initialValues}
          validationSchema={loanInitSchema}
          validateOnMount={true}
          onSubmit={(values) => {
            // same shape as initial values
            console.log(values);
          }}
        >
          {({ errors, touched, handleChange, handleBlur }) => (
            <Form>
              {activeStep === 0 && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Guarantor information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="guarantorFirstName"
                        name="guarantorFirstName"
                        label="First name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange("guarantorFirstName")}
                        onBlur={handleBlur("guarantorFirstName")}
                      />
                      {touched.guarantorFirstName &&
                        errors.guarantorFirstName && (
                          <p style={{ color: "red" }}>
                            {errors.guarantorFirstName}
                          </p>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="guarantorLastName"
                        name="guarantorLastName"
                        label="Last name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange("guarantorLastName")}
                        onBlur={handleBlur("guarantorLastName")}
                      />
                      {touched.guarantorLastName &&
                        errors.guarantorLastName && (
                          <p style={{ color: "red" }}>
                            {errors.guarantorLastName}
                          </p>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="guarantorEmail"
                        name="guarantorEmail"
                        label="Email"
                        fullWidth
                        variant="standard"
                        onChange={handleChange("guarantorEmail")}
                        onBlur={handleBlur("guarantorEmail")}
                      />
                      {errors.guarantorEmail && touched.guarantorEmail && (
                        <p style={{ color: "red" }}>{errors.guarantorEmail}</p>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="guarantorPhoneNumber"
                        name="guarantorPhoneNumber"
                        label="Phone"
                        fullWidth
                        variant="standard"
                        onChange={handleChange("guarantorPhoneNumber")}
                        onBlur={handleBlur("guarantorPhoneNumber")}
                      />
                      {errors.guarantorPhoneNumber &&
                        touched.guarantorPhoneNumber && (
                          <p style={{ color: "red" }}>
                            {errors.guarantorPhoneNumber}
                          </p>
                        )}
                    </Grid>
                  </Grid>
                  <br />
                  <Typography variant="h6" gutterBottom>
                    Collateral information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid tem xs={12} sm={6}>
                      <InputLabel
                        required
                        id="collateralType"
                        fullWidth
                        sx={{ ml: 3, mt: 3 }}
                      >
                        Collateral type
                      </InputLabel>
                      <Select
                        labelId="collateralType"
                        value={collType}
                        label="Collateral type"
                        onChange={handleType}
                        fullWidth
                        variant="standard"
                        sx={{ ml: 3 }}
                      >
                        <MenuItem value="house">House</MenuItem>
                        <MenuItem value="car">Car</MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                  <br />
                  <Typography variant="subtitle1" gutterBottom>
                    Collateral address:
                  </Typography>
                  <Grid container spacing={3}>
                    {!isHouse && (
                      <>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="plateNumber"
                            name="plateNumber"
                            label="Plate number"
                            fullWidth
                            variant="standard"
                            onChange={handleChange("plateNumber")}
                            onBlur={handleBlur("plateNumber")}
                          />
                          {errors.plateNumber &&
                        touched.plateNumber && (
                          <p style={{ color: "red" }}>
                            {errors.plateNumber}
                          </p>
                        )}
                        </Grid>
                        <Grid item xs={12} sm={6} className="buttonsContainer">
                          <Button variant="contained" component="label" size="small">
                            Libre image
                            <input type="file" hidden name="libreImage"/>
                         </Button>
                          <div>
                          {errors.libreImage &&
                        touched.libreImage && (
                          <p style={{ color: "red" }}>
                            {errors.libreImage}
                          </p>
                        )}
                        </div>
                        </Grid>
                      </>
                    )}
                    {isHouse && (
                      <>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="collateralCountry"
                            name="collateralCountry"
                            label="Country"
                            fullWidth
                            variant="standard"
                            onChange={handleChange("collateralCountry")}
                            onBlur={handleBlur("collateralCountry")}
                          />
                          {errors.collateralCountry &&
                            touched.collateralCountry && (
                              <p style={{ color: "red" }}>
                                {errors.collateralCountry}
                              </p>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="collateralCity"
                            name="collateralCity"
                            label="City"
                            fullWidth
                            variant="standard"
                            onChange={handleChange("collateralCity")}
                            onBlur={handleBlur("collateralCity")}
                          />
                          {errors.collateralCity && touched.collateralCity && (
                            <p style={{ color: "red" }}>
                              {errors.collateralCity}
                            </p>
                          )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id="collateralState"
                            name="CollateralState"
                            label="Subcity"
                            fullWidth
                            variant="standard"
                            onChange={handleChange("collateralState")}
                            onBlur={handleBlur("collateralState")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id="collateralWoreda"
                            name="collateralWoreda"
                            label="Woreda"
                            fullWidth
                            variant="standard"
                            onChange={handleChange("collateralWoreda")}
                            onBlur={handleBlur("collateralWoreda")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id="collateralKebele"
                            name="collateralKebele"
                            label="Kebele"
                            fullWidth
                            variant="standard"
                            onChange={handleChange("collateralKebele")}
                            onBlur={handleBlur("collateralKebele")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id="collateralHouseNo"
                            name="collateralHouseNo"
                            label="House No."
                            fullWidth
                            variant="standard"
                            onChange={handleChange("collateralHouseNo")}
                            onBlur={handleBlur("collateralHouseNo")}
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>
                </>
              )}
              {activeStep === 1 && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Loan information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="spouseFirstName"
                        name="spouseFirstName"
                        label="Spouse First name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange("spouseFirstName")}
                        onBlur={handleBlur("spouseFirstName")}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="spouseLastName"
                        name="spouseLastName"
                        label="Spouse Last name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange("spouseLastName")}
                        onBlur={handleBlur("spouseLastName")}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="creditType"
                        name="creditType"
                        label="Credit Type"
                        fullWidth
                        variant="standard"
                        onChange={handleChange("creditType")}
                        onBlur={handleBlur("creditType")}
                      />
                      {errors.creditType && touched.creditType && (
                        <p style={{ color: "red" }}>{errors.creditType}</p>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="requestedAmount"
                        name="requestedAmount"
                        label="Requested Amount"
                        fullWidth
                        variant="standard"
                        onChange={handleChange("requestedAmount")}
                        onBlur={handleBlur("requestedAmount")}
                      />
                      {errors.requestedAmount && touched.requestedAmount && (
                        <p style={{ color: "red" }}>{errors.requestedAmount}</p>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="requestedPeriod"
                        name="requestedPeriod"
                        label="Requested period"
                        fullWidth
                        variant="standard"
                        onChange={handleChange("requestedPeriod")}
                        onBlur={handleBlur("requestedPeriod")}
                      />
                      {errors.requestedPeriod && touched.requestedPeriod && (
                        <p style={{ color: "red" }}>{errors.requestedPeriod}</p>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="requestedRepaymentFrequency"
                        name="requestedRepaymentFrequency"
                        label="Requested Repayment Frequency"
                        fullWidth
                        variant="standard"
                        onChange={handleChange("requestedRepaymentFrequency")}
                        onBlur={handleBlur("requestedRepaymentFrequency")}
                      />
                      {errors.requestedRepaymentFrequency &&
                        touched.requestedRepaymentFrequency && (
                          <p style={{ color: "red" }}>
                            {errors.requestedRepaymentFrequency}
                          </p>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="loandPurpose"
                        name="loandPurpose"
                        label="Purpose of Loan"
                        fullWidth
                        variant="standard"
                        onChange={handleChange("loandPurpose")}
                        onBlur={handleBlur("loandPurpose")}
                      />
                      {errors.loandPurpose && touched.loandPurpose && (
                        <p style={{ color: "red" }}>{errors.loandPurpose}</p>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="userIncome"
                        name="userIncome"
                        label="Income of Borrower"
                        fullWidth
                        variant="standard"
                        onChange={handleChange("userIncome")}
                        onBlur={handleBlur("userIncome")}
                      />
                      {errors.userIncome && touched.userIncome && (
                        <p style={{ color: "red" }}>{errors.userIncome}</p>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="spouseIncome"
                        name="spouseIncome"
                        label="Income of Spouse"
                        fullWidth
                        variant="standard"
                        onChange={handleChange("spouseIncome")}
                        onBlur={handleBlur("spouseIncome")}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="spouseBirthdate"
                        name="spouseBirthdate"
                        label="Birth Date of Spouse"
                        fullWidth
                        variant="standard"
                        onChange={handleChange("spouseBirthdate")}
                        onBlur={handleBlur("spouseBirthdate")}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="repaymentSource"
                        name="repaymentSource"
                        label="Source of Repayment"
                        fullWidth
                        variant="standard"
                        onChange={handleChange("repaymentSource")}
                        onBlur={handleBlur("repaymentSource")}
                      />
                      {errors.repaymentSource && touched.repaymentSource && (
                        <p style={{ color: "red" }}>{errors.repaymentSource}</p>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="tinNumber"
                        name="tinNumber"
                        label="TIN of Borrower"
                        fullWidth
                        variant="standard"
                        onChange={handleChange("tinNumber")}
                        onBlur={handleBlur("tinNumber")}
                      />
                      {errors.tinNumber && touched.tinNumber && (
                        <p style={{ color: "red" }}>{errors.tinNumber}</p>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="spouseTinNumber"
                        name="spouseTinNumber"
                        label="TIN of Spouse"
                        fullWidth
                        variant="standard"
                        onChange={handleChange("spouseTinNumber")}
                        onBlur={handleBlur("spouseTinNumber")}
                      />
                    </Grid>
                  </Grid>
                </>
              )}
              {activeStep === 2 && (
                <div>
                  <div className={"formRow"}>
                    <Typography variant="h6" gutterBottom>
                      All informations
                    </Typography>
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
                  <button onClick={() => setActiveStep(activeStep + 1)}>
                    next
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default LoanForm;
