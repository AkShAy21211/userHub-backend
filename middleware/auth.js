const jwt  = require("jsonwebtoken");
const userModel = require("../models/userModel")

const isUserLoggedIn = async(req,res,next)=>{

    const {authorization} = req.headers;
    console.log("Backend....",authorization);
    if(!authorization){

        return res.status(403).json({error:"Authorization token require"});
    }
     const token = authorization.split(' ')[1];

        try{

         const {_id} =  jwt.verify(token,process.env.JWT_SECREAT);

         req.user = await userModel.findOne({_id}).select('_id');

         next();

        }catch(error){


            console.log(error);

            res.status(403).json({error:"Request not authrozied"})
        }



}

module.exports = isUserLoggedIn;