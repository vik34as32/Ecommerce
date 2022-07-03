const jwt =require('jsonwebtoken')
const Secretkey =process.env.SECRETKEY
const catchAsyncErrors =require('../middleware//catchAsyncError')
const ErrorHandler =require('../utils/ErrorHandler')


exports.IsAuthencation =catchAsyncErrors(async(req,res,next)=>{
    const token  = req.headers.authorization

    if(!token){
          return next(new ErrorHandler('User is not authorised && This page Only Access only authorised user',401))
    }
     
    const VerifyUser =await jwt.verify(token.split(' ')[1],Secretkey)

    if(!VerifyUser){
        return next(new ErrorHandler('User is not authorised && This page Only Access only authorised user',401))
    }

    req.user =VerifyUser
  
    next()
  
})


exports.authorizeRoles =(...role)=>{
    return (req,res,next) =>{
          console.log(req.user)
        if(!role.includes(req.user.role)){
            console.log(req.user.role)
          return next(new ErrorHandler(`${req.user.role} can not access this resources`));
        };
        next();
    }
}


