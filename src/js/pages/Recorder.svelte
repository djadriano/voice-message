<style>
  .recorder {
    position: relative;
  }
</style>

<script>
  // -----------------------------------------------
  // Imports
  // -----------------------------------------------

  import Recorder from '../components/Recorder.svelte';
  import Preview from '../components/Preview.svelte';
  import Success from '../components/Success.svelte';

  // -----------------------------------------------
  // State variables
  // -----------------------------------------------

  let appStatus = 'START';
  let recordFile = null;

  // -----------------------------------------------
  // Methods
  // -----------------------------------------------

  function onRecorded(file) {
    recordFile = file.detail;
    appStatus = 'PREVIEW';
  }

  function onValid() {
    appStatus = 'SUCCESS';
  }

  function onInvalid() {
    appStatus = 'START';
  }
</script>

<section class="recorder">
  {#if appStatus === 'START'}
    <Recorder on:finish="{onRecorded}" />
  {/if}

  {#if appStatus === 'PREVIEW'}
    <Preview file="{recordFile}" on:valid="{onValid}" />
  {/if}

  {#if appStatus === 'SUCCESS'}
    <Success />
  {/if}
</section>
