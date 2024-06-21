import { errorHandler } from "@/helpers/errorHandler";
import UserModel from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { token } = await req.json()
        console.log(token);
        const user = await UserModel.findOne({ verifyEmailToken: token })
        if (!user) return errorHandler(404, "Invalid Token, Authentication Failed")
        if (user.verifyEmailToken !== token) {
            return errorHandler(400, "Invalid Token")
        }
        const updatedUser = await UserModel.findOneAndUpdate({ verifyEmailToken: token },
            {
                $set: { isVerified: true },
                $unset: { verifyEmailToken: "", verifyEmailTokenExpiry: "" }
            },
            { new: true }
        )
        return NextResponse.json({
            message: "email verified",
            status: 200,
            user: updatedUser
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            success: false,
            status: error.status || 500,
            message: error.message || "Internal Server Error"
        }, { status: error.status || 500 });
    }
}