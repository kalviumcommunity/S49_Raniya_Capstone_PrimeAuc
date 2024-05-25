import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import "../Styles/Listitem.css";
import axios from 'axios';



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
const theme = createTheme();

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


  const validateForm = () => {
    const { category, title, description, startTime, endTime, reservePrice, image } = formData;


    // Check if all required fields are filled
    if (!category || !title || !description || !startTime || !endTime || !reservePrice || !image) {
      alert("Please fill in all required fields.");
      return false;
    }


    // Check if start time is at least 3 days from now
    const startDate = new Date(startTime);
    const minStartDate = new Date();
    minStartDate.setDate(minStartDate.getDate() + 3);
    if (startDate < minStartDate) {
      alert("Start time must be at least 3 days from the current date.");
      return false;
    }


    // Check if end time is at least 24 hours after start time
    const endDate = new Date(endTime);
    const minEndDate = new Date(startDate);
    minEndDate.setDate(minEndDate.getDate() + 1);
    if (endDate < minEndDate) {
      alert("End time must be at least 24 hours after the start time.");
      return false;
    }


    return true;
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


  const handleSubmit = async() => {
    console.log("Form submitted:", formData);
    const formDataToSend = new FormData();
    formDataToSend.append('category', formData.category);
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('startTime', formData.startTime);
    formDataToSend.append('endTime', formData.endTime);
    formDataToSend.append('reservePrice', formData.reservePrice);
    formDataToSend.append('lot_no', formData.lot_no);
    formDataToSend.append('image', formData.image);
  
    try {
      const response = await axios.post('http://localhost:3000/items', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Form submitted:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  const handleImageUpload = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0]
    }));
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <ThemeProvider theme={theme}>
    <div className="sellboxcontainer" style={{ display: 'flex', justifyContent: 'center' }}>
   <Box
        sx={{
          width: {
            xs: '95%', // 0px and up
            sm: '90%', // 600px and up
            md: '90%', // 900px and up
          },
          typography: {
            xs: 'body2', // smaller screens
            sm: 'body1', // small screens
            md: 'body1', // medium screens
           
          }
        }}
      >
         <Stepper orientation={isSmallScreen ? "vertical" : "horizontal"} nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)} disabled={isSubmitted}>
                  <Typography sx={{ typography: { xs: 'caption', sm: 'body2', md: 'body1', lg: 'body1' } }}>
                    {label}
                  </Typography>
                </StepButton>
              </Step>
            ))}
          </Stepper>
        <div className="sell-form">
          <Typography sx={{ mt: 2, mb: 1, py: 1 ,typography: { xs: 'caption', sm: 'body2', md: 'body1', lg: 'h6' }}}>
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
                  <option value="Art">Art</option>
                  <option value="Antiques and Collectables">Antiques and Collectables</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Others">Others</option>
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
            {activeStep === 3 && (
              <div className="sellstep">
                <label className="sell-label">Reserve Price:</label>
                <input
                  className="sell-input"
                  type="number"
                  name="reservePrice"
                  value={formData.reservePrice}
                  onChange={handleChange}
                />
                <label className="sell-label">Start Price (25% of Reserve Price):</label>
                <input
                  className="sell-input"
                  type="number"
                  name="startPrice"
                  value={formData.reservePrice * 0.25}
                  disabled
                />
              </div>
            )}
            {activeStep === 4 && (
              <div className="sellstep">
                <label className="sell-label">Image:</label>
                <input
                  className="sell-file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            )}
            {activeStep === 5 && (
              <div className="sellstep">
                <h3 className="sell-heading">Review and Submit</h3>
                <p className="sell-review">Category: {formData.category}</p>
                <p className="sell-review">Title: {formData.title}</p>
                <p className="sell-review">Description: {formData.description}</p>
                <p className="sell-review">Start Time: {formData.startTime}</p>
                <p className="sell-review">End Time: {formData.endTime}</p>
                <p className="sell-review">Reserve Price: {formData.reservePrice}</p>
                <p className="sell-review">Start Price: {formData.reservePrice * 0.25}</p>
                <p className="sell-review">Image: {formData.image ? formData.image.name : "No image uploaded"}</p>
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

    </ThemeProvider>
  );
}



