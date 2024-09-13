<script lang="ts">
  import {notificationService} from '$lib/notificationService';
  import { onDestroy } from 'svelte';
  import NotificationDialog from './notificationDialog.svelte';
  import NotificationList from './notificationList.svelte';

  let unreadCount = 0;
  let showDialogBox: boolean = false;

  const subscription = notificationService.unreadCount().subscribe(count => {
    unreadCount = count;
  });

  onDestroy(() => {
    subscription.unsubscribe();
  });

  function showDialouge(){
    showDialogBox = !showDialogBox
  }

</script>

<button class="NotificationButton btn btn-warning ms-2" on:click={showDialouge}>Unread notifications: {unreadCount}</button>
{#if showDialogBox}
<NotificationList></NotificationList>
{/if}
