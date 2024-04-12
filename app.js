require("dotenv").config();
const express = require('express');
const cors = require("cors")
const usersRouter = require('./routes/users');
const config = require("./config/config")
const app = express();
app.use(cors({
  origin:[process.env.LOCAL_URL,process.env.HOST_URL,process.env.HOST_URL_TWO]
}));
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/', usersRouter);


app.use('*',function(req,res,next){

  res.status(404).json({msg:"Not foun"})
})
module.exports = app;
