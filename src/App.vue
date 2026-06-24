<template>
  <Toast position="top-right" />
  <ConfirmDialog />

  <div class="app-shell">
    <Navbar />
    <main class="app-content">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
// Componentes
import Navbar from './components/shared/Navbar.vue';
import AppFooter from './components/shared/Footer.vue';

export default {
  components: {
    Navbar,
    AppFooter,
    Toast,
    ConfirmDialog,
  },
  created() {
    this.listarUsuarios();
  },
  methods: {
    ...mapActions(['listarUsuarios']),
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: 'Inter', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-content {
  flex: 1;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
  box-sizing: border-box;
}
</style>
