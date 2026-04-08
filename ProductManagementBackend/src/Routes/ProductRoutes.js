import express from 'express';
import { getProducts ,getProductById, updateProductById } from '../Controllers/ProductController.js';

const Router = express.Router();


Router.get('/',getProducts);
Router.get('/:id',getProductById);
Router.put('/:id',updateProductById);





export default Router