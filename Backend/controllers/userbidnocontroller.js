const fs = require('fs');
const path = require('path');

// Adjust the path to userbidnos.txt
const userbidNosFilePath = path.join(__dirname, './userbidnos.txt');

const generateUserBidNo = () => {
  const randomNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // Generate a 4-digit number and pad with zeros
  return `biduser_${randomNumber}`;
};

let userbidNos = [];

// Load existing user bid numbers from file
fs.readFile(userbidNosFilePath, 'utf8', (err, data) => {
  if (!err && data) {
    userbidNos = data.split('\n').filter(Boolean);
  }
});

const getCurrentUserbidNos = (req, res) => {
  res.json({ userbidNos });
};

const addUserbidNo = (req, res) => {
  const newUserbidNo = generateUserBidNo();
  userbidNos.push(newUserbidNo);
  fs.writeFile(userbidNosFilePath, userbidNos.join('\n'), (err) => {
    if (err) {
      console.error("Error saving user bid numbers:", err);
      res.status(500).json({ error: 'Failed to save user bid number' });
    } else {
      res.status(200).json({ message: 'User bid number added successfully', userbidNo: newUserbidNo });
    }
  });
};

module.exports = {
  getCurrentUserbidNos,
  addUserbidNo
};
