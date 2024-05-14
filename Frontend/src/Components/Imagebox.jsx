import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { CImage } from '@coreui/react';
import {Link} from "react-router-dom";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function Imagebox({ images, heading }) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = images.length;
    

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

  const handleImageClick = (image) => () => {
      // Check if the click is from auto-sliding
      if (activeStep === images.indexOf(image)) {
        console.log("This is an image of " + image.lot_no);
      }
  };
    return (
        <div>
            <Box sx={{ maxWidth: 400, flexGrow: 1, marginRight: "20px" }}>
                <Paper square elevation={0}>
                    <Typography style={{fontFamily:"poppins", fontWeight:"300",fontSize:"2rem",textAlign:"center",justifyContent:"center" }}>{heading}</Typography>
                </Paper>
                <AutoPlaySwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {images.map((image, index) => (
                        <div key={index} style={{ width: '100%' }}>
                            <Link to={`/itemdetails/${image.lot_no}`}>                             
                             <CImage onClick={handleImageClick(image)} src={image.imgPath} alt={image.lot_no} style={{ width: '100%', height: '500px' }} fluid />
                             </Link>
                        </div>
                    ))}
                </AutoPlaySwipeableViews>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                            Next
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                            Back
                        </Button>
                    }
                />
            </Box>
        </div>
    );
}

export default Imagebox;


//history.push method, you're programmatically navigating to the specified route upon clicking the image