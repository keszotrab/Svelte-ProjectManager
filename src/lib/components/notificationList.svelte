<script lang="ts">
  import { notificationService } from "$lib/notificationService";
  import type { Notification } from "$lib/notificationService";
  import { onMount } from "svelte";
  import { Observable } from "rxjs";

  let notifications: Notification[] = [];

  const list$ = notificationService.list();

  onMount(() => {
    const subscription = list$.subscribe((n) => {
      notifications = n;
    });

    return () => subscription.unsubscribe();
  });

  function markAsRead(id: string) {
    notificationService.markAsRead(id);
  }
</script>

<div class="notificationListDisplay">
  <ul>
    {#each notifications as notification}
    {#if !notification.read}
      <li>
        <strong>{notification.title}</strong> - {notification.message} - {notification.date}
          <button on:click={() => markAsRead(notification.id)}
            >Mark as Read</button
          >
      </li>
      {/if}

    {/each}
  </ul>
</div>

<style>
  .notificationListDisplay {
    display: fixed;
  }
</style>
