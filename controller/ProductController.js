const Product =require('../models/Product')
const ErrorHandler =require('../utils/ErrorHandler')
const APIfeature =require('../utils/APIfeature')
const catchAsyncErrors =require('../middleware/catchAsyncError')
const User = require('../models/UserModel')

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
    const feature = new APIfeature(Product.find(),req.query).search().filter().Pagination()
    const products =await feature.query
    res.status(200).json({
        success:true,
        products
    })
 }

// update product ------admin
exports.updateProduct =async(req,res,next) =>{
    let product =await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler('Product is not found with this id',404))
    }
    const newproduct =await Product.findOneAndUpdate({_id:req.params.id},req.body,{
        new:true,
        runValidators:true,
        useUnified:false
    })
    res.status(200).json({
        success:true,
        newproduct
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



//Create A review and update review

exports.createProductReview =catchAsyncErrors(async(req,res,next)=>{
   
    const {rating, comment, productId} =req.body;
   

     const reviews ={
         user:req.user._id,
         username:req.user.name,
         rating:Number(rating),
         comment:comment
     }


    const product = await Product.findOne({_id:productId});


    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
      );

     
    if(isReviewed){
         product.reviews.forEach((res)=>{
            if (rev.user.toString() === req.user._id.toString())
             (rev.rating = rating), (rev.comment = comment);
         })
    }else{
        console.log(product.reviews,"vikas")
         product.reviews.push(reviews)
         product.numOfReviews== product.reviews.length
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating; 
      console.log(avg,"akkkkkaaakkssshh")
  
    });
    console.log(avg,"vikkkkaasaasss")
  
    product.ratings = avg / product.reviews.length;
    console.log(product.ratings,"your arebsex") 
  


    await product.save({ validateBeforeSave: false });
    
})



// Get All reviews of a single product
exports.getSingleProductReviews = catchAsyncErrors(async(req,res,next) =>{
    const product = await Product.findById(req.query.id);
  
    if(!product){
      return next(new ErrorHandler("Product is not found with this id",404));
    }
    
    res.status(200).json({
      success: true,
      reviews: product.reviews
    });
  });



// Delete Review --Admin

exports.deleteReview =catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);
  
    if(!product){
      return next(new ErrorHandler("Product is not found with this id",404));
    }

    const reviews =product.reviews.filter((rev)=>{
        rev._id.toString()!=req.query.id
    })

    let avg =0

    reviews.forEach((rev) => {
        avg += rev.rating;
      })

   let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
          reviews,
          ratings,
          numOfReviews,
        },
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      )
   res.status(200).json({
        success: true,
      });
})
