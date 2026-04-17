import express from 'express';
import { getProducts ,getProductById, updateProductById, deleteProductById } from '../Controllers/ProductController.js';

const Router = express.Router();


Router.get('/',getProducts);
Router.get('/:id',getProductById);
Router.put('/:id',updateProductById);
Router.delete('/:id',deleteProductById);




export default Router