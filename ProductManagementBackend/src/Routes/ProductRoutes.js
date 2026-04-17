import express from 'express';
import { getProducts ,getProductById, updateProductById, deleteProductById, createProduct } from '../Controllers/ProductController.js';
import { isAuthenticated } from '../middlewares/isUserAuthenticated.js';

const Router = express.Router();


Router.get('/',getProducts);
Router.post('/',isAuthenticated,createProduct);
Router.get('/:id',getProductById);
Router.put('/:id',isAuthenticated,updateProductById);
Router.delete('/:id',isAuthenticated,deleteProductById);





export default Router