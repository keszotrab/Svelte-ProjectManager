<script lang="ts">
  import { logOut, monitorAuthState, signInWithGoogle } from "$lib/googleAuth";
  import { getFirestore, doc, setDoc } from "firebase/firestore";
  import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
  import { auth, googleProvider } from "$lib/firebase";

  let isUserLogged: boolean | undefined;
  let login = "";
  let password = "";
  let user: any = null;
  let isUserValid: boolean;

  /*
  monitorAuthState((currentUser: any) => {
    user = currentUser;
    console.log(user);
  });
*/

  /*
  async function handleLogin(event: Event) {
    event.preventDefault();

    let surname = login;
    let name = password;
    let objectToStringify = JSON.stringify({ surname, name });

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: objectToStringify,
      });

      if (!response.ok) {
        throw new Error("Invalid login or password");
      }

      // Przekierowanie po udanym logowaniu
      window.location.href = "/projects"; // Możesz użyć `goto` z `$app/navigation` do przekierowania
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  }
    */

  onAuthStateChanged(auth, (currentUser) => {
    user = currentUser;
    console.log("Current user: ", user);
  });

  async function signInWithGoogleHandler() {

    googleProvider.setCustomParameters({
      prompt: "select_account", 
    });

    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Login error", err);
    }

    //isUserLogged = await signInWithGoogle();
    //if (isUserLogged) {
    //window.location.href = "/projects"
    //}
  }

  async function handleLogout() {
    await signOut(auth);
  }
</script>

<div class="loginContainer">
  {#if !user}
    <form
      on:submit={() => {
        console.log("LOGIN ONLY BY GOOGLE TODO");
      }}
    >
      <label for="login">Login:</label>
      <input id="login" type="text" bind:value={login} required />

      <label for="password">Password:</label>
      <input id="password" type="password" bind:value={password} required />

      <button type="submit">Log In</button>
    </form>

    <button class="googleLoginBtn" on:click={signInWithGoogleHandler}>
      Sign in with Google
    </button>
  {:else}
    <p>Hello {user.displayName}!</p>
    <p>You are already Logged in!</p>

    <button
      on:click={() => {
        window.location.href = "/projects";
      }}>Go to projects</button
    >
    <p></p>
    <button on:click={handleLogout}>Log Out</button>
  {/if}
</div>

<style>
  .googleLoginBtn {
    margin-top: 10px;
  }

  .loginContainer {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 0 auto;
  }

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
