<script lang="ts">
  import { onMount } from "svelte";
  import { State, Task, Priority } from "$lib/tasks";
  import { Story } from "$lib/story";
  import { goto } from "$app/navigation";

  export let data;
  let tasks: Task[] = data.tasks;
  let chosenStory: Story;
  let name: string;
  let storyId = data.storyId;

  onMount(() => {});
</script>

<div class="mainDiv">
  <p class="mb-4 text-center display-4 font-weight-bold">
    Tasks for your story: {name}
  </p>
  <div class="container">
    <div class="row">
      <!-- Todo Column -->
      <div class="col-md-4 columnPiece">
        <div class="card mb-3 columnPiece">
          <div class="card-header bg-danger text-white columnPiece">
            <h5 class="mb-0">Todo</h5>
          </div>
          <div class="card-body">
            {#each tasks.filter((task) => task.state === State.Todo) as task (task.id)}
              <div class="mb-3 p-3 border rounded shadow-sm cardContent">
                <h6 class="mb-1 cardContent"><strong>{task.name}</strong></h6>
                <p class="cardContent">{task.desc}</p>
                <button
                  class="btn btn-warning ms-2"
                  on:click={() =>
                    goto("/projects/stories/" + storyId + "/" + task.id)}
                >
                  Przenieś mnie do zadań
                </button>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Doing Column -->
      <div class="col-md-4 columnPiece">
        <div class="card mb-3 columnPiece">
          <div class="card-header bg-warning text-dark columnPiece">
            <h5 class="mb-0">Doing</h5>
          </div>
          <div class="card-body">
            {#each tasks.filter((task) => task.state === State.Doing) as task (task.id)}
              <div class="mb-3 p-3 border rounded shadow-sm cardContent">
                <h6 class="mb-1 cardContent"><strong>{task.name}</strong></h6>
                <p class="cardContent">{task.desc}</p>
                <button
                  class="btn btn-warning ms-2"
                  on:click={() =>
                    goto("/projects/stories/" + storyId + "/" + task.id)}
                >
                  Przenieś mnie do zadań
                </button>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Done Column -->  
      <div class="col-md-4 columnPiece">
        <div class="card mb-3 columnPiece">
          <div class="card-header bg-success text-white columnPiece" >
            <h5 class="mb-0">Done</h5>
          </div>
          <div class="card-body ">
            {#each tasks.filter((task) => task.state === State.Done) as task (task.id)}
              <div class="mb-3 p-3 border rounded shadow-sm cardContent">
                <h6 class="mb-1 cardContent "><strong>{task.name}</strong></h6>
                <p class="cardContent">{task.desc}</p>
                <button
                  class="btn btn-warning ms-2 "
                  on:click={() =>
                    goto("/projects/stories/" + storyId + "/" + task.id)}
                >
                  Do szczegółów
                </button>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* DARK MODE */
  :root.dark div.mainDiv,
  :root.dark div {
    background-color: #646464;
    color: #f4f4f4;
  }
  :root.dark div.mainDiv {
    min-height: 80vh;
    width: 100%;
  }
  :root.dark div.container {
    background-color: #646464;
  }

  :root.dark div.currentProjectDiv {
    border-color: yellow;
  }

  :root.dark div.columnPiece{
    border-color: yellow ;

  }

  :root.dark div.card-body{
    background-color: rgb(158, 158, 158);
  }
  :root.dark .cardContent{
    color: #f4f4f4;
    background-color: #646464;
  }
</style>
