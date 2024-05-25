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
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);


  const totalSteps = () => steps.length;


  const completedSteps = () => Object.keys(completed).length;


  const isLastStep = () => activeStep === totalSteps() - 1;


  const allStepsCompleted = () => completedSteps() === totalSteps();


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);


    if (activeStep === 0 && !formData.lot_no) {
      const lotNo = generateLotNo();
      setFormData((prevData) => ({
        ...prevData,
        lot_no: lotNo
      }));
    }
  };


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const handleStep = (step) => () => {
    setActiveStep(step);
  };



  const handleComplete = () => {
    if (isLastStep() && !validateForm()) {
      return;
    }


    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);


    if (allStepsCompleted()) {
      handleSubmit();
      setIsSubmitted(true);
      setIsModalOpen(true);
    } else {
      handleNext();
    }
  };


  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
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
        <div className="sell-form">
          <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
            Step {activeStep + 1}
          </Typography>
          <form onSubmit={(e) => e.preventDefault()}>
            {activeStep === 0 && (
              <div className="sellstep">
                <label className="sell-label">Category:</label>
                <select
                  className="sell-select"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option value="art">Art</option>
                  <option value="antiques">Antiques</option>
                  <option value="accessories">Accessories</option>
                  <option value="other">Other</option>
                </select>
              </div>
            )}
            {activeStep === 1 && (
              <div className="sellstep">
                <label className="sell-label">Title:</label>
                <input
                  className="sell-input"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
                <label className="sell-label">Description:</label>
                <textarea
                  className="sell-textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            )}
            {activeStep === 2 && (
              <div className="sellstep">
                <label className="sell-label">Start Time:</label>
                <input
                  className="sell-input"
                  type="datetime-local"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                />
                <label className="sell-label">End Time:</label>
                <input
                  className="sell-input"
                  type="datetime-local"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                />
              </div>
            )}
            
           
          </form>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0 || isSubmitted}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleComplete} disabled={isSubmitted}>
              {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
            </Button>
          </Box>
        </div>
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



