import type { RequestHandler } from '@sveltejs/kit';
import { ProjectService } from '$lib/server/projectService';
import { Priority, State } from '$lib/story';

const projectService = new ProjectService();

export const GET: RequestHandler = async ({ params }) => {
  try {
    const story = await projectService.getStory(params.post_id as string, params.story_id as string);
    return new Response(JSON.stringify(story), { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    const err = error as Error;
    return new Response(err.message, { status: 404 });
  }
};

export const PATCH: RequestHandler = async ({ request, params }) => {
  try {
    const { name, desc, priority, state, owner, date } = await request.json();
    const updatedStory = await projectService.updateStory(
      params.post_id as string,
      params.storyId as string,
      name,
      desc,
      priority as Priority,
      state as State,
      owner,
      date
    );
    return new Response(JSON.stringify(updatedStory), { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    const err = error as Error;
    return new Response(err.message, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ params }) => {
  try {
    await projectService.deleteStory(params.post_id as string, params.storyId as string);
    return new Response(null, { status: 204 });
  } catch (error) {
    const err = error as Error;
    return new Response(err.message, { status: 500 });
  }
};
