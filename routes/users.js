const express = require('express');
const router = express.Router();
const {register,login,profile, updateProfile} =  require("../controller/userController")
const isUserLoggedIn = require("../middleware/auth")



router.post('/register',register)

router.post('/login',login);

router.get('/profile',isUserLoggedIn,profile);

router.post('/profile',isUserLoggedIn,updateProfile);




module.exports = router;
