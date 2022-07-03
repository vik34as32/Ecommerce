const express = require('express');
const UserController =require('../controller/UserContoller')
const router = express.Router()
const {IsAuthencation,authorizeRoles} =require('../middleware/IsAuthentication.js')




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
     
     
router
     .route('/admin/users')
     .get(UserController.GetAllUser)     


 router
     .route('/admin/user')   
     .get(UserController.GetSingleUser)  


router
   .route('/admin/user/:id')   
   .get(UserController.GetSingleUser).patch(UserController.UpdateUserRole)
   
   




 module.exports =router   