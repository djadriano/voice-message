<style>
  time {
    border: 1px solid;
  }
</style>

<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  const maxRecorderSeconds = 5;
  const intervalTime = 1000;

  export let recorderStatus;

  $: recorderStatus === 'STARTED' ? start() : stop();

  let counter = 0;
  let counterInterval;

  function start() {
    counterInterval = setInterval(incrementCounter, intervalTime);
  }

  function incrementCounter() {
    counter === maxRecorderSeconds ? cancelInterval() : (counter += 1);
  }

  function cancelInterval() {
    clearInterval(counterInterval);
    counter = 0;
    dispatch('stop');
  }

  function stop() {
    if (counter) clearInterval(counterInterval);
  }
</script>

<time>{counter}</time>
