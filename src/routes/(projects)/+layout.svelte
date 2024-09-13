<script lang="ts">
  import NotificationDialog from "$lib/components/notificationDialog.svelte";
  import NotificationList from "$lib/components/notificationList.svelte";
  import UnreadCounter from "$lib/components/unreadCounter.svelte";
  import { logOut } from "$lib/googleAuth";
  import { notificationService } from "$lib/notificationService";
  import type { Notification } from "$lib/notificationService";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { theme } from "../../stores/themeStore";

  let isDarkMode = false;

  function darkModeCheck() {
    if (typeof window !== "undefined") {
      isDarkMode = localStorage.getItem("theme") === "dark";
      document.documentElement.setAttribute(
        "data-theme",
        isDarkMode ? "dark" : "light"
      );
      // Apply dark class to documentElement for dark mode
      document.documentElement.classList.toggle("dark", isDarkMode);
    }
  }
  function toggleTheme() {
    isDarkMode = !isDarkMode;
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
    darkModeCheck()
  }
  /*
  onMount(() => {
    //if(isDarkMode){
    //document.body.classList.add("dark", darkMode);
    if (isDarkMode) {
      // Get all elements in the document
      const allElements = document.querySelectorAll("*");

      // Add the 'dark' class to each element
      allElements.forEach((element) => {
        element.classList.add("dark");
      });
    }

    //}
  });
*/

  function sendFunction() {
    const id = Date.now().toString();
    notificationService.send({
      id,
      title: "New Message",
      message: "You have received a new message!",
      date: new Date().toISOString(),
      priority: "high",
      read: false,
    });
  }

  async function handleLogout() {
    await fetch("/api/delete-cookie", {
      method: "POST",
    });

    await logOut();
    window.location.href = "/login";
  }


  //
  //
  darkModeCheck()
</script>

<div class="page">
  <header>
    <h1>Banner here</h1>
    <UnreadCounter />
    <p>
      <button class="btn btn-warning ms-2" on:click={handleLogout}>logOut</button>
      <button class="btn btn-warning ms-2" on:click={sendFunction}>Example Notificatino</button>
      <button class="btn btn-warning ms-2" on:click={toggleTheme}>
        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </p>
  </header>

  <main>
    <div class="popupAlert"><NotificationDialog></NotificationDialog></div>
    <slot></slot>
  </main>

  <footer>
    <p>2024 Your Company</p>
  </footer>
</div>

<style>

  header {
    display: flex;
    justify-content: space-between;
    background-color: #f4f4f4;
    padding: 1rem;
  }

  footer {
    background-color: #f4f4f4;
    padding: 1rem;
    text-align: center;
  }

  /* DARK MODE */
  :root.dark header {
    background-color: #333; 
    color: #f4f4f4;
  }

  :root.dark footer {
    background-color: #333; 
    color: #f4f4f4;

  }

  :root.dark div.popupAlert,
  :root.dark div.page
  {
    background-color: #333; 
    color: #f4f4f4;
  }

  
</style>
