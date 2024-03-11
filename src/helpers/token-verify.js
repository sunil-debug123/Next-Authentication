import jwt from 'jsonwebtoken';
import React from 'react'

export const getUserToken = (req) => {
    try {
      const token = req.cookies.get("token")?.value || '';
      const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
      return decodedToken;
    } catch(error)  {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}