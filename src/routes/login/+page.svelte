<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import tempUserDB from "../../lib/tempDB/tempUserDB.json"
  import { User, Role } from '$lib/user';
  
    let login = '';
    let password = '';
    let users = tempUserDB.map(user => new User(
    user.id,
    user.imie,
    user.nazwisko,
    Role[user.role as keyof typeof Role] // Type assertion to ensure TypeScript understands it's a valid Role key
    )); // do wywalenia jak bedzie juz wszystko w db

    
  
    async function handleLogin(event: Event) {
      event.preventDefault();
  
      // Simulate sending data to the API
      const response = await mockApiLogin(login, password);
  
      if (response.success) {
        // Redirect to another page (e.g., dashboard) upon successful login
        alert(`Welcome, ${response.user?.imie} ${response.user?.nazwisko}!`);
        goto('/dashboard'); // Redirect to dashboard or another page
      } else {
        // Handle login failure
        alert('Login failed. Please check your credentials.');
      }
    }
  
    // Mock API login function
    async function mockApiLogin(login: string, password: string) {
      // Here we're simulating a login by comparing the login with the JSON data
  
  
      // Mock password is just the user's first name in lowercase for simplicity
      const user = users.find(user => user.imie.toLowerCase() === login.toLowerCase() && password === user.imie.toLowerCase());
  
      if (user) {
        return { success: true, user };
      } else {
        return { success: false };
      }
    }
  </script>
  
  <style>
    form {
      display: flex;
      flex-direction: column;
      width: 300px;
      margin: 0 auto;
    }
  
    input {
      margin-bottom: 10px;
      padding: 8px;
      font-size: 16px;
    }
  
    button {
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 16px;
    }
  
    button:hover {
      background-color: #0056b3;
    }
  </style>
  
  <h1>Login</h1>
  
  <form on:submit={handleLogin}>
    <label for="login">Login:</label>
    <input id="login" type="text" bind:value={login} required />
  
    <label for="password">Password:</label>
    <input id="password" type="password" bind:value={password} required />
  
    <button type="submit">Log In</button>
  </form>
  