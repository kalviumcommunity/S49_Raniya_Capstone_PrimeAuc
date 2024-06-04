const fs = require('fs');
const path = require('path');

// Adjust the path to userbidnos.txt
const userbidNosFilePath = path.join(__dirname, './userbidno.txt');

let userbidNos = '0000';

// Load existing user bid numbers from file
fs.readFile(userbidNosFilePath, 'utf8', (err, data) => {
  if (!err && data) {
    userbidNos=data.trim()
    console.log(`Loaded bid number: ${userbidNos}`);
  }
  else {
    console.error("Error reading bid number file:", err);
  }
});

const getCurrentUserbidNos = (req, res) => {
  res.json({ userbidNos });
};

const addUserbidNo = (req, res) => {
  const newBidNo = req.body.userbidNos;
  console.log("Received new bid number:", newBidNo);
  userbidNos = newBidNo;
  fs.writeFile(userbidNosFilePath, userbidNos, (err) => {
    if (err) {
      console.error("Error saving userbidNos:", err);
      res.status(500).json({ error: 'Failed to save userbidNos' });
    } else {
      res.status(200).json({ message: 'userbidNos updated successfully' ,userbidNos });
    }
  });
};


module.exports = {
  getCurrentUserbidNos,
  addUserbidNo
};
