<style>
  main {
    position: relative;
  }
</style>

<script>
  // -----------------------------------------------
  // Imports
  // -----------------------------------------------
  import { user } from '../utils/store.js';
  import Header from '../components/Header.svelte';
  import LoginPage from '../pages/Login.svelte';
  import RecorderPage from '../pages/Recorder.svelte';

  // -----------------------------------------------
  // State variables
  // -----------------------------------------------

  let userData = $user;

  // -----------------------------------------------
  // Store listeners
  // -----------------------------------------------

  user.subscribe(value => {
    userData = value;
  });
</script>

<main>
  {#if userData.logged}
    <Header name="{userData.displayName}" photo="{userData.photoURL}" />
    <RecorderPage />
  {:else}
    <LoginPage />
  {/if}
</main>
