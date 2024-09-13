<script lang="ts">
  import { Priority, State } from "$lib/story";
  import { ProjectService } from "../lib/server/projectServiceOld";
  import { onMount } from "svelte";
  //import { db } from "$lib/firebase";
  import { collection, getDocs } from "firebase/firestore";

  let projectService: ProjectService;
  let projectId: number;
  let projectName: string;
  let projectDesc: string;
  let projectNameToUpdate: string;
  let projectDescToUpdate: string;
  let projectIdToUpdate: number;
  let loggedUser: string = " tutaj nazwa użyt";
  let taskIdToRoute: number;

  let currentState: State;
//firebase try
let items: Array<any> = [];


  onMount(async () => {
    projectService = new ProjectService();
    
    /*
    try {
      // Pobranie danych z kolekcji 'users'
      const querySnapshot = await getDocs(collection(db, "users"));

      // Mapowanie dokumentów na dane
      items = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        console.log("User:", data); // Logowanie każdego użytkownika do konsoli
        return data;
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
      */

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
    projectService.addProject(projectName, projectDesc);
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
    projectService.updateProject(
      projectIdToUpdate,
      projectNameToUpdate,
      projectDescToUpdate
    );
    console.log("====================================");
    console.log(projectService.getProject());
    console.log("====================================");
  }

  function showStoriesHandler() {
    console.log("====================================");
    console.log(projectService.getStory());

    console.log("====================================");
  }
  function AddStoriesHandler() {
    projectService.addStory(
      "example name",
      "example desc",
      Priority.Low,
      1,
      State.Todo,
      1
    );
    console.log("====================================");
    console.log(projectService.stories[projectService.stories.length - 1]);
    console.log("====================================");
  }

  function resetStoriesHandler() {
    projectService.resetStories();
  }

  function updateStoriesHandler() {
    projectService.updateStory(1, "UpdateStoryName");
  }

  function showChosenState() {
    console.log("====================================");
    console.log(currentState);
    console.log("====================================");
  }

  function addExampleTasksHandler() {
    projectService.addExampleTasks();
  }

  function showTasksHandler() {
    projectService.getTask();
  }

  function addTaskHandler() {
    projectService.addTask(
      "cool task",
      "this task is very cool",
      Priority.Medium,
      1,
      State.Done,
      1,
      new Date("2024-08-25")
    );
  }

  function routeToTask() {}
</script>

<h1>Projects Controlle Panelle pizza parmeziana</h1>
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
  <input type="number" bind:value={projectId} placeholder="Id here" />
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

<p>Currently Logged User: {loggedUser}</p>

<p>----------------Story-----------------</p>

<p>
  <button on:click={showStoriesHandler}> Show a Story </button>
</p>

<p>
  <button on:click={AddStoriesHandler}> Add Example story </button>
</p>

<p>
  <button on:click={updateStoriesHandler}> Update Stories </button>
</p>

<p>
  <label>
    <input
      type="radio"
      name="state"
      value={State.Todo}
      bind:group={currentState}
    />
    Todo
  </label>

  <label>
    <input
      type="radio"
      name="state"
      value={State.Doing}
      bind:group={currentState}
    />
    Doing
  </label>

  <label>
    <input
      type="radio"
      name="state"
      value={State.Done}
      bind:group={currentState}
    />
    Done
  </label>

  <button on:click={showChosenState}> Show chosen state</button>
</p>

<p>----------------Task-----------------</p>

<button on:click={showTasksHandler}> Show a Task </button>

<button on:click={addExampleTasksHandler}> Set Example Tasks </button>

<button on:click={addTaskHandler}> Add a example TASK aka CRUD thingy </button>

<p>-------------Hard Resets-------------</p>

<p>
  <button on:click={resetStoriesHandler}> RESET STORIES </button>
</p>

<button on:click={resetProjects}> Reset Projects </button>

<p>----------Routing test-----------</p>

<p>
  <button on:click={routeToTask}> RouteToTask </button>
  <a href="/task/{taskIdToRoute}">Reactive link</a>
  <input type="text" bind:value={taskIdToRoute} placeholder="id of task here" />
</p>
