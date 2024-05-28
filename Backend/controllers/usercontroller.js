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

module.exports = {
  getAllUsers
};
