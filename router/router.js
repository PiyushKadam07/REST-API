const express = require('express');
const router = express.Router();
const controller = require('../Controller/userController');

console.log("Inside users router");

// create new user details
router.post("/register", controller.registeruser);

// get all user details
router.get("/allusers", controller.displayusers);

// create login user details
router.post("/login", controller.loginuser);

//display specific user
router.get('/user_detail/:id', controller.specificuser);

// delete user details
router.delete('/delete/:id', controller.deleteuser);

// update user details
router.patch('/update/:id', controller.updateuser);

module.exports = router;