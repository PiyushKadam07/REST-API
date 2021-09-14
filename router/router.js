const express = require('express');
const router = express.Router();
const controller = require('../Controller/userController');
const token = require('../utils/authorization');

console.log("Inside users router");

// create new user details
router.post("/register", controller.registeruser);

// get all user details
router.get("/allusers", token.authenticateToken, controller.displayusers);

// create login user details
router.post("/login", token.createToken, controller.loginuser);

//display specific user
router.get('/user_detail/:id', token.authenticateToken, controller.specificuser);

// delete user details
router.delete('/delete/:id', token.authenticateToken, controller.deleteuser);

// update user details
router.patch('/update/:id', token.authenticateToken, controller.updateuser);

// forget password
router.post('/forget/:id', controller.forgetPassword);

// reset password
router.patch('/reset/:id', controller.resetPassword);

module.exports = router;