require("dotenv").config()
const cors = require("cors");  
const createError = require('http-errors');
const express = require('express');
const config = require("./config/config");
const path = require('path');
const usersRouter = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', usersRouter);


app.use('*',function(req,res,next){

  res.status(404).json({msg:"Not foun"})
})
module.exports = app;
