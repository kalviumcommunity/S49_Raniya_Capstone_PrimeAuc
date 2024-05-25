import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "../Styles/Listitem.css"

const steps = [
  'Choose Category',
  'Upload Details',
  'Choose Start and End Time',
  'Enter Reserve Price',
  'Upload Image',
  'Review and Submit'  
];

export default function Listitem() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [formData, setFormData] = React.useState({
    category: "",
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    reservePrice: "",
    startPrice: "",
    image: null,
    lot_no: ""
  });

  const handleStep = (step) => () => {
    setActiveStep(step);
  };


  return (
    <div className="sellboxcontainer" style={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '70%' }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)} disabled={isSubmitted}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
       
               
      </Box>
       
    </div>
 
  );
}
