<script lang="ts">
  import type { Project } from "$lib/project";
  import { Priority, State, Story } from "$lib/story";
  import { User, Role } from "$lib/user";
  import { UserService } from "$lib/userService";
  import { ProjectService } from "../../lib/projectService";
  import { onMount } from "svelte";

  //services
  let projectService: ProjectService;
  let userService: UserService;

  //varaibles
  let chosenProjectId: number;
  let currentProject: Project | null | undefined;
  let loggedUser: string = " tutaj nazwa użyt";

  /////////////////////////////
  let filteredStories: Story[] = [];
  let selectedFilter: State | 'all' = 'all';  // Default filter is 'all'
  let stories: Story[] ;

  onMount(() => {
    //mount service
    userService = new UserService();
    projectService = new ProjectService();
    stories = projectService.stories;


    currentProject = projectService.currentProject;

    if (currentProject == undefined || currentProject == null) {
      console.log("No project has been chosen");
    } else {
      console.log(currentProject);
    }



    stories.sort((a, b) => {
      const stateOrder = {
        [State.Todo]: 1,
        [State.Doing]: 2,
        [State.Done]: 3
      };
      return stateOrder[a.state] - stateOrder[b.state];
    });

    // Initially, show all stories
    filteredStories = stories;

  });


  function chooseCurrentProjectHandler() {
    if (chosenProjectId) {
      projectService.chooseCurrentProject(chosenProjectId);
      currentProject = projectService.currentProject;

    }
  }



  function filterStories() {
    if (selectedFilter === 'all') {
      filteredStories = stories;
    } else {
      filteredStories = stories.filter(story => story.state === selectedFilter);
    }
  }

</script>

<p>Currently Logged User: {loggedUser}</p>

<input type="number" bind:value={chosenProjectId} placeholder="Input Id here" />
<button on:click={chooseCurrentProjectHandler}> Show project </button>

{#if currentProject}
  <h2>Stories for Project {currentProject.nazwa}</h2>

  <!-- Filter Dropdown -->
  <label for="stateFilter">Filter by State: </label>
  <select id="stateFilter" bind:value={selectedFilter} on:change={filterStories}>
    <option value="all">All</option>
    <option value={State.Todo}>Todo</option>
    <option value={State.Doing}>Doing</option>
    <option value={State.Done}>Done</option>
  </select>
  
  <!-- Filtered Stories List -->
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Priority</th>
        <th>Creation Date</th>
        <th>Owner</th>
        <th>State</th>
      </tr>
    </thead>
    <tbody>
      {#each filteredStories as story}
        <tr>
          <td>{story.name}</td>
          <td>{story.desc}</td>
          <td>{story.priority}</td>
          <td>{story.createDate}</td>
          <td>{story.owner.imie} {story.owner.nazwisko}</td>
          <td>{story.state}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  
  
     <!--<button on:click={filterStories}>Apply Filter</button> -->









{:else}
  <p>Choose a project before starting</p>
{/if}














<style>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #f5f5f5;
  }
</style>
