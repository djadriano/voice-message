<style>

</style>

<script>
  // -----------------------------------------------
  // Imports
  // -----------------------------------------------

  import { createEventDispatcher } from 'svelte';

  // -----------------------------------------------
  // State variables
  // -----------------------------------------------

  export let file = '';

  // -----------------------------------------------
  // Constants
  // -----------------------------------------------

  const dispatch = createEventDispatcher();
  const urlFile = window.URL.createObjectURL(file);

  // -----------------------------------------------
  // Methods
  // -----------------------------------------------

  function approveSound() {
    dispatch('valid');
  }

  function declineSound() {
    dispatch('invalid');
  }
</script>

<section>
  <h1>Preview</h1>
  <audio src="{urlFile}" controls="true"></audio>
  <button on:click="{approveSound}">OK</button>
  <button on:click="{declineSound}">Record new sound</button>
</section>
