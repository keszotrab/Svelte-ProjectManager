<script lang="ts">
  import { Project } from "$lib/project.js";
  import { type Task, State } from "$lib/tasks.js";
  import type { User } from "$lib/user";
  import { Timestamp } from "firebase/firestore";
  import { writable } from "svelte/store";

  export let data;

  let users = writable([]); // Pierwsza rzecz ze Svelte 5 której użyłem xDD
  //                           Ale będzie używana częściej bo strasznie wygodna

  let storyId = data.storyId;
  let projectId = data.props.currentProject.id;
  let thisTask: Task = data.task as Task;
  let newOwner: any;
  let usersLoaded: boolean = false;
  let isLoading: boolean = false;

  async function fetchUsers() {
    if (!usersLoaded) {
      isLoading = true;
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        users.set(data);
        usersLoaded = true;
      } catch (error) {
        console.error("Błąd podczas pobierania użytkowników:", error);
      } finally {
        isLoading = false;
      }
    }
  }

  async function setUserAsOnwer() {
    if (newOwner) {
      try {

        let currentDate = new Date()
        const response = await fetch(
          `/api/projects/${projectId}/stories/${storyId}/tasks/${thisTask.id}`,
          {
            method: "PATCH", // Można również użyć 'PUT' w zależności od API
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ state: State.Doing, owner: newOwner, startDate : currentDate }), // Przekazujemy ID nowego właściciela
          }
        );

        if (response.ok) {
          thisTask = thisTask;
          console.log("Owner updated successfully");
        } else {
          console.error("Failed to update owner");
        }
      } catch (error) {
        console.error("Error during owner update:", error);
      }
    } else {
      console.warn("No user selected to set as owner");
    }
  }

  function setTaskAsDone() {}
</script>

<p>{JSON.stringify(newOwner)}</p>

<p>Task's id: {thisTask.id}</p>
<p>Task's name: {thisTask.name}</p>
<p>Task's description: {thisTask.desc}</p>
<p>Task's priority: {thisTask.priority}</p>
<p>Task's story name: {thisTask.storyId}</p>
<p>Task's approximante completion date: {thisTask.aproxTime}</p>
<p>Task's state: {thisTask.state}</p>
<p>Task's creation date: {thisTask.createDate}</p>
<p>Task's start date: {thisTask.startDate}</p>
<p>Task's complete date: {thisTask.completeDate}</p>
<p>
  Task's owner: {thisTask.owner?.name ? thisTask.owner?.name : "Nie ma ownera"}
  {thisTask.owner?.surname}
  {thisTask.owner?.role}
</p>

{#if thisTask.state == State.Todo || thisTask.state == State.Doing}
  <div>
    <label for="user-select">Wybierz użytkownika:</label>
    <select id="user-select" bind:value={newOwner} on:click={fetchUsers}>
      <option value="" disabled>-- Wybierz użytkownika --</option>
      {#if isLoading}
        <option value="" disabled>Ładowanie...</option>
      {:else}
        {#each $users as user}
          <option value={user}>{user.name} {user.surname} {user.role}</option>
        {/each}
      {/if}
    </select>
  </div>
  <p>
    <button on:click={setUserAsOnwer}> Set owner of this task</button>
  </p>
{/if}
{#if thisTask.state == State.Doing}{/if}
<p>
  <button on:click={setTaskAsDone}> Set this to DONE</button>
</p>
{#if thisTask.state == State.Done}
  <p>There's nothing else left to do</p>
{/if}
