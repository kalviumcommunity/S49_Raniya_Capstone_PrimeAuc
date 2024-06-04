import React, { useState, useEffect } from 'react';
import axios from 'axios';

const generateBidno = (prevbidno) => {
  // Convert the previous bidno to an integer and add 1
  const nextbidno = parseInt(prevbidno,10) + 1;

  // Return the next bidno as a string, optionally pad with leading zeros if needed
  // Here assuming bid numbers should be 4 digits long, adjust as necessary
  return String(nextbidno).padStart(4, '0');
};

export const UniqueUserBidNo = () => {
  const [bidno, setbidno] = useState("0000");
  const [generatedNumbers, setGeneratedNumbers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchbidno = async () => {
      try {
        const response = await axios.get('http://localhost:3000/current-userbidno');
        const fetchedBidNo = response.data.userbidNos.trim();
        console.log("Fetched bid number:", fetchedBidNo);
        setbidno(fetchedBidNo);
      } catch (error) {
        console.error("Error fetching bidno:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchbidno();
  }, []);
  const generateNextNumber = async () => {
    const nextbidno = generateBidno(bidno);
    setbidno(nextbidno);
    setGeneratedNumbers([...generatedNumbers, nextbidno]);
  
    try {
      const response = await axios.post('http://localhost:3000/add-userbidno', { userbidNos: nextbidno });
      console.log("Updated bid number response:", response.data);
      setbidno(response.data.userbidNos); // 
    } catch (error) {
      console.error("Error updating bidno:", error);
    }
  
    return nextbidno;
  };
  

  return { generateNextNumber, generatedNumbers, loading, bidno };
};