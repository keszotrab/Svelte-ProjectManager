<script lang="ts">
  import { Project } from "$lib/project.js";
  import { ProjectService } from "$lib/server/projectServiceOld.js";
  import { State } from "$lib/story.js";
  import type { Task } from "$lib/tasks.js";
  import type { User } from "$lib/user";

  export let data;
  const projectService = new ProjectService();
  let thisTask: Task = projectService.getTask(data.chosenTask) as Task;
  let ownerId: number;

  function setTaskAsDone() {
    if (thisTask.state == State.Doing) {
      projectService.updateTask(
        data.chosenTask,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        State.Done,
        undefined,
        new Date(),
        undefined
      );
      thisTask = thisTask;
    }

    
  }


  function setUserAsOnwer() {
      if (thisTask.state == State.Todo || thisTask.state == State.Doing) {
        //let user: User = projectService.userService.users.find(user => user.id === ownerId) as User;

        projectService.updateTask(
        data.chosenTask,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        State.Doing,
        undefined,
        undefined,
        ownerId
      );
      thisTask = thisTask;
      }
    }
</script>

<p>Task's id: {thisTask.id}</p>
<p>Task's name: {thisTask.name}</p>
<p>Task's description: {thisTask.desc}</p>
<p>Task's priority: {thisTask.priority}</p>
<p>Task's story name: {thisTask.story.name}</p>
<p>Task's approximante completion date: {thisTask.aproxTime}</p>
<p>Task's state: {thisTask.state}</p>
<p>Task's creation date: {thisTask.createDate}</p>
<p>Task's start date: {thisTask.startDate}</p>
<p>Task's complete date: {thisTask.completeDate}</p>
<p>
  Task's owner: {thisTask.owner?.imie ? thisTask.owner?.imie : "Nie ma ownera"}
  {thisTask.owner?.nazwisko}
  {thisTask.owner?.role}
</p>

<!-- TODO: MODIFY THE STUFF-->
<!-- możliwość przypisania osoby do zadania (devops lub developer). 
  Przypisanie osoby automatycznie zmienia stan zadania z "todo" na "doing" oraz uzupełnia datę startu zadania.-->
<!-- możliwość zmiany stanu zadania na "done". Zmiana stanu automatycznie uzupełnia datę zakończenia zadania.-->
<p>
  <button on:click={setTaskAsDone}> Set this to DONE</button>
</p>
<p>
  <button on:click={setUserAsOnwer}> Set owner of this task</button>
  <input type="number" bind:value={ownerId} placeholder="Id here" />
</p>
