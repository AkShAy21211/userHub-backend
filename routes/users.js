const express = require('express');
const router = express.Router();
const {register,createPost,login,profile, deletePost ,updateProfile,getPosts} =  require("../controller/userController")
const isUserLoggedIn = require("../middleware/auth")
const upload = require("../middleware/multer");


router.post('/register',register)

router.post('/login',login);

router.get('/profile',isUserLoggedIn,profile);

router.post('/profile',isUserLoggedIn,upload.single('image'),updateProfile);

router.get('/',isUserLoggedIn,getPosts);

router.post('/create',isUserLoggedIn,upload.single('image'),createPost);

router.delete('/delete/:id',isUserLoggedIn,deletePost);



module.exports = router;
