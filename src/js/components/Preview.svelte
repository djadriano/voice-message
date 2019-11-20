<style>

</style>

<script>
  // -----------------------------------------------
  // Imports
  // -----------------------------------------------

  import { createEventDispatcher } from 'svelte';

  // -----------------------------------------------
  // Constants
  // -----------------------------------------------

  const dispatch = createEventDispatcher();
  const urlFile = window.URL.createObjectURL(file);

  // -----------------------------------------------
  // State variables
  // -----------------------------------------------

  export let file = '';

  // -----------------------------------------------
  // Methods
  // -----------------------------------------------

  function approveSound() {
    dispatch('valid');
  }
</script>

<section>
  <h1>Preview</h1>
  <audio src="{urlFile}" controls="true"></audio>
  <button on:click="{approveSound}">OK</button>
</section>
