const express =require('express');
const OrderController =require('../controller/OderController')
const {IsAuthencation,authorizeRoles} =require('../middleware/IsAuthentication.js')
const router = express.Router()


router
    .route('/order/new')
    .post(IsAuthencation,OrderController.createOrder)



router
    .route('/order/:id')   
    .get(IsAuthencation,OrderController.getSingleOrder) 



router
     .route('/order/me')    
     .get(IsAuthencation,OrderController.getAllOrders)




router
     .route("/admin/orders")
     .get(IsAuthencation,OrderController.getAdminAllOrders);
   
router
     .route("/admin/order/:id")
     .put(IsAuthencation,OrderController.updateAdminOders)
     .delete(IsAuthencation,OrderController.deleteOrder);     





module.exports =router