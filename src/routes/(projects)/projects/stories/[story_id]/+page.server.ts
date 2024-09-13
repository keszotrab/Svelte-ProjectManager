//import { ProjectService } from '$lib/projectService.js';
//import { ProjectService } from '$lib/server/projectService.js';
import { ProjectService } from '$lib/server/projectService';
import type { Task } from '$lib/tasks.js';
//: PageServerLoad // Event

export const load = async ({  params, parent }) => {
	await parent();
	let layoutData = await parent();
	let currentProject = layoutData.props.currentProject;


	let storyId = params.story_id;
	const projectService = new ProjectService();
	
	let taskInstances = (await projectService.getTasks(currentProject.id, storyId)) as Task[];


	const tasks = taskInstances.map((task) => ({
		id: task.id,
		name: task.name,
		desc: task.desc,
		priority: task.priority,
		storyId: task.storyId,
		aproxTime: task.aproxTime,
		state: task.state,
		createDate: task.createDate,
		startDate: task.startDate ? task.startDate : undefined,
		completeDate: task.completeDate ? task.completeDate : undefined,
		owner: task.owner ? {
		  id: task.owner.id,
		  name: task.owner.name,
		  surname: task.owner.surname,
		  role: task.owner.role,
		} : undefined
	  }));
	


	return {
		storyId,
		tasks
	};
}




