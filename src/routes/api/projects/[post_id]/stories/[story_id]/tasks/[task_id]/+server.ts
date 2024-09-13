import type { RequestHandler } from '@sveltejs/kit';
import { ProjectService } from '$lib/server/projectService';
//import { Priority, State } from '$lib/task';
import type { User } from '$lib/user';
import type { Priority, State } from '$lib/tasks';

const projectService = new ProjectService();

export const GET: RequestHandler = async ({ params }) => {
  try {
    const task = await projectService.getTask(params.post_id as string, params.story_id as string, params.task_id as string);
    return new Response(JSON.stringify(task), { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    const err = error as Error;
    return new Response(err.message, { status: 404 });
  }
};

export const PATCH: RequestHandler = async ({ request, params }) => {
  try {
    const updates: Partial<{
      name: string,
      desc: string,
      priority: Priority,
      state: State,
      aproxTime: string,
      startDate?: string,
      completeDate?: string,
      owner?: User
    }> = await request.json();

    const updatedTask = await projectService.updateTask(
      params.post_id as string,
      params.story_id as string,
      params.task_id as string,
      updates
    );

    return new Response(JSON.stringify(updatedTask), { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    const err = error as Error;
    return new Response(err.message, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ params }) => {
  try {
    await projectService.deleteTask(params.post_id as string, params.story_id as string, params.task_id as string);
    return new Response(null, { status: 204 });
  } catch (error) {
    const err = error as Error;
    return new Response(err.message, { status: 500 });
  }
};
