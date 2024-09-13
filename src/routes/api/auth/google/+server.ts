// src/routes/api/auth/google/+server.ts
import { json, type RequestHandler } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import { UserService } from "$lib/server/userService";
import { getAuth } from "firebase-admin/auth";
import { db } from '$lib/server/firebaseAdmin';

const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
const JWT_EXPIRES_IN = "8h";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

const userService = new UserService();

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { idToken } = await request.json(); // Receive the ID token from frontend
    const a = db
    if (!idToken) {
      return json({ error: "ID token is required" }, { status: 400 });
    }

    console.log('========Before decoded=============');
    const decodedToken = await getAuth().verifyIdToken(idToken);
    console.log('========After decoded=============');

    if (!decodedToken) {
      return json({ error: "Invalid Google token" }, { status: 401 });
    }

    // Extract the user's email from the decoded token
    const email = decodedToken.email;
    if (!email) {
      return json({ error: "No email decoded" }, { status: 401 });
    }
    console.log('========before getUserByEmail=============');
    //console.log(email);

    let user = await userService.getUserByEmail(email); // Query Firestore by email
    if (!user) {
      return json({ error: "No user found" }, { status: 401 });
    }
    console.log('========after getUserByEmail=============');

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const refreshToken = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });
    console.log('========before tokens================');
    cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, //process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    console.log('============POST END============');
    return json({ token, refreshToken }, { status: 200 });
  } catch (error) {
    console.error(error);
    return json({ error: "Invalid token or internal server error" }, { status: 500 });
  }
};
