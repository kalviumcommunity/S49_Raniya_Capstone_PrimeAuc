const { UserModel } = require('../models/User.js');
const { signUpSchema, loginSchema } = require('../validation/userValidation.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); 
const jwtSecret = process.env.JWT_SECRET;
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

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user with the hashed password
    const newUser = new UserModel({
      ...req.body,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT
    const token = jwt.sign({ id: newUser._id },jwtSecret, { expiresIn: '2h' });
    res.cookie('jwt', token, { httpOnly: true, secure: true });

    return res.status(201).json({ message: 'User created successfully', user: newUser, token });
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
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '2h' });
    res.cookie('jwt', token, { httpOnly: true, secure: true });

    return res.status(200).json({ message: 'Login successful', user, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const updatePassword = async (req, res) => {
  const { userbid_no, currentPassword, newPassword } = req.body;

  try {
    // Find the user by userbid_no
    const user = await UserModel.findOne({ userbid_no });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the current password matches
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid current password' });
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the new password with the generated salt
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};




module.exports = {
  signupUser,
  loginUser,
  updatePassword,
};
