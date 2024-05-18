// CountdownTimer.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Styles/Timer.css";

const CountdownTimer = ({ lotno, onCountdownEnded }) => {
  // State variables to hold start and end times
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // Fetch start and end times from the backend
  useEffect(() => {
    axios.get(`http://localhost:3000/itemdetails/${lotno}`)
      .then(response => {
        const { start_time, end_time } = response.data;
        setStartTime(new Date(start_time));
        setEndTime(new Date(end_time));
        console.log(start_time, end_time);
        if (new Date(end_time) < new Date()) {
          onCountdownEnded(true); // Notify parent component when countdown ends
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [lotno]);

  // Calculate remaining time and format it
  const calculateTimeLeft = () => {
    if (endTime) {
      const now = new Date().getTime();
      const difference = Math.max(0, endTime - now); // Ensure difference is not negative
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    } else {
      return null;
    }
  };

  // State variable to hold remaining time
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Update remaining time every second
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [timeLeft, endTime]); // Update when timeLeft or endTime changes

  // Format the time left for display
  const formatTime = time => {
    return time < 10 ? `0${time}` : time;
  };

  // Determine if the countdown has ended
  const countdownEnded = timeLeft && timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div className="countdown-container">
    {countdownEnded ? (
      <p className="countdown-ended-text">Countdown Ended</p>
    ) : timeLeft ? (
      <div className='timer'>
       
        <div className="container">
          {["days", "hours", "minutes", "seconds"].map(unit => (
            <div key={unit} className={`container-segment ${unit}`}>
              <div className="segment-title">{unit.charAt(0).toUpperCase() + unit.slice(1)}</div>
              <div className="segment">
                <div className="flip-card">
                  <div className="top">{formatTime(timeLeft[unit])}</div>
                  <div className="bottom">{formatTime(timeLeft[unit])}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <p className="loading-text">Loading...</p>
    )}
  </div>
  );
};

export default CountdownTimer;
