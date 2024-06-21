import { connectDB } from "@/dbcofig/dbconnect";
import UserModel from "@/models/user.model";
import { errorHandler } from "@/helpers/errorHandler";
import { sendEmail } from "@/helpers/sendEmail";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import randomstring from "randomstring";

connectDB()

export async function POST(req) {
    try {
        const { name, gender, email, password } = await req.json()
        console.log(req.json());
        const user = await UserModel.findOne({ email })
        if (user) return errorHandler("400", "user already exists")
        const hashedPassword = await bcryptjs.hash(password, 10)
        const token = randomstring.generate(15)
        console.log(token);
        const newUser = new UserModel({
            name,
            email,
            gender,
            password: hashedPassword,
            verifyEmailToken: token,
            verifyEmailTokenExpiry: new Date(new Date().getTime() + 60 * 60 * 1000),
        })

        await sendEmail(email, "verify", token)

        await newUser.save()

        return NextResponse.json({
            success: true,
            massage: "User Created Now Verify YouR Email Address"
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            status: error.status || 500,
            message: error.message || "Internal Server Error"
        }, { status: error.status || 500 });
    }
}