<style>

</style>

<script>
  // -----------------------------------------------
  // Imports
  // -----------------------------------------------

  import { navigate } from 'svelte-routing';
  import { recorder } from '../utils/store.js';
  import { RECORDER_STORE } from '../utils/constants.js';

  // -----------------------------------------------
  // Constants
  // -----------------------------------------------

  const urlFile = window.URL.createObjectURL($recorder.file);

  // -----------------------------------------------
  // Methods
  // -----------------------------------------------

  function approveSound() {
    navigate('success');
  }

  function declineSound() {
    recorder.set(RECORDER_STORE);
    navigate('/');
  }
</script>

<section>
  <h1>Preview</h1>
  <audio src="{urlFile}" controls="true"></audio>
  <button on:click="{approveSound}">OK</button>
  <button on:click="{declineSound}">Record new sound</button>
</section>
