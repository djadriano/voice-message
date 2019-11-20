<style>
  button {
    background: green;
    color: white;
    border: 0;
  }

  button.active {
    background: red;
  }
</style>

<script>
  // -----------------------------------------------
  // Imports
  // -----------------------------------------------

  import { createEventDispatcher } from 'svelte';
  import AudioRecorder from 'audio-recorder-polyfill';

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
  let recordingStatus = 'start';
  let buttonLabel = {
    start: 'Start record',
    started: 'Stop record',
  };

  // -----------------------------------------------
  // Methods
  // -----------------------------------------------

  function toggleRecord() {
    recordingStatus === 'start' ? start() : stop();
  }

  async function start() {
    recordingStatus = 'started';

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
    dispatch('finish', evt.data);
    setTimeout(stopBrowserMic, 1000);
  }

  function stop() {
    recordingStatus = 'start';
    mediaRecorder.stop();
  }

  function stopBrowserMic() {
    mediaRecorder.stream.getTracks().forEach(i => i.stop());
  }
</script>

<section>
  <button
    on:click="{toggleRecord}"
    class:active="{recordingStatus === 'started'}">
    {buttonLabel[recordingStatus]}
  </button>
</section>
