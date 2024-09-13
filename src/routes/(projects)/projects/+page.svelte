<script lang="ts">
  import type { Project } from "$lib/project";
  import { Priority, State, Story } from "$lib/story";
  import { User, Role } from "$lib/user";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import {
    getObjectFromCookie,
    setCookie,
    deleteCookie,
  } from "$lib/utils/cookiesUtils";
  import { goto } from "$app/navigation";
  export let data: PageData;

  let projects = data.projects;
  let currentProject: Project | null | undefined;

  onMount(() => {
    currentProject = getObjectFromCookie("currentProject");
  });

  function chooseCurrentProjectHandler(project: Project) {
    setCookie("currentProject", project, 5);
    currentProject = getObjectFromCookie("currentProject");
  }

  function ResetCurrentProjectHandler() {
    deleteCookie("currentProject");
    currentProject = getObjectFromCookie("currentProject");
  }
</script>

<div class="mainDiv">
  <div class="container mt-4">
    {#if currentProject}
      <div class="alert alert-success currentProjectDiv" role="alert">
        Your current project is <strong>{currentProject.name}</strong>
      </div>
      <div class="mt-3 mainButtonsDiv">
        <button
          class="btn btn-warning ms-2"
          on:click={() => goto("/projects/stories")}
        >
          Przenieś mnie do stories
        </button>
        <button
          class="btn btn-warning ms-2"
          on:click={ResetCurrentProjectHandler}
        >
          Change project
        </button>
      </div>
    {:else}
      <div class="alert alert-info" role="alert">
        Choose a project before starting
      </div>
      <table class="table table-striped table-bordered mt-4">
        <thead class="thead-dark">
          <tr>
            <th>Project Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {#each projects as project}
            <tr>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>
                <button
                  class="btn btn-primary"
                  on:click={() => chooseCurrentProjectHandler(project)}
                >
                  Choose
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
</div>

<style>
  /* DARK MODE */
  :root.dark div.mainDiv,
  :root.dark div,
  :root.dark table,
  :root.dark tbody,
  :root.dark div.mainButtonsDiv {
    background-color: #646464;
    color: #f4f4f4;
  }
  :root.dark div.mainDiv{
    min-height: 80vh;
    margin: 0;
    padding: 0;
  }

  :root.dark div.currentProjectDiv {
    border-color: yellow;
  }

</style>
