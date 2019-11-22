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
  let store = $recorder;

  // -----------------------------------------------
  // Methods
  // -----------------------------------------------

  recorder.subscribe(value => {
    store = value;
  });

  function toggleRecord() {
    const { status } = store;

    status === 'START' ? start() : stop();
  }

  function setDataStore(data) {
    recorder.set(data);
  }

  async function start() {
    setDataStore({
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
    dispatch('finish', evt.data);
    setTimeout(stopBrowserMic, 1000);
  }

  function stop() {
    mediaRecorder.stop();

    setDataStore({
      ...$recorder,
      status: 'STOP',
    });
  }

  function stopBrowserMic() {
    mediaRecorder.stream.getTracks().forEach(i => i.stop());
  }
</script>

<section>
  <button on:click="{toggleRecord}" class:active="{store.status === 'STARTED'}">
    {buttonLabel[store.status]}
  </button>
  <Counter on:stop="{stop}" recorderStatus="{store.status}" />
</section>
