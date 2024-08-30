import type { RequestHandler } from './$types';
import { ProjectService } from '$lib/server/projectService';

export const GET: RequestHandler = async ( params) => {
  const projectService = new ProjectService();
  const projects = await projectService.getProjects();
  return new Response(JSON.stringify(projects), {
    headers: { 'Content-Type': 'application/json' },
  });
};


export const POST: RequestHandler = async ({ request }) => {
    const { name, description } = await request.json();
    const projectService = new ProjectService();
    const newProject = await projectService.createProject(name, description);
    return new Response(JSON.stringify(newProject), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
};
  

