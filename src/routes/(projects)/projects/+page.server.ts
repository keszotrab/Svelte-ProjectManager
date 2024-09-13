import { ProjectService } from '$lib/server/projectService';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({  parent }) => {
    await parent();
    const projectService = new ProjectService();
    const projects = await projectService.getProjects();

	return {
		projects: projects
	};
};