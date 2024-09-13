// src/routes/api/auth/google/+server.ts
import { json, type RequestHandler } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import { UserService } from "$lib/server/userService";
import { getAuth } from "firebase-admin/auth";

const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
const JWT_EXPIRES_IN = "8h"; 
const REFRESH_TOKEN_EXPIRES_IN = "7d"; 

const userService = new UserService();

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { token } = await request.json(); // Odbieramy token Google z frontendu

    if (!token) {
      return json({ error: "Token is required" }, { status: 400 });
    }

    // Weryfikacja tokenu w Firebase
    const decodedToken = await getAuth().verifyIdToken(token);
    const { uid, email, name, picture } = decodedToken;

    console.log('====================================');
    console.log(name);
    console.log('====================================');

    const a: string = "a va z"
    const b = a.split("")
    const fullname = name.split(" ")
    const firstName = fullname[0]
    console.log("first name: " + firstName);
    const surename =fullname[1]
    console.log("surename:" + surename);

    // Sprawdzenie, czy użytkownik istnieje w bazie danych
    const user = await userService.getUserByNameAndSurname(firstName, surename);

    if (!user) {
      return json({ error: "User not found" }, { status: 401 });
    }

    // Generowanie tokenu JWT, jeśli użytkownik istnieje
    const jwtToken = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    );

    // Ustawienie ciasteczek z tokenami
    cookies.set("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return json({ token: jwtToken, refreshToken }, { status: 200 });
  } catch (error) {
    console.error(error);
    return json({ error: "Invalid token or internal server error" }, { status: 500 });
  }
};
