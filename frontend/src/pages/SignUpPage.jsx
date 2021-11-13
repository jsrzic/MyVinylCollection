import React from "react";
import { pageStyle } from "../styles/globalStyles";
import signupImg from "../assets/signup.png";
import Form from "../components/Form";
import {Box, Button, Checkbox, FormControlLabel, FormGroup, Step, StepLabel, Stepper, Typography} from "@mui/material";


function SignUpPage() {
  const loginPageStyle = {
    display: "flex",
    justifyContent: "center",
    position: "relative",
  };

  const imageStyle = {
    position: "absolute",
    bottom: "-20%",
    animation: "floatUp 1s",
    zIndex: 0
  };

  const formStyle = {
    animation: "fadeIn 4s",
  };

  const steps = [
    "Basic information",
    "Preferred categories",
  ];

  function HorizontalLinearStepper({stepperData}) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
      return step === 1;
    };

    const isStepSkipped = (step) => {
      return skipped.has(step);
    };

    const handleNext = () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // const handleSkip = () => {
    //   if (!isStepOptional(activeStep)) {
    //     throw new Error("You can't skip a step that isn't optional.");
    //   }
    //
    //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //   setSkipped((prevSkipped) => {
    //     const newSkipped = new Set(prevSkipped.values());
    //     newSkipped.add(activeStep);
    //     return newSkipped;
    //   });
    // };

    return (
      <Box width="50%" sx={{zIndex: 1, paddingTop: "130px"}}>
        <Stepper activeStep={activeStep} sx={
          {
            "& .MuiStepLabel-label": {color: "white"},
            "& .MuiStepLabel-label.Mui-active": {color: "#e25c3b"},
            "& .MuiStepLabel-label.Mui-completed": {color: "#e25c3b"}
          }
        }>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography color="white" variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps} color="white" sx={{
                  "& .MuiSvgIcon-root": {color: "white"},
                  "& .MuiSvgIcon-root.Mui-active": {color: "#e25c3b"},
                  "& .MuiSvgIcon-root.Mui-completed": {color: "#e25c3b"},
                  "& .MuiStepIcon-text": {color: "black", fill: "black"},
                }}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <React.Fragment>
          <Box sx={ {display: "flex", justifyContent: "center"}}>
            {stepperData[activeStep]}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            {activeStep !== 0 && <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1, color: "white"  }}
            >
              Back
            </Button>}
            <Box sx={{ width: "66%"}} />
            {/*{isStepOptional(activeStep) && (*/}
            {/*  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1, color: "white" }}>*/}
            {/*    Skip*/}
            {/*  </Button>*/}
            {/*)}*/}

            <Button onClick={handleNext} sx={{color: "#e25c3b"}}>
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      </Box>
    );
  }

  const stepperData0 = () => {
    return (
      <Form style={formStyle}>
        <Form.Row label="Name" type="text" required/>
        <Form.Row label="Surname" type="text" required/>
        <Form.Row label="Username" type="text" required/>
        <Form.Row label="e-mail" type="text" required/>
        <Form.Row label="Password" type="password" required/>
        <Form.Row label="Repeat password" type="password" required/>
      </Form>
    )
  }

  const stepperData1 = () => {
    return (
      <Form style={formStyle}>
        <FormGroup sx={{color: "white"}}>
          <FormControlLabel control={<Checkbox sx={{color: "white", "& .MuiSvgIcon-root": {color: "#e25c3b"}}}/>} label="Label" />
          <FormControlLabel control={<Checkbox sx={{color: "white", "& .MuiSvgIcon-root": {color: "#e25c3b"}}}/>} label="Label" />
          <FormControlLabel control={<Checkbox sx={{color: "white", "& .MuiSvgIcon-root": {color: "#e25c3b"}}}/>} label="Label" />
          <FormControlLabel control={<Checkbox sx={{color: "white", "& .MuiSvgIcon-root": {color: "#e25c3b"}}}/>} label="Label" />
          <FormControlLabel control={<Checkbox sx={{color: "white", "& .MuiSvgIcon-root": {color: "#e25c3b"}}}/>} label="Label" />
        </FormGroup>
      </Form>
    )
  }

  return (
    <div style={{ ...pageStyle, ...loginPageStyle }}>
      <img src={signupImg} style={imageStyle} alt="login_image" />
      <HorizontalLinearStepper stepperData={[stepperData0(), stepperData1()]} />
    </div>
  );
}

export default SignUpPage;
