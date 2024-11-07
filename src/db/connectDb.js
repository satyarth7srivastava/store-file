import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connect(){
    try {
        const res = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB..." + res.connection.host);
    } catch (error) {
        console.log(error);
    }
}