const fs = require('fs');
const path = require('path');

// Adjust the path to sequence.txt
const sequenceFilePath = path.join(__dirname, './sequence.txt');

let sequence = 'AA0000';

fs.readFile(sequenceFilePath, 'utf8', (err, data) => {
  if (!err && data) {
    sequence = data;
  }
});

const getCurrentSequence = (req, res) => {
  res.json({ sequence });
};

const updateSequence = (req, res) => {
  sequence = req.body.sequence;
  fs.writeFile(sequenceFilePath, sequence, (err) => {
    if (err) {
      console.error("Error saving sequence:", err);
      res.status(500).json({ error: 'Failed to save sequence' });
    } else {
      res.status(200).json({ message: 'Sequence updated successfully' });
    }
  });
};

module.exports = {
  getCurrentSequence,
  updateSequence
};
