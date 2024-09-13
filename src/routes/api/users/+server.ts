
import { UserService } from '$lib/server/userService';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ( params) => {
  const userService = new UserService();
  const users = await userService.getUsers();
  return new Response(JSON.stringify(users), {
    headers: { 'Content-Type': 'application/json' },
  });
};


export const POST: RequestHandler = async ({ request }) => {
    const { name, surname, role } = await request.json();
    const userService = new UserService();
    const newUser = await userService.createUser(name, surname, role);
    return new Response(JSON.stringify(newUser), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
};
  

