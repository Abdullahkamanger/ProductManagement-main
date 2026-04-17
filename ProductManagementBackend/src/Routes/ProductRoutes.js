import express from 'express';
import { getProducts ,getProductById, updateProductById, deleteProductById, createProduct } from '../Controllers/ProductController.js';
import { isAuthenticated } from '../middlewares/isUserAuthenticated.js';

const Router = express.Router();


Router.get('/',getProducts);
Router.post('/',createProduct);
Router.get('/:id',getProductById);
Router.put('/:id',updateProductById);
Router.delete('/:id',deleteProductById);





export default Router