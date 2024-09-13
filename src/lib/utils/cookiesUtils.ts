import type { Project } from "$lib/project";

export function getObjectFromCookie(name: string): Project | null {
    const value = `; ${document.cookie}`;
    //const value = cookies.get('currentProject')
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(";").shift();

      if (cookieValue) {
        try {
          return JSON.parse(decodeURIComponent(cookieValue)) as Project;
        } catch (e) {
          console.error("Failed to parse cookie JSON", e);
        }
      }
    }

    return null;
}

export function deleteCookie(name: string) {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }



export function setCookie(name: string, value: Project, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();

    const jsonString = JSON.stringify(value);

    document.cookie =
      name + "=" + encodeURIComponent(jsonString) + ";" + expires + ";path=/";
  }