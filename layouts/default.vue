<template>
  <div :class="$style.layout">
      <header :class="$style.header">
        <div :class="$style.actions">
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
        <div :class="$style.dragZone">
          <h1 :class="$style.h1">Kao - Der Avatar Browser</h1>
        </div>
        <div :class="$style.actions">
          <button :class="$style.button" @click="onMinimizeClick">
            <Icon name="mdi:window-minimize" />
          </button>
          <button :class="$style.button" @click="onMaximizeClick">
            <Icon name="mdi:window-maximize" />
          </button>
          <button :class="$style.button" @click="onCloseClick">
            <Icon name="mdi:close" />
          </button>
        </div>
      </header>
      <main :class="$style.main">
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

<style module>
.layout {
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

.header {
  display: flex;
  font-size: 1.5rem;
  background-color: var(--color-background--dark);
}

.dragZone {
  flex: 1 0 auto;
  -webkit-user-select: none;
  -webkit-app-region: drag;
  display: flex;
  padding: var(--layout-gap);
  align-items: center;
  justify-content: center;
}

.h1 {
  font-size: 1rem;
}

.actions {
  display: flex;
  gap: var(--layout-gap);
  padding: 0 var(--layout-gap);
  align-items: center;
}

.actions > a {
  display: flex;
  justify-content: center;
}

.button:hover {
  color: var(--color-font--dark);
}

.main {
  overflow-y: auto;
  padding: var(--layout-gap);
  margin: var(--layout-gap);
}
</style>