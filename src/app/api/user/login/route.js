import { createUser, getUserByEmail } from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        // Parse incoming request body
        const reqBody = await request.json();
        const {email, password} =  reqBody;
        const user = await getUserByEmail(email);

        if (!user || user.length === 0) {
            return NextResponse.json({error: "User does not Exists , Please check your credentionals"}, {status: 400});
        }

        const validPassword =  await bcrypt.compare(password, user[0].password);

        if (!validPassword) {
            return NextResponse.json({error: "Password is not incorrect , Please check your credentionals"}, {status: 400});
        }

        // Create a token data.
        const tokenData = {
            id: user[0].id,
            email: user[0].email,
            username: user[0].username
        }

        // Create a JWT token
        const token = jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET, {expiresIn: "1h"});
        
        // Return success response
        const response =  NextResponse.json({
            message: "Logged In Successfully",
            success: true,
        });

        response.headers.set('Set-Cookie', `token=${token}; Path=/;`);
        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
