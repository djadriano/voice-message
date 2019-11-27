<style>
  .recorder {
    position: relative;
  }
</style>

<script>
  // -----------------------------------------------
  // Imports
  // -----------------------------------------------

  import { navigate } from 'svelte-routing';
  import Recorder from '../components/Recorder.svelte';

  // -----------------------------------------------
  // Methods
  // -----------------------------------------------

  function onRecorded() {
    navigate('/preview');
  }
</script>

<section class="recorder">
  <Recorder on:finish="{onRecorded}" />
</section>
