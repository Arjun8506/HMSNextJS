import { errorHandler } from "@/helpers/errorHandler";
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`mongodb Connected ${res}`);
    } catch (error) {
        console.log(error);
        return errorHandler(error.status, error.message)
    }
}