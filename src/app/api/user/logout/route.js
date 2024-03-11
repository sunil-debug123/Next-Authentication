import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        // Creating a JSON response with a success message
        const response = NextResponse.json({
            message: "Logout Successful",
            success: true,
        });

        // Setting the cookie to expire to delete the token
        response.headers.set('Set-Cookie', 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;');

        // Returning the response
        return response;
    } catch (error) {
        // Handling errors and returning an error response
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
