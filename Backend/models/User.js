const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
   
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function(value) {
        return /\S+@\S+\.\S+/.test(value);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  token:{
    type: Number,
    required: true,

  }
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel, userSchema };
