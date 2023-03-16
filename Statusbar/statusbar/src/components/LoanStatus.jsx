// import React, { useEffect, useState } from "react";
// import {
//   Stepper,
//   Step,
//   Container,
//   Paper,
//   StepLabel,
//   Typography,
//   Box,
// } from "@mui/material";
// import { AccountBalance, People, CheckCircle } from "@mui/icons-material";

// function LoanStatus() {
//   const [activeStep, setActiveStep] = useState(0);
//   const [status, setStatus] = useState([]);

//   const steps = ["User", "Branch", "District", "HO", "Final"];

//   const stepIcon = (index) => {
//     return index === 0 ? (
//       <People />
//     ) : index === 1 ? (
//       <AccountBalance />
//     ) : index === 2 ? (
//       <AccountBalance />
//     ) : index === 3 ? (
//       <AccountBalance />
//     ) : (
//       <CheckCircle />
//     );
//   };

//   useEffect(() => {
//     if (activeStep === 0) {
//       setStatus(["Starting", "Waiting", "Waiting", "Waiting", "Waiting"]);
//     } else if (activeStep === 1) {
//       setStatus(["Approved", "Reviewing", "Waiting", "Waiting", "Waiting"]);
//     } else if (activeStep === 2) {
//       setStatus(["Approved", "Approved", "Reviewing", "Waiting", "Waiting"]);
//     } else if (activeStep === 3) {
//       setStatus(["Approved", "Approved", "Approved", "Reviewing", "Waiting"]);
//     } else {
//       setStatus(["Approved", "Approved", "Approved", "Approved", "Approved"]);
//     }
//   }, [activeStep]);

//   return (
//     <Container
//       component="main"
//       sx={{
//         mb: 4,
//       }}
//     >
//       <Paper
//         variant="outlined"
//         sx={{
//             my: { xs: 3, md: 6 },
//             p: { xs: 2, md: 3 },
//           boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
//           overflow:"hidden", overflowX: "scroll",
        
//         }}
//       >
//         <Stepper
//         alternativeLabel
//           activeStep={activeStep}
//           sx={{
//             width: "100%",
//             marginTop: "22px",
//             marginBottom: "22px",
//             "& .MuiStepConnector-line": { marginTop: "52px" },
//             textAlign: "center",
//           }}
//         >
//           {steps.map((label, index) => (
//             <Step
//               key={label}
//               sx={{
//                 "& .MuiStepLabel-root .Mui-completed": {
//                   color: "success.light", // circle color (COMPLETED)
//                 },
//                 "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
//                   {
//                     color: "grey.700", // Just text label (COMPLETED)
//                   },
//                 "& .MuiStepLabel-root .Mui-active": {
//                   color: index !== 4? "orange": "success.light", // circle color (ACTIVE)
//                 },
//                 "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
//                   {
//                     color: "common.black", // Just text label (ACTIVE)
//                   },
//                 "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
//                   fill: "black", // circle's number (ACTIVE)
//                 },
//               }}
//             >
//               <div style={{ marginBottom: "30px" }}>
//                 <Typography
//                   align="center"
//                   sx={{
//                     zIndex: "2",
//                     background: "#FFF",
//                     display: "inline",
//                     position: "relative",
//                     padding: "0 15px",
//                   }}
//                 >
//                   {label}
//                 </Typography>
//               </div>
//               <StepLabel
//                 StepIconComponent={() => stepIcon(index)}
//                 onClick={() => setActiveStep(index)}
//               >
//                 {status[index]}
//               </StepLabel>
//             </Step>
//           ))}
//         </Stepper>
//       </Paper>
//     </Container>
//   );
// }

// export default LoanStatus;


import React, { useEffect, useState } from "react";
import {
  Stepper,
  Step,
  Container,
  Paper,
  StepLabel,
  Typography,
  Box,
} from "@mui/material";
import { AccountBalance, People, CheckCircle } from "@mui/icons-material";
import axios from "axios";
import { BASE_CAMADPTR_URL, cookies } from "../..";

export default function LoanStatus({ loanType }) {
  const [activeStep, setActiveStep] = useState(0);
  const [status, setStatus] = useState([]);
  const [data, setData] = useState(null);
  const [steps, setsteps] = useState([]);
  const userId = cookies.get("userId");
  const [loading, setLoading] = useState(false);

  // const steps = ['User', 'Branch', 'District', 'HO', 'Final'];

  const stepIcon = (index) => {
    return index === 0 ? (
      <People />
    ) : index === 1 ? (
      <AccountBalance />
    ) : index === 2 ? (
      <AccountBalance />
    ) : index === 3 ? (
      <AccountBalance />
    ) : (
      <CheckCircle />
    );
  };

  const fetchStatus = async (loanType) => {
    setLoading(true);
    const resp = await axios.get(
      `${BASE_CAMADPTR_URL}/getProcessStatus?customerId=${userId}&loanType=${loanType}`
    );

    setData(resp.data);
    setsteps(myFunc(resp.data));
    console.log(resp.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchStatus(loanType);
    if (activeStep === 0) {
      setStatus([
        "Starting",
        "Waiting",
        "Waiting",
        "Waiting",
        "Waiting",
        "Waiting",
        "Waiting",
        "Waiting",
      ]);
    } else if (activeStep === 1) {
      setStatus([
        "Approved",
        "Reviewing",
        "Waiting",
        "Waiting",
        "Waiting",
        "Waiting",
        "Waiting",
        "Waiting",
      ]);
    } else if (activeStep === 2) {
      setStatus([
        "Approved",
        "Approved",
        "Reviewing",
        "Waiting",
        "Waiting",
        "Waiting",
        "Waiting",
        "Waiting",
      ]);
    } else if (activeStep === 3) {
      setStatus([
        "Approved",
        "Approved",
        "Approved",
        "Reviewing",
        "Waiting",
        "Waiting",
        "Waiting",
        "Waiting",
      ]);
    } else {
      setStatus([
        "Approved",
        "Approved",
        "Approved",
        "Approved",
        "Approved",
        "Waiting",
        "Waiting",
        "Waiting",
      ]);
    }
  }, []);

  const myFunc = (sampleData) => {
    return sampleData.map((obj) => {
      return obj.name;
    });
  };

  return (
    <Container
      component="main"
      sx={{
        mb: 4,
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          my: { xs: 3, md: 6 },
          p: { xs: 2, md: 3 },
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          overflow: "hidden",
          overflowX: "scroll",
        }}
      >
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          sx={{
            width: "100%",
            marginTop: "22px",
            marginBottom: "22px",
            "& .MuiStepConnector-line": { marginTop: "200px" },
            textAlign: "center",
            justifyContent: "space-between",
          }}
        >
          {steps.map((label, index) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
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
                    color: index !== 4 ? "orange" : "success.light", // circle color (ACTIVE)
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
                <div style={{ marginBottom: "30px" }}>
                  <Typography
                    align="center"
                    sx={{
                      zIndex: "2",
                      background: "#FFF",
                      display: "inline",
                      position: "relative",
                      padding: "0 15px",
                    }}
                  >
                    {label}
                  </Typography>
                </div>
                <StepLabel
                  StepIconComponent={() => stepIcon(index)}
                  onClick={() => setActiveStep(index)}
                >
                  {status[index]}
                </StepLabel>
              </Step>
            </Box>
          ))}
        </Stepper>
      </Paper>
    </Container>
  );
}
