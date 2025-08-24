import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const mongo_uri = process.env.MONGODB_URI ;

const connectToDatabase  = async () => {
    try {
        console.log(`Connecting to Database...`)
        console.log("MONGO_URI =>", process.env.MONGODB_URI);
        const dbConnection = await mongoose.connect(mongo_uri as string);
        console.log(`Database connection successful 🎉 at ${dbConnection.connection.host}`);
    } catch (error) {
        console.log(`Database connection error : ${error}`);
        process.exit(0);
    }
};

export { connectToDatabase };