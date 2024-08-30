//import type { RequestHandler } from '../$types';
import { ProjectService } from "$lib/server/projectService";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) => {
  const projectService = new ProjectService();
  let a = params.post_id;
  
  if (a) {
    const project = await projectService.getProjectById(a);
    if (project) {
      return new Response(JSON.stringify(project), {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response("Project not found", { status: 404 });
    }
  } else {
    return new Response("there was no parameter", { status: 404 });
  }
};


export const PATCH: RequestHandler = async ({ request, params }) => {
    const { name, description } = await request.json();
    const projectService = new ProjectService();
    const updatedProject = await projectService.updateProject(params.post_id as string, name, description);
    if (updatedProject) {
      return new Response(JSON.stringify(updatedProject), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response('Project not found', { status: 404 });
    }
  };

  export const DELETE: RequestHandler = async ({ params }) => {
    const projectService = new ProjectService();
    await projectService.deleteProject(params.post_id as string);
    return new Response(null, { status: 204 });
  }