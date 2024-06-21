import nodemailer from "nodemailer"
import { errorHandler } from "./errorHandler";

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.ETHEREAL_USER,
        pass: process.env.ETHEREAL_PASS
    }
});

const getVerifyEmailHTML = (token) => `
    <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Verify Your Email</h2>
        <p>Thank you for registering with Green Valley Hospital.</p>
        <p>Please click the link below to verify your email address:</p>
        <a href="http://localhost:3000/verifyEmail/${token}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none;">http://localhost:3000/verifyEmail/${token}</a>
        <p>If you did not request this, please ignore this email.</p>
        <p>Best regards,<br>Green Valley Hospital</p>
    </div>
`;

const getForgotPasswordHTML = (token) => `
    <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Reset Your Password</h2>
        <p>We received a request to reset your password.</p>
        <p>Please use the OTP below to reset your password:</p>
        <h3 style="font-size: 24px; color: #4CAF50;">${token}</h3>
        <p>If you did not request this, please ignore this email.</p>
        <p>Best regards,<br>Green Valley Hospital</p>
    </div>
`;

export const sendEmail = async (email, emailType, token) => {
    try {
        const htmlContent = emailType === "verify" ? getVerifyEmailHTML(token) : getForgotPasswordHTML(token);

        const info = await transporter.sendMail({
            from: '"Green Valley Hospital" <arjunnagar801098@gmail.com>',
            to: email,
            subject: emailType === "verify" ? "Verify Your Email GVH 🏥" : "Get OTP to Create New Password GVH 🏥",
            text: emailType === "verify" ? `Please verify your email using the following link: http://localhost:3000/verifyEmail/${token}}` : `Your OTP for password reset is: ${token}`,
            html: htmlContent,
        });

        console.log("Email sent: %s", info.messageId);
    } catch (error) {
        console.log(error);
        return errorHandler(error.status, error.message)
    }
}