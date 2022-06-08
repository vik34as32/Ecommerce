const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please your Name"],
        minlength:[3,"Please enter a name atleast 3 characters"], 
        maxlength:[15, "Name can not big than 15 characters"]
    },
    email:{
       type:String,
       required:[true,"Please enter your email"],
       validate: [validator.isEmail,"Please enter a valid email"],
       unique: true,
   },
   password:{
      type:String,
      required:[true,"Please enter your password!"],
      minlength:[8,"Password should be greater than 8 characters"],
      select: false,
   },
   confirmpassword:{
    type:String,
    required:[true,"Please enter your password!"],
    minlength:[8,"Password should be greater than 8 characters"],
    select: false,
   },
   avatar:{
    public_id:{
        type:String,
    },
    url:{ 
        type:String,
    },
   },
   role:{
       type:String,
       default: "user",
   },
   createdAt:{
     type: Date,
     default:Date.now(),
   },
//    resetPasswordToken: String,
//    resetPasswordTime: Date,
});

// Hash the Password
UserSchema.pre('save',async function(){
    if (!this.isModified("password")) {
        next();
      }
    // hash the password with codt 10  
   this.password =await bcrypt.hash(this.password,10)

   //delete the  password
   this.confirmpassword =undefined
})


UserSchema.methods.comparepassword =async function(password){
    return await bcrypt.compare(password,this.password)
}

const User = mongoose.model('User',UserSchema)

module.exports =User
