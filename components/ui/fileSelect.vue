<template>
  <label class="btn">
    <input type="file" webkitdirectory directory multiple @change="onChange"/>
    <slot />
  </label>
</template>

<script setup lang="ts">
function onChange(event: Event) {
  console.log(event);
}
</script>

<style scope>
input {
  width: 0;
  height: 0;
  opacity: 0;
}
</style>