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
      <section :class="$style.search" v-if="isIndex">
        <UiSearch />
      </section>
      <main :class="$style.main">
        <slot />
        <UiDirectoryViewDialog />
      </main>
    </div>
</template>

<script setup>
import { ipcRenderer } from 'electron';

const route = useRoute();

const isIndex = computed(() => route.name === 'index');

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
  position: relative;
  grid-area: app-header;
  display: flex;
  font-size: 1.5rem;
  background-color: var(--color-background--dark);
  z-index: 999;
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
  grid-area: app-content;
  overflow-y: auto;
  padding: var(--layout-gap);
  margin: var(--layout-gap);
}

.layout:has(.search) .header::before,
.layout:has(.search) .header::after {
  content: "";
  position: absolute;
  bottom: -2px;
  height: 2px;
  background-color: var(--color-primary);
}

.layout:has(.search) .header::before {
  left: 0;
  right: calc(100vw - 25vw + 28px);
}

.layout:has(.search) .header::after {
  left: calc(100vw - 25vw + 28px);
  right: 0;
}

.search {
  grid-area: app-content;
  align-self: flex-start;
  justify-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 2rem;
  background-color: var(--color-background--dark);
  border-bottom: 2px solid var(--color-primary);
  position: sticky;
  top: 0px;
  z-index: 99;
  padding: 0 2rem .25rem;
}

.search::before,
.search::after {
  content: "";
  position: absolute;
  top: -26px;
  width: 3rem;
  height: 3rem;
  background-color: var(--color-background--dark);
  border-bottom: 2px solid var(--color-primary);
}

.search::before {
  left: -24px;
  rotate: 45deg;
}

.search::after {
  right: -24px;
  rotate: -45deg;
}
</style>