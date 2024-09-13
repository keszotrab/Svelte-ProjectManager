<script lang="ts">
  import {notificationService} from '$lib/notificationService';
    import { onDestroy } from 'svelte';
    import type {Notification} from "$lib/notificationService"
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  let highPriorityNotification = writable<Notification | null>(null);

  onMount(() => {
    const subscription = notificationService.getHighPriorityNotification().subscribe((notification) => {
      highPriorityNotification.set(notification);
    });

    return () => subscription.unsubscribe();
  });

  function closeDialog() {
    highPriorityNotification.set(null);
  }
</script>

{#if $highPriorityNotification}
  <div class="popup-dialog">
    <div class="popup-content">
      <h2>{$highPriorityNotification.title}</h2>
      <p>{$highPriorityNotification.message}</p>
      <button on:click={closeDialog}>Close</button>
    </div>
  </div>
{/if}

<style>
  .popup-dialog {
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border: 2px solid #ccc;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }
  
  .popup-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
