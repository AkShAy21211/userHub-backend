const userModel = require("../models/userModel");
const {createToken}  =require("../helper/jwt")








 const register = async (req, res) => {

  const { name, email, phone, password } = req.body;

  console.log( name, email, phone, password);
  try {
    const user = await userModel.register(name,email,phone, password);
    res.status(200).json({ message: "Register successful", user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

 const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email, password);
    const token = createToken(user._id)
    res.status(200).json({ message: "login successful", email:email,name:user.name,token:token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};


const profile = async(req,res)=>{

  const _id = req.user._id;
  try{
   const user = await userModel.findById(_id);
   res.status(200).json({user})

  }catch(error){
   res.status(403).json({error})

  }

}

const updateProfile = async(req,res)=>{

  const formData = req.body;
  console.log(formData);
  try{
   const user = await userModel.findById(_id);
   res.status(200).json({user})

  }catch(error){
   res.status(403).json({error})  
  }

}

module.exports = { register, login,profile,updateProfile };
