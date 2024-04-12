const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false
  }
});

userSchema.statics.register = async function (name, email, phone, password) {

  if(!name || !email || !phone || !password){

    throw new Error("All feilds must be filled")
  }
  
  const existingUser = await this.findOne({ email: email });
  if (existingUser) {
    throw new Error("Email already exists. Please log in");
  }

  if (!validator.isAlpha(name.replace(/\s/g, ""))) {
    throw new Error("Name must contain only alphabetic characters.");
  }

  if (validator.isWhitelisted(name, " \t")) {
    throw new Error("Name must not contain any whitespace characters.");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Enter a valid email");
  }
  if (!validator.isMobilePhone(phone, "any", { strictMode: false })) {
    throw new Error("Please enter a valid phone number.");
  }

  if (!validator.isLength(password, { min: 6 })) {
    throw new Error("Password must be at least 6 characters long.");
  }



  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await this.create({
      name: name,
      email: email,
      phone: phone,
      image:null,
      password: hashPassword,
      
    });

    return newUser;

  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};


userSchema.statics.login = async function(email, password) {

  if(!email|| !password ){

    throw new Error("All feilds must be filled")
  }
  const existingUser = await this.findOne({ email: email });
  if (!existingUser) {
    throw new Error("User not exists. Please register");
  }
  
  if (!validator.isEmail(email)) {
    throw new Error("Enter a valid email");
  }

   if (!validator.isLength(password, { min: 6 })) {
    throw new Error("Password must be at least 6 characters long.");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
