const mongoose = require('mongoose');


const productSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter name of product'],
        trim:true,
        maxlength:[30,'product name not be exceed than 30 chracter']
    },
    description:{
        type:String,
        required:[true,'Please enter your description of your product'],
        maxlength:[5000,'product name not be exceed than 5000 chracter']
    },
    color:{
        type:String,
    },
    size:{
        type:String
    },
    ratings:{
          type:Number,
          default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
         type:String,
         required:[true,'please add a category of your product  ']
    },
    Stock:{
        type:Number,
        required:[true,'please add some stoke of your product'],
        maxlength:[3,'stock not be exceed than 3 chracter']
    },
    NumberofReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:'User',
                required:true
            },
            name:{
                type:String,
                 required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String
            },
            time:{
                type:Date,
                default:Date.now()
            }
        }
        
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
})


const Product =mongoose.model('Product',productSchema)

module.exports =Product