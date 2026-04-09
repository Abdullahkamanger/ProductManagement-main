import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ProductRoutes from './src/Routes/ProductRoutes.js';
import ConnectDB from './src/Config/db.js';

dotenv.config();

const app = express();
const PORT = 3000;

ConnectDB();

app.use(express.json());
app.use(cors());
app.use('/products', ProductRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});