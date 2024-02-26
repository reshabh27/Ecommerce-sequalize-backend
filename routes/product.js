
const express = require('express');
const { handleAddProduct, handleGetAllProducts, handleProductUpdate, handleProductDelete, handleGetProductById } = require('../controllers/product');
const auth = require('../middlewares/auth');

const router = new express.Router();

router.get('/getproduct', handleGetAllProducts)

router.post('/add', auth, handleAddProduct);

router.get('/getproduct/:id', handleGetProductById);

router.patch('/getproduct/:id', auth, handleProductUpdate)
router.delete('/getproduct/:id', auth, handleProductDelete)


module.exports = router;