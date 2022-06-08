const express = require('express');
const UserController =require('../controller/UserContoller')
const router = express.Router()
const IsAuthencation =require('../middleware/IsAuthentication')




router
    .route('/signup')
    .post(UserController.CreateNewUser)




router 
  .route('/signin')
  .post(UserController.LoginUser)


router
     .route('/me')
     .get(IsAuthencation,UserController.UserDetails)
     .patch(IsAuthencation,UserController.UpdateProfile)

router
     .route('/me/password/update')
     .patch(IsAuthencation,UserController.UpdatePassword)     

 module.exports =router   