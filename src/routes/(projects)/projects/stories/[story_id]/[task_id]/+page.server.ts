import { ProjectService } from '$lib/server/projectService';
import type { Task } from '$lib/tasks.js';

export const load = async ({ params, parent }) => {

	await parent();
	let layoutData = await parent();
	let currentProject = layoutData.props.currentProject;
	let storyId = params.story_id;
	let taskId = params.task_id;

	const projectService = new ProjectService();
	let taskInstance = await projectService.getTask(currentProject.id, storyId, taskId);

	let task = {
		id: taskInstance.id,
		name: taskInstance.name,
		desc: taskInstance.desc,
		priority: taskInstance.priority,
		storyId: taskInstance.storyId,
		aproxTime: taskInstance.aproxTime, 
		state: taskInstance.state,
		createDate: taskInstance.createDate, 
		startDate: taskInstance.startDate ? taskInstance.startDate : undefined, 
		completeDate: taskInstance.completeDate ? taskInstance.completeDate : undefined, 
		owner: taskInstance.owner ? {
			id: taskInstance.owner.id,
			name: taskInstance.owner.name,
			surname: taskInstance.owner.surname,
			role: taskInstance.owner.role,
		} : undefined
	};

	return {
		storyId,
		taskId,
		task
	};
};
