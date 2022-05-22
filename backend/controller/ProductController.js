const Product =require('../models/Product')
const ErrorHandler =require('../utils/ErrorHandler')
const catchAsyncErrors =require('../middleware/catchAsyncError')

// create  product ========Admin
exports.createProduct =catchAsyncErrors(async(req,res,next)=>{
    Product.create(
        req.body
    ).then((product) => {
         res.status(201).json({
             product
         })
    });
})



//getAllProduct
exports.getAllProducts =async(req,res,next) =>{
    const products =await Product.find()
    res.status(200).json({
        success:true,
        products
    })
 }

// update product ------admin
exports.updateProduct =async(req,res,next) =>{
    const product =await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler('Product is not found with this id',404))
    }
    product =await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useUnified:false
    })
    res.status(200).json({
        success:true,
        product
    })
 }

// delete Product ------------- Amin
exports.deleteProduct =async(req,res,next)=>{
   const product =await Product.findById(req.params.id)
   if(!product){
    return next(new ErrorHandler('Product is not found with this id',404))
  } 
  await product.remove()
  res.status(200).json({
     success:true,
     message:'Product is delete Sucessfully'
  })
}



// single Product 
exports.getSingleProduct =async(req,res,next)=>{
     console.log(req.params.id,"vikas")
     const product =await Product.findOne({_id:req.params.id})
     if(!product){
      return next(new ErrorHandler('Product is not found with this id',404))
    } 
    res.status(200).json({
     success:true,
     product
 })

}
