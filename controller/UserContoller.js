const User =require('../models/UserModel')
const catchAsyncErrors =require('../middleware/catchAsyncError')
const ErrorHandler =require('../utils/ErrorHandler')
const jwt = require('jsonwebtoken')
const Secretkey =process.env.SECRETKEY


// Create A new User
exports.CreateNewUser =catchAsyncErrors(async(req,res,next)=>{
    console.log(req.body)
    const {name,email,password,confirmpassword} =req.body
    const user =await User.create({
        name:name,
        email:email,
        password:password,
        confirmpassword:confirmpassword,
        avatar:{
            public_id:'https://unsplash.com/photos/7KLa-xLbSXA',
            url:'https://unsplash.com/photos/7KLa-xLbSXA'
        }
    })
    res.status(201).json({
        message:'Create a new User Sucessfully',
        user
    })
})







//Login A user
exports.LoginUser =catchAsyncErrors(async(req,res,next)=>{
    console.log(req.body)
     const {email,password} =req.body
     if(!email ||!password){
        return next(new ErrorHandler('pleae enter email and password ',400))
     }
     const user =await User.findOne({email:email}).select('+password')
     console.log(user)
      
     if(!user){
         return next(new ErrorHandler(`User is not found email is: ${req.body.email} and  pasword is: ${req.body.password} not a rigisted && please signup the account`,401) )
     }
     const isPasswordMatch = await user.comparepassword(password)
     

     if(!isPasswordMatch){
         return next(new ErrorHandler('Invalid login credentials',401))
     }

     const token = jwt.sign({
         _id:user.id,
         name:user.name,
         email:user.email,
         avatar:user.avatar.url,
         role:user.role
     },Secretkey,{ expiresIn :'2h' })

     res.status(200).json({
        _id:user.id,
        name:user.name,
        email:user.email,
        avatar:user.avatar.url,
        token:token
     })

})



// Check your Profile

exports.UserDetails =catchAsyncErrors(async(req,res,next)=>{
      const user =await User.findOne({email:req.user.email})

      res.status(200).json({
          sucess:true,
          user,
      })

})

//  update me profile
exports.UpdateProfile =catchAsyncErrors(async(req,res,next)=>{
      const user =await User.findOneAndUpdate({email:req.user.email},req.bod,{new:true})

      res.status(200).json({
          message:'SucessFully Updated',
          user
      })
})


// Upadte User Password

exports.UpdatePassword =catchAsyncErrors(async(req,res,next)=>{
    const user =await User.findOne({email:req.user.email}).select('+password')

    const isPasswordMatch = await user.comparepassword(req.body.oldpassword)

    if(!isPasswordMatch){
        return next(new ErrorHandler('Old Password are Incorrect',400))
    }
   

    if(req.body.password !==req.body.confirmpassword){
        return next( new ErrorHandler("password are not match to each others",400))
    }
   
    user.password =req.body.password,
    await user.save()
    res.status(200).json({
        message:'password Updated sucessfuuly'
    })
})



//GET Alll User ---Admin

exports.GetAllUser =catchAsyncErrors(async(req,res,next)=>{
   const user =await User.find()

   res.status(200).json({
       sucess:true,
       user
   })
})

//Get Single User  --Admin
exports.GetSingleUser =catchAsyncErrors(async(req,res,next)=>{
    const user =await User.findOne({email:req.query.email})

    if(!user){
        return next(new ErrorHandler(`User is not found this email:${req.body.email}`,400))
    } 

    res.status(200).json({
        sucess:true,
        user
    })
})


//Chnage User role ---Admin
exports.UpdateUserRole =catchAsyncErrors(async(req,res,next)=>{
     const newUserData ={
         name:req.body.name,
         email:req.body.email,
         role:req.body.role
     }

     const user =await User.findOne(req.params.id,newUserData,{
         new:true,
         runValidators:true,
         usefindAndModify:false
     })

     res.status(200).json({
         sucess:true,
         user
     })
})


//Delete User --Admin
exports.deleteUser=catchAsyncErrors(async(req,res,next)=>{
    
    const user =await User.findById(req.params.id);

    if(!user){
          return next(new ErrorHandler('User is not found thid id',404))
    }
    await user.remove()

    res.status(200).json({
        sucess:true,
        message:'User delete Sucessfully'
    })

})