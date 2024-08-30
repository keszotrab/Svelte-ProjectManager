<script lang="ts">
  import { onMount } from "svelte";
  import { State, Task } from "$lib/tasks";
  import { ProjectService } from "$lib/server/projectServiceOld.js";
  import { Story } from "$lib/story";

  export let data;
  let tasks: Task[] = [];
  let projectService: ProjectService;
  let chosenStory: Story;
  let name: string;

  onMount(() => {
    projectService = new ProjectService();
    chosenStory = projectService.getStory(data.chosenStory) as Story;
    let allTasks = projectService.getTask() as Task[];
    tasks = allTasks.filter((task) => task.story.id === chosenStory.id);
    name = chosenStory.name;
  });
</script>

<p>Tasks for story: {name}</p>

<!---->
<div class="kanban-board">
  <!-- Todo Column -->
  <div class="kanban-column todo">
    <p class="title">Todo</p>
    {#each tasks.filter((task) => task.state === State.Todo) as task (task.id)}
      <div class="kanban-item">
        <p><strong>{task.name}</strong></p>
        <p>{task.desc}</p>
      </div>
    {/each}
  </div>

  <!-- Doing Column -->
  <div class="kanban-column doing">
    <p class="title">Doing</p>
    {#each tasks.filter((task) => task.state === State.Doing) as task (task.id)}
      <div class="kanban-item">
        <p><strong>{task.name}</strong></p>
        <p>{task.desc}</p>
      </div>
    {/each}
  </div>

  <!-- Done Column -->
  <div class="kanban-column done">
    <p class="title">Done</p>
    {#each tasks.filter((task) => task.state === State.Done) as task (task.id)}
      <div class="kanban-item">
        <p><strong>{task.name}</strong></p>
        <p>{task.desc}</p>
      </div>
    {/each}
  </div>
</div>

<style>
  .kanban-board {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }

  .kanban-column {
    width: 30%;
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .kanban-column p.title {
    text-align: center;
    margin-bottom: 10px;
  }

  .kanban-item {
    background-color: white;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .kanban-column.done {
    background-color: #d4edda;
  }

  .kanban-column.doing {
    background-color: #fff3cd;
  }

  .kanban-column.todo {
    background-color: #f8d7da;
  }
</style>
