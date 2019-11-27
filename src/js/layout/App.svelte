<style>
  main {
    position: relative;
  }
</style>

<script>
  // -----------------------------------------------
  // Imports
  // -----------------------------------------------

  import { Router, Route } from 'svelte-routing';
  import { user } from '../utils/store.js';
  import Header from '../components/Header.svelte';
  import LoginPage from '../pages/Login.svelte';
  import RecorderPage from '../pages/Recorder.svelte';
  import PreviewPage from '../pages/Preview.svelte';
  import SuccessPage from '../pages/Success.svelte';

  // -----------------------------------------------
  // State variables
  // -----------------------------------------------

  export let url = '';
  let store = $user;

  // -----------------------------------------------
  // Store listener
  // -----------------------------------------------

  user.subscribe(value => {
    store = value;
  });
</script>

<main>
  <Router {url}>
    {#if store.logged}
      <Header name="{store.displayName}" photo="{store.photoURL}" />
    {/if}
    <Route path="success" component="{SuccessPage}" />
    <Route path="preview" component="{PreviewPage}" />
    <Route path="recorder" component="{RecorderPage}" />
    <Route path="/" component="{LoginPage}" />
  </Router>
</main>
