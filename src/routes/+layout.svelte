<div id="layout">
  <main>
    <slot />
  </main>
  <Footer />
</div>

<style>
  #layout {
    height: 100vh;
    overflow: hidden;
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-areas: 'main' 'footer';
  }

  main {
    grid-area: main;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>

<script lang="ts">
  import '../styles/global.css';
  import Footer from '$lib/components/footer/Footer.svelte';
</script>
