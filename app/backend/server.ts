// server.ts
import express, { Application } from 'express';
import dotenv from "dotenv";
// import { connectToDatabase } from './src/db/db.ts';

dotenv.config();

const app: Application = express();
const port: number = Number(process.env.PORT) || 4000;
console.log(`env : - ${process.env.MONGODB_URI}`)

app.listen(port, () => {
        console.log(`🚀 Server is running on port : ${port}`);
    });

// connectToDatabase().then(() => {
//     app.listen(port, () => {
//         console.log(`🚀 Server is running on port : ${port}`);
//     });
// }).catch((error) => {
//     console.log("❌ DB Connection failed:", error);
// });
