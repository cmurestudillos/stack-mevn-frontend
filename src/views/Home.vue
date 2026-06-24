<template>
  <h1 class="page-title">Usuarios</h1>
  <ListaUsuarios />
</template>

<script>
//Componentes
import ListaUsuarios from '../components/ListaUsuarios.vue';

export default {
  components: {
    ListaUsuarios,
  },
};
</script>

<style scoped>
.page-title {
  margin: 0 0 1.5rem;
  font-weight: 600;
}
</style>
