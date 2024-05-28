// controllers/authController.js
const { UserModel } = require('../models/User.js'); // Correct path to user model
const { signUpSchema, loginSchema } = require('../validation/userValidation.js');
const signupUser = async (req, res) => {
  console.log(req.body);
  try {
    // Validate request body
    const { error } = signUpSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }
    
    // Create a new user
    const newUser = await UserModel.create(req.body);
    return res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
  console.log(req.body);
  try {
    // Validate request body
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    // Check if the user exists
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if the password matches
    if (req.body.password !== user.password) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  signupUser,
  loginUser
};
