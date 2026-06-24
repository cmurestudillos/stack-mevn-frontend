<template>
  <Menubar :model="items" class="app-menubar">
    <template #start>
      <img src="../../assets/img/logo.png" width="32" height="32" alt="Logo" title="Logo" class="logo" />
      <span class="brand">MEVN Stack</span>
    </template>
    <template #end>
      <PButton
        :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
        rounded
        text
        severity="secondary"
        aria-label="Cambiar tema"
        @click="toggleDarkMode" />
    </template>
  </Menubar>
</template>

<script>
import Menubar from 'primevue/menubar';
import PButton from 'primevue/button';
import { useDarkMode } from '../../composables/useDarkMode';

export default {
  components: { Menubar, PButton },
  setup() {
    const { isDark, toggleDarkMode } = useDarkMode();
    return { isDark, toggleDarkMode };
  },
  data() {
    return {
      items: [
        { label: 'Inicio', icon: 'pi pi-home', command: () => this.$router.push({ name: 'home' }) },
        { label: 'Añadir', icon: 'pi pi-plus', command: () => this.$router.push({ name: 'agregar' }) },
      ],
    };
  },
};
</script>

<style scoped>
.app-menubar {
  position: sticky;
  top: 0;
  z-index: 10;
  border-radius: 0;
}

.logo {
  border-radius: 50%;
  margin-right: 0.5rem;
}

.brand {
  font-weight: 600;
  margin-right: 1rem;
}
</style>
