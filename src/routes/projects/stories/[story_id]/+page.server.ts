import { ProjectService } from '$lib/projectService.js';
import type { Task } from '$lib/tasks.js';




export function load({ params }) {
	let chosenStory: number = Number(params.story_id)
	return {
		chosenStory
	};
}




