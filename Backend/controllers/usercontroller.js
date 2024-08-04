// controllers/userController.js
const { UserModel } = require('../models/User.js'); // Correct path to user model

const getAllUsers = async (req, res) => {
  try {
    const data = await UserModel.find();
    console.log("Query executed:", data); // Log the query result
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getUserByBidNo = async (req, res) => {
  const { userbid_no } = req.query;
  try {
    const user = await UserModel.findOne({ userbid_no });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  getUserByBidNo
};