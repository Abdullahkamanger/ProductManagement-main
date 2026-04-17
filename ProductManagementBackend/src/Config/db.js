import mongoose from 'mongoose';

let isConnected = false;

const ConnectDB = async () => {
    if (isConnected) {
        console.log('Using existing MongoDB connection');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        isConnected = db.connections[0].readyState;
        console.log(`Connected to MongoDB Atlas`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        // In serverless, we might not want to exit the process, 
        // but since this is a fatal connection error, we'll keep the log.
    }
};

export default  ConnectDB;