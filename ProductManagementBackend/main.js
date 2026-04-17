import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ProductRoutes from './src/Routes/ProductRoutes.js';
import ConnectDB from './src/Config/db.js';
import UserRoutes from './src/Routes/UserRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const PORT = 3000;
ConnectDB();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/products', ProductRoutes);
app.use('/users', UserRoutes);

export default app;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}