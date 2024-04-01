const mongoose = require('mongoose');
const Joi = require('joi');

const logSchema = new mongoose.Schema({
 username: String,
 email: String,
 password: String,
})

const userSchema = Joi.object({
  username: Joi.string().required(), 
  email: Joi.string().required(),  
  password: Joi.string().required(),

});

const UserModel = mongoose.model("user", logSchema);
module.exports = {UserModel, userSchema};

