<script lang="ts">
  import { ProjectService } from "../lib/projectService";
  import { onMount } from "svelte";

  let projectService: ProjectService;
  let projectId: number;
  let projectName: string;
  let projectDesc: string;
  let projectNameToUpdate: string;
  let projectDescToUpdate: string;
  let projectIdToUpdate: number;
  let loggedUser: string =" tutaj nazwa użyt"


  //let userService = new UserService();

  //let currentProject = localStorage.getItem("currentProject");

  //if (currentProject == null || undefined) {
  //}

  onMount(() => {
    projectService = new ProjectService();
  });

  function showProject() {
    console.log("====================================");
    console.log(projectService.getProject());
    console.log("====================================");
  }

  function addProject() {
    if (!projectName || !projectDesc) {
      projectName = "new name";
      projectDesc = "new desc";
    }
    projectService.addProject(projectName, projectDesc)
    console.log("====================================");
    console.log(projectService.getProject());
    console.log("====================================");
  }

  function resetProjects() {
    projectService.resetProjects();
    console.log("====================================");
    console.log(projectService.getProject());
    console.log("====================================");
  }

  function deleteProject() {
    projectService.deleteProject(projectId);
    console.log("====================================");
    console.log(projectService.getProject());
    console.log("====================================");
  }


  function updateProject() {
    projectService.updateProject(projectIdToUpdate, projectNameToUpdate, projectDescToUpdate)
    console.log("====================================");
    console.log(projectService.getProject());
    console.log("====================================");
  }

</script>

<h1>Projects Controlle Panel</h1>
<button on:click={showProject}> Show project </button>
<p>
  <button on:click={addProject}> Add project </button>
  <input
    type="text"
    bind:value={projectName}
    placeholder="Name of project here"
  />
  <input
    type="text"
    bind:value={projectDesc}
    placeholder=" Description goes here"
  />
</p>
<p>
  <button on:click={deleteProject}> Delete project </button>
  Input Id you want to delete
  <input type="number" bind:value={projectId} placeholder="Id here"/>

</p>

<p>
  <button on:click={updateProject}> Update project </button>
  <input type="number" bind:value={projectIdToUpdate} placeholder="Id here" />

  <input
    type="text"
    bind:value={projectNameToUpdate}
    placeholder="Name of project here"
  />
  <input
    type="text"
    bind:value={projectDescToUpdate}
    placeholder=" Description goes here"
  />

</p>

<p> Currently Logged User: {loggedUser}</p>



<button on:click={resetProjects}> Reset Projects </button>

