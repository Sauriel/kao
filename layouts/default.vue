<template>
  <div id="layout">
      <header>
        <div class="actions">
          <NuxtLink to="/">
            <Icon name="mdi:home-circle" />
          </NuxtLink>
          <NuxtLink to="/settings">
            <Icon name="mdi:cog" />
          </NuxtLink>
          <NuxtLink to="/report">
            <Icon name="mdi:clipboard-alert-outline" />
          </NuxtLink>
        </div>
        <div id="drag-zone">
          <h1>Kao - Der Avatar Browser</h1>
        </div>
        <div class="actions">
          <button @click="onMinimizeClick">
            <Icon name="mdi:window-minimize" />
          </button>
          <button @click="onMaximizeClick">
            <Icon name="mdi:window-maximize" />
          </button>
          <button @click="onCloseClick">
            <Icon name="mdi:close" />
          </button>
        </div>
      </header>
      <main>
        <slot />
      </main>
    </div>
</template>

<script setup>
import { ipcRenderer } from 'electron';

function onMinimizeClick() {
  ipcRenderer.send('onAppMinimize');
}

function onMaximizeClick() {
  ipcRenderer.send('onAppMaximize');
}

function onCloseClick() {
  ipcRenderer.send('onAppClose');
}
</script>

<style scoped>
#layout {
  background-color: var(--color-background);
  border-radius: var(--border-radius);
  border: 1px solid var(--color-background--light);
  overflow: hidden;
  flex-grow: 1;
  display: grid;
  grid-template-areas: "app-header"
    "app-content";
  grid-template-rows: 2rem calc(100vh - 2rem);
  --layout-gap: .5rem;
}

header {
  display: flex;
  font-size: 1.5rem;
  background-color: var(--color-background--dark);
}

#drag-zone {
  flex: 1 0 auto;
  -webkit-user-select: none;
  -webkit-app-region: drag;
  display: flex;
  padding: var(--layout-gap);
  align-items: center;
  justify-content: center;
}

h1 {
  font-size: 1rem;
}

.actions {
  display: flex;
  gap: var(--layout-gap);
  padding: 0 var(--layout-gap);
}

button:hover {
  color: var(--color-font--dark);
}

main {
  overflow-y: auto;
  padding: var(--layout-gap);
  margin: var(--layout-gap);
}
</style>