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



const generateLotNo = () => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `2024CS${randomNum}`;
};


export default function Listitem() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
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


  const handleCloseModal = () => {
    setIsModalOpen(false);
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

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Lot Number
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Your generated lot number is: {formData.lot_no}
          </Typography>
          <Button onClick={handleCloseModal}>Close</Button>
        </Box>
      </Modal>

       
    </div>
 
  );
}
