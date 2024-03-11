import { createUser, getUserByEmail } from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        // Parse incoming request body
        const body = await request.json();
  
        // Check if the user already exists
        const existingUser = await getUserByEmail(body.email);

        if (existingUser.length > 0) {
            return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
        }

        // Hash the password before storing in the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);

        // Create a user object
        const userData = {
            username: body.username, // Corrected typo in body.username
            email: body.email,
            password: hashedPassword
        };

        // Create user in the database
        const result = await createUser(userData);

        if (result.error) {
            return NextResponse.json({ error: result.error.sqlMessage }, { status: 500 });
        }

        // Return success response
        return NextResponse.json({
            message: "User created successfully",
            success: true,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
