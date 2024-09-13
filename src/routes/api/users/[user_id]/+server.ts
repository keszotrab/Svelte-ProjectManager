import { UserService } from '$lib/server/userService';
import type { RequestHandler } from '@sveltejs/kit';


export const GET: RequestHandler = async ({ params }) => {
  try {
    const userId = params.user_id as string; 
    const userService = new UserService();
    const user = await userService.getUserById(userId);

    if (user) {
      return new Response(JSON.stringify(user), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response('User not found', { status: 404 });
    }
  } catch (error) {
    const err = error as Error;
    return new Response(err.message, { status: 500 });
  }
};

export const PATCH: RequestHandler = async ({ request, params }) => {
  try {
    const userId = params.user_id as string;
    const updates = await request.json();
    const userService = new UserService();
    const updatedUser = await userService.updateUser(userId, updates);
    return new Response(JSON.stringify(updatedUser), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const err = error as Error;
    return new Response(err.message, { status: 500 });
  }
};


export const DELETE: RequestHandler = async ({ params }) => {
  try {
    const userId = params.user_id as string;
    const userService = new UserService();
    await userService.deleteUser(userId);
    return new Response(null, { status: 204 });
  } catch (error) {
    const err = error as Error;
    return new Response(err.message, { status: 500 });
  }
};










