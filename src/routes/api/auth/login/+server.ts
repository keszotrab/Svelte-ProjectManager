import { json, type RequestHandler } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import { UserService } from "$lib/server/userService";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = "8h"; 
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
const REFRESH_TOKEN_EXPIRES_IN = "7d"; 

const userService = new UserService();

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { surname, name } = await request.json();
    const user = await userService.getUserByNameAndSurname(name, surname);

    if (!user) {
      return json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" } 
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      JWT_SECRET,
      { expiresIn: "7d" } 
    );

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

    return json({ token, refreshToken }, { status: 200 });
  } catch (error) {
    console.error(error);
    return json({ error: "Internal server error" }, { status: 500 });
  }
};
