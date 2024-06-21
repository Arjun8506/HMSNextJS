import { NextResponse } from "next/server";

export const errorHandler = (statuscode, message) => {
    return NextResponse.json({
        success: false,
        status: statuscode,
        message
    }, { status: statuscode });
}