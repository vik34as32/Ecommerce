const express = require('express');
const ProductController =require('../controller/ProductController')
const router = express.Router()



router 
    .route('/products')
    .get(ProductController.getAllProducts)

router
    .route('/product/new')
    .post(ProductController.createProduct)


router
    .route('/product/:id')
    .get(ProductController.getSingleProduct)
    .patch(ProductController.updateProduct)
    .delete(ProductController.deleteProduct)




 module.exports =router   
