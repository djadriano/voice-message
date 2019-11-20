<style>
  img {
    width: 100px;
    height: 100px;
  }
</style>

<script>
  // -----------------------------------------------
  // State variables
  // -----------------------------------------------

  export let name;
  export let photo;
</script>

<header>
  {#if photo}
    <img src="{photo}" alt="{name}" />
  {/if}
  <h1>Hello {name}</h1>
</header>
