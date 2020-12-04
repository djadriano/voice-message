<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
  main {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<script>
  // -----------------------------------------------
  // Imports
  // -----------------------------------------------

  import { Router, Route } from 'svelte-routing';
  import RecorderPage from '../pages/Recorder.svelte';
  import PreviewPage from '../pages/Preview.svelte';
  import SuccessPage from '../pages/Success.svelte';

  // -----------------------------------------------
  // State variables
  // -----------------------------------------------

  export let url = '';
</script>

<main>
  <Router {url}>
    <Route path="success" component="{SuccessPage}" />
    <Route path="preview" component="{PreviewPage}" />
    <Route path="/" component="{RecorderPage}" />
  </Router>
</main>
