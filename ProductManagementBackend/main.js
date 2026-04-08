import express from 'express';
import cors from 'cors';
import ProductRoutes from './src/Routes/ProductRoutes.js';

const app = express();
const PORT = 3000;
 
app.use('/products', ProductRoutes);


app.use(express.json());
app.use(cors);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})