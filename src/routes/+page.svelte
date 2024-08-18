<script lang="ts">
    import {ProjectService} from "../lib/projectService"
    import { onMount } from "svelte";
    
    onMount(()=>{
        const projectService : ProjectService = new ProjectService();

    }
)


  /*let userService = new UserService();
  
  //let currentProject = localStorage.getItem("currentProject");

  //if (currentProject == null || undefined) {
  //}

  function showProjects() {
    throw new Error("Function not implemented.");
  }

  function AddProjects() {
    throw new Error("Function not implemented.");
  }

  function showResetProjects() {
    throw new Error("Function not implemented.");
  }*/ 
</script>

<h1>Welcome to SvelteKit</h1>
<button on:click={showProjects}> Show projects </button>
<button on:click={AddProjects}> Add project </button>
<button on:click={showResetProjects}> Reset Projects </button>

<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
<a href="/info">Info</a>
