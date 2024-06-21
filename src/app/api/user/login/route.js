import { connectDB } from "@/dbcofig/dbconnect";
import UserModel from "@/models/user.model";
import { errorHandler } from "@/helpers/errorHandler";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connectDB()

export async function POST(req) {
    try {
        const { email, password } = await req.json()
        const validUser = await UserModel.findOne({ email })


        if (!validUser) return errorHandler("400", "user doesn't exists")
            
            if (validUser.isVerified === false) {
                return NextResponse.json({
                message: "first verify your email",
                success: false,
                status: 404
            })
        }
        const validPassword = await bcryptjs.compare(password, validUser.password)
    if (!validPassword) return errorHandler("401", "Invalid Credentials")
        const token = jwt.sign({
            id: validUser._id,
            username: validUser.name
        }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

        const userWithoutPassword = validUser._doc;
        delete userWithoutPassword.password;

        const response = NextResponse.json({
            success: true,
            statusCode: 200,
            user: userWithoutPassword
        });

        response.cookies.set("-gvh", token, {
            maxAge: 1 * 24 * 60 * 60, // In seconds for 1 day
            httpOnly: true
        });
        return response
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            status: error.status || 500,
            message: error.message || "Internal Server Error"
        }, { status: error.status || 500 });
    }
}