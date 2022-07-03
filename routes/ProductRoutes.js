const express = require('express');
const ProductController =require('../controller/ProductController')
const {IsAuthencation,authorizeRoles} =require('../middleware/IsAuthentication.js')
const router = express.Router()



router 
    .route('/products')
    .get(ProductController.getAllProducts)

router
    .route('/product/new')
    .post(IsAuthencation,authorizeRoles('admin'),ProductController.createProduct)


router
    .route('/product/:id')
    .get(ProductController.getSingleProduct)
    .patch(IsAuthencation,authorizeRoles('admin'),ProductController.updateProduct)
    .delete(IsAuthencation,authorizeRoles('admin'),ProductController.deleteProduct)



router
    .route("/product/review")
    .post(IsAuthencation,ProductController.createProductReview);   
    
    


router
    .route("/reviews")
    .get(ProductController.getSingleProductReviews)    



 module.exports =router   
