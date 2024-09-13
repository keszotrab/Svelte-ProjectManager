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
  const stories = data.stories as Story[];

  let filteredStories: Story[] = [];
  let selectedFilter: State | "all" = "all"; // Default filter is 'all'

  function filterStories() {
    if (selectedFilter === "all") {
      filteredStories = stories;
    } else {
      filteredStories = stories.filter(
        (story) => story.state === selectedFilter
      );
    }
  }

  stories.sort((a: Story, b: Story) => {
    const stateOrder: Record<State, number> = {
      [State.Todo]: 1,
      [State.Doing]: 2,
      [State.Done]: 3,
    };
    return stateOrder[a.state] - stateOrder[b.state];
  });

  filteredStories = stories;
</script>

<!-- Filter Dropdown -->
<div>
  <div class="container mt-4 mainDiv">
    <h2 class="mb-4">Stories</h2>
    <div class="form-group">
      <label for="stateFilter">Filter by State:</label>
      <select
        id="stateFilter"
        class="form-control"
        bind:value={selectedFilter}
        on:change={filterStories}
      >
        <option value="all">All</option>
        <option value={State.Todo}>Todo</option>
        <option value={State.Doing}>Doing</option>
        <option value={State.Done}>Done</option>
      </select>
    </div>

    <table class="table table-striped mt-4">
      <thead class="thead-dark">
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Priority</th>
          <th>Creation Date</th>
          <th>Owner</th>
          <th>State</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {#each filteredStories as story}
          <tr>
            <td>{story.name}</td>
            <td>{story.desc}</td>
            <td>{story.priority}</td>
            <td>{new Date(story.createDate).toLocaleDateString()}</td>
            <td>{story.owner.name} {story.owner.surname}</td>
            <td>{story.state}</td>
            <td>
              <button
                class="btn btn-warning ms-2"
                on:click={() => goto("/projects/stories/" + story.id)}
              >
                Przenieś mnie do zadań
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
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
</style>
