const fs = require('fs');
const path = require('path');

// Adjust the path to userbidnos.txt
const userbidNosFilePath = path.join(__dirname, './userbidnos.txt');

let userbidNos = '0000';

// Load existing user bid numbers from file
fs.readFile(userbidNosFilePath, 'utf8', (err, data) => {
  if (!err && data) {
    userbidNos=data
  }
});

const getCurrentUserbidNos = (req, res) => {
  res.json({ userbidNos });
};

const addUserbidNo = (req, res) => {
  userbidNos = req.body.userbidNos;
  fs.writeFile(userbidNosFilePath, userbidNos, (err) => {
    if (err) {
      console.error("Error saving userbidNos:", err);
      res.status(500).json({ error: 'Failed to save userbidNos' });
    } else {
      res.status(200).json({ message: 'userbidNos updated successfully' });
    }
  });
};

module.exports = {
  getCurrentUserbidNos,
  addUserbidNo
};
