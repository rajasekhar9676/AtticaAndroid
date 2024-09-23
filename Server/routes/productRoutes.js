



// const express=require('express')
// const productController=require('../controllers/productController')

// const router=express.Router()

// // router.post('/uploadProducts',productController.createProduct)
// router.post('/uploadProducts', productController.upload.single('image'));
// router.get('/getproducts',productController.getAllProducts)
// router.get('/getOneproducts/:id',productController.getProductById)
// router.put('/updateProducts/:id',productController.updateProductById) 
// router.delete('/deleteproducts/:id',productController.deleteProductById)

// module.exports=router 


const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// Corrected POST route with image upload
router.post('/uploadProducts', productController.upload.single('image'), productController.createProduct);

router.get('/getproducts', productController.getAllProducts);
router.get('/getOneproducts/:id', productController.getProductById);
router.put('/updateProducts/:id', productController.updateProductById);
router.delete('/deleteproducts/:id', productController.deleteProductById);

module.exports = router;
