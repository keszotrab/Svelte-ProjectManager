import { redirect } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import type { LayoutServerLoad } from "./$types";

const JWT_SECRET = process.env.JWT_SECRET as string;
// Funkcja do weryfikacji tokenu
function verifyToken(token: string | undefined) {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as { id: string; role: string };
  } catch (error) {
    return null;
  }
}

export const load: LayoutServerLoad = async ({ cookies }) => {
  const currentProjectCookie = cookies.get("currentProject");
  let currentProject;

  if (currentProjectCookie) {
    try {
      currentProject = JSON.parse(currentProjectCookie);
    } catch (e) {
      console.error("Błąd podczas parsowania ciasteczka:", e);
    }
  }

  const token = cookies.get("token");

  const user = verifyToken(token);

  // Jeśli brak tokenu lub token nieważny, przekieruj do logowania
  if (!user) {
    throw redirect(302, "/login");
  }
  if (currentProject)
  {
    return {
      props: {
        user,
        currentProject,
      },
    };

  }
    return {
      props: {
        user,
        currentProject: null
      },
    };
};
