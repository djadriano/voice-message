<style>
  button {
    color: white;
    border: 0;
    background: transparent;
  }

  .icon {
    width: 50px;
    height: 50px;
  }

  .icon.active {
    animation: pulse 250ms infinite;
  }

  @keyframes pulse {
    from {
      fill: black;
    }
    to {
      fill: red;
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
  <button on:click="{toggleRecord}">
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="icon" class:active="{$recorder.status === 'STARTED'}">
      <path d="M8 11a3 3 0 003-3V3a3 3 0 10-6 0v5a3 3 0 003 3z"/>
      <path d="M13 8V6h-1v1.844c0 1.92-1.282 3.688-3.164 4.071A4.007 4.007 0 014 8V6H3v2a5.01 5.01 0 004 4.899V15H5v1h6v-1H9v-2.101A5.01 5.01 0 0013 8z"/>
    </svg>
  </button>
  <Counter on:stop="{stop}" recorderStatus="{$recorder.status}" />
</section>
