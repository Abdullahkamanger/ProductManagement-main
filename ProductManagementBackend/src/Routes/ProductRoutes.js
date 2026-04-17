import express from 'express';
<<<<<<< HEAD
import { getProducts ,getProductById, updateProductById, deleteProductById } from '../Controllers/ProductController.js';
=======
import { getProducts ,getProductById, updateProductById, deleteProductById, createProduct } from '../Controllers/ProductController.js';
import { isAuthenticated } from '../middlewares/isUserAuthenticated.js';
>>>>>>> 0cefe6e11cc23c0610c8fba46c199b39aa7cc214

const Router = express.Router();


Router.get('/',getProducts);
Router.post('/',isAuthenticated,createProduct);
Router.get('/:id',getProductById);
<<<<<<< HEAD
Router.put('/:id',updateProductById);
Router.delete('/:id',deleteProductById);
=======
Router.put('/:id',isAuthenticated,updateProductById);
Router.delete('/:id',isAuthenticated,deleteProductById);

>>>>>>> 0cefe6e11cc23c0610c8fba46c199b39aa7cc214




export default Router