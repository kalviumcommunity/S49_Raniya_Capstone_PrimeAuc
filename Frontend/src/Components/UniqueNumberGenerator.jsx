import { useState, useEffect } from "react";
import axios from "axios";

const generateLotNo = (prevSequence) => {
  const getNextSequence = (prevSequence) => {
    let [letters, numbers] = [prevSequence.slice(0, 2), prevSequence.slice(2)];
    numbers = parseInt(numbers) + 1;

    if (numbers > 9999) {
      numbers = 1;
      letters = incrementLetters(letters);
    }

    return letters + String(numbers).padStart(4, '0');
  };

  const incrementLetters = (letters) => {
    const lastChar = letters[1];
    const firstChar = letters[0];

    if (lastChar === 'Z') {
      if (firstChar === 'Z') {
        throw new Error("Exhausted all possible sequences");
      }
      return String.fromCharCode(firstChar.charCodeAt(0) + 1) + 'A';
    }

    return firstChar + String.fromCharCode(lastChar.charCodeAt(0) + 1);
  };

  return getNextSequence(prevSequence);
};

export const UniqueNumberGenerator = () => {
  const currentYear = new Date().getFullYear();
  const yearCode = (currentYear % 100).toString() + (currentYear % 100).toString();
  
  const [sequence, setSequence] = useState("AA0000");
  const [generatedNumbers, setGeneratedNumbers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSequence = async () => {
      try {
        const response = await axios.get('http://localhost:3000/current-sequence');
        setSequence(response.data.sequence);
      } catch (error) {
        console.error("Error fetching sequence:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSequence();
  }, []);

  const generateNextNumber = async () => {
    const nextSequence = generateLotNo(sequence);
    setSequence(nextSequence);
    const newLotNo = yearCode + nextSequence;
    setGeneratedNumbers([...generatedNumbers, newLotNo]);

    try {
      await axios.post('http://localhost:3000/update-sequence', { sequence: nextSequence });
    } catch (error) {
      console.error("Error updating sequence:", error);
    }

    return newLotNo;
  };

  return { generateNextNumber, generatedNumbers, loading };
};
