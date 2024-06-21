import { Schema, model, models } from "mongoose";

const userSchema = Schema({
    name: {
        type: String,
        required: [true, "Please Provide Name"],
        trim: true
    },
    gender: {
        type: String,
        required: [true, "Please Provide Gender"],
        enum: ["male", "female"]
    },
    email: {
        type: String,
        required: [true, "Please Provide Email Address"],
        unique: true    
    },
    password: {
        type: String,
        required: [true, "Please Provide Password"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyEmailToken: String,
    verifyEmailTokenExpiry: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,

}, {timestamp: true})

const UserModel = models.users || model("users", userSchema)

export default UserModel