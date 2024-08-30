//import { ProjectService } from '$lib/projectService.ts';
import type { Task } from '$lib/tasks.ts';




export function load({ params }) {
	let chosenTask: number = Number(params.task_id)
	return {
		chosenTask
	};
}






/*

NIE MOGE TEGO TAK ZROBIC BO MAM DANE W LOCALSTORAGE WRRRR D:

const projectService = new ProjectService();
let chosenTask : Task;


export function load({ params }) {
	chosenTask = projectService.getTask(Number(params.task_id)) as Task;
	//const post = posts.find((post) => post.slug === params.slug);

	return {
		chosenTask
	};
}




*/
