<style>
  button {
    background: green;
    color: white;
    border: 0;
  }

  button.active {
    background: red;
    animation: foo 250ms infinite;
  }

  @keyframes foo {
    from {
      background: green;
    }
    to {
      background: red;
    }
  }
</style>

<script>
  // -----------------------------------------------
  // Imports
  // -----------------------------------------------

  import { createEventDispatcher } from 'svelte';
  import { recorder } from '../utils/store.js';
  import AudioRecorder from 'audio-recorder-polyfill';
  import Counter from './Counter.svelte';

  // -----------------------------------------------
  // Constants
  // -----------------------------------------------

  const dispatch = createEventDispatcher();
  const constraints = {
    audio: true,
    video: false,
  };

  // -----------------------------------------------
  // State variables
  // -----------------------------------------------

  let mediaRecorder = '';
  let buttonLabel = {
    START: 'Start record',
    STARTED: 'Stop record',
  };

  // -----------------------------------------------
  // Methods
  // -----------------------------------------------

  function toggleRecord() {
    const { status } = $recorder;

    status === 'START' ? start() : stop();
  }

  async function start() {
    recorder.set({
      ...$recorder,
      status: 'STARTED',
    });

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      mediaRecorder = new AudioRecorder(stream);
      mediaRecorder.start();
      mediaRecorder.addEventListener('dataavailable', hasMediaData);
    } catch (error) {
      console.log(error);
    }
  }

  function hasMediaData(evt) {
    const file = evt.data;

    recorder.set({
      ...$recorder,
      file,
    });

    dispatch('finish', file);
    setTimeout(stopBrowserMic, 1000);
  }

  function stop() {
    mediaRecorder.stop();

    recorder.set({
      ...$recorder,
      status: 'STOP',
    });
  }

  function stopBrowserMic() {
    mediaRecorder.stream.getTracks().forEach(i => i.stop());
  }
</script>

<section>
  <button on:click="{toggleRecord}" class:active="{$recorder.status === 'STARTED'}">
    {buttonLabel[$recorder.status]}
  </button>
  <Counter on:stop="{stop}" recorderStatus="{$recorder.status}" />
</section>
