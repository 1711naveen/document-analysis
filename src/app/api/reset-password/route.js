// import crypto from "crypto";
// import bcrypt from "bcrypt";
import md5 from 'md5';
import db from '../../../../lib/db';
import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return new Response(JSON.stringify({ error: "Email is required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // 1. Generate a random password
        // const randomPassword = crypto.randomBytes(8).toString("hex");
        const randomPassword = '12345';
        // 2. Hash the random password
        // const hashedPassword = await bcrypt.hash(randomPassword, 10);
        const hashedPassword = md5(randomPassword);

        const [rowsAffected] = await db.execute(
            `UPDATE admins SET admin_password = ? WHERE admin_email = ?`,
            [hashedPassword, email]
        );

        if (rowsAffected === 0) {
            return new Response(
                JSON.stringify({ error: "User not found." }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        // const transporter = nodemailer.createTransport({
        //     host: "smtp.ethereal.email",
        //     port: 587,
        //     secure: false, // true for port 465, false for other ports
        //     auth: {
        //         user: 'naveen.y@neuralinfo.org',
        //         pass: 'Neural@1234',
        //     },
        // });

        // const mailOptions = {
        //     from: 'yn.naveen00@gmail.com',
        //     to: email,
        //     subject: "Password Reset",
        //     text: `Your new password is: ${randomPassword}`,
        //     html: "<b>Hello world?</b>", // html body
        // };

        // const info = await transporter.sendMail(mailOptions);
        // console.log("Message sent: %s", info.messageId);

        return new Response(
            JSON.stringify({ message: "Password reset successful. Check your email for the new password." }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: "Internal server error." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
