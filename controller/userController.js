const userModel = require("../models/userModel");
const { createToken } = require("../helper/jwt");
const postModel = require("../models/postModel");

const register = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const user = await userModel.register(name, email, phone, password);
    res.status(200).json({ message: "Register successful", user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const login = async (req, res) => {

  const { email, password } = req.body;

  try {
    const user = await userModel.login(email, password);
    const token = createToken(user._id);
    res
      .status(200)
      .json({
        message: "login successful",
        email: email,
        name: user.name,
        token: token,
      });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const profile = async (req, res) => {
  const _id = req.user ? req.user._id : null;
  try {
    const user = await userModel.findById(_id);
    res.status(200).json(user);
  } catch (error) {
    res.status(403).json({ error });
  }
};

const updateProfile = async (req, res) => {
  const { name, email, phone } = req.body;

  const image = req.file ? req.file.path : "";
  const imageName = image.split('\\').pop();

  try {
    let user = await userModel.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { name: name, email: email, phone: phone } },
      { new: true }
    );
    const existingImage = user.image;
    if (image) {
      user = await userModel.findOneAndUpdate(
        { _id: req.user._id },
        { $set: { image: imageName } },
        { new: true }
      );
    } else {
      user = await userModel.findOneAndUpdate(
        { _id: req.user._id },
        { $set: { image: existingImage } },
        { new: true }
      );
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(403).json({ error });
  }
};

const createPost = async (req, res) => {
  const { title, content } = req.body;

  const image = req.file ? req.file.path : "";
  const imageName = image.split('\\').pop();

  const id = req.user?req.user._id:null;

  
  try {
    const post = new postModel({
      title: title,
      content: content,
      image: imageName,
      author:id
    });

    await post.save();
    if (post) {
      res.status(200).json({});
    } else {
      res.status(500).json({ msg: "someting went wrong server error" });
    }
  } catch (error) {
    res.status(403).json(error);
    console.log(error);
  }
};

const getPosts = async (req, res) => {



  
  try {
    const post = await postModel.find({}).populate('author');

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(500).json({ msg: "someting went wrong server error" });
    }
  } catch (error) {
    res.status(403).json(error);
    console.log(error);
  }
};


const deletePost =  async (req,res)=>{
console.log('called');
  const {id} = req.params;

  try{
if(id){

  console.log(id);
    await postModel.findByIdAndDelete(id);
    const posts = await  postModel.find({})
    res.status(200).json({msg:"Post deleted successfully",posts:posts})
  }else{
     res.status(403).json({msg:"something went wrong"})

  }
  }catch(error){
    console.log(error);
     res.status(403).json(error)

  }

}


module.exports = { register, login, profile, deletePost,updateProfile, createPost,getPosts };
