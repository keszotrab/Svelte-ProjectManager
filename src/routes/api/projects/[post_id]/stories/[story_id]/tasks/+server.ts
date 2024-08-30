import { ProjectService } from "$lib/server/projectService";
import type { Priority } from "$lib/story";
import type { User } from "$lib/user";
import type { RequestHandler } from "@sveltejs/kit";

const projectService = new ProjectService();

export const GET: RequestHandler = async ({ params }) => {
  try {
    const tasks = await projectService.getTasks(params.post_id as string, params.story_id as string);
    return new Response(JSON.stringify(tasks), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const err = error as Error;
    return new Response(err.message, { status: 500 });
  }
};

/*

export const POST: RequestHandler = async ({ request, params }) => {
  try {
    const { name, desc, priority, owner } = await request.json();
    const newStory = await projectService.createStory(
      params.projectId as string,
      name,
      desc,
      priority as Priority,
      owner as User
    );
    return new Response(JSON.stringify(newStory), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const err = error as Error;
    return new Response(err.message, { status: 500 });
  }
};
*/