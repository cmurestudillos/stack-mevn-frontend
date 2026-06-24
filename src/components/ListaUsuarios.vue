<template>
  <div v-if="loading" class="state-container">
    <ProgressSpinner stroke-width="4" />
    <p>Cargando usuarios...</p>
  </div>

  <div v-else-if="loadError" class="state-container">
    <Message severity="error">
      No se ha podido cargar el listado de usuarios. Comprueba tu conexión a internet o que la API esté disponible.
    </Message>
    <PButton label="Reintentar" icon="pi pi-refresh" @click="listarUsuarios" />
  </div>

  <div v-else-if="usuarios.length === 0" class="state-container">
    <Message severity="info">No hay usuarios para mostrar.</Message>
  </div>

  <div v-else class="user-grid">
    <Card v-for="usuario in usuarios" :key="usuario.id" class="user-card">
      <template #content>
        <div class="user-card-body">
          <Avatar :image="avatarSrc(usuario)" size="xlarge" shape="circle" />
          <div class="user-info">
            <h3>{{ usuario.first_name }} {{ usuario.last_name }}</h3>
            <p>{{ usuario.email }}</p>
          </div>
        </div>
        <div class="user-actions">
          <router-link :to="{ name: 'editar', params: { id: usuario.id } }">
            <PButton label="Modificar" icon="pi pi-pencil" severity="warn" />
          </router-link>
          <PButton label="Eliminar" icon="pi pi-trash" severity="danger" @click="confirmarEliminar(usuario.id)" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Card from 'primevue/card';
import Avatar from 'primevue/avatar';
import PButton from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import Message from 'primevue/message';
import { getAvatarUrl } from '../config/axios';

const DEFAULT_AVATAR = 'https://www.w3schools.com/howto/img_avatar.png';

export default {
  components: { Card, Avatar, PButton, ProgressSpinner, Message },
  computed: {
    ...mapState(['usuarios', 'loading', 'loadError']),
  },
  methods: {
    ...mapActions(['eliminarUsuario', 'listarUsuarios']),
    avatarSrc(usuario) {
      return usuario.avatar ? getAvatarUrl(usuario.avatar) : DEFAULT_AVATAR;
    },
    confirmarEliminar(id) {
      this.$confirm.require({
        header: 'Confirmar',
        message: '¿Esta seguro de querer eliminar el registro?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Confirmar',
        rejectLabel: 'Cancelar',
        accept: () => {
          this.eliminarUsuario(id)
            .then(() => {
              this.$toast.add({ severity: 'success', summary: 'Usuario eliminado con éxito.', life: 1500 });
            })
            .catch(() => {
              this.$toast.add({ severity: 'error', summary: 'No se ha podido eliminar el usuario.' });
            });
        },
      });
    },
  },
};
</script>

<style scoped>
.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}

.user-card-body {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info h3 {
  margin: 0;
  font-size: 1.05rem;
}

.user-info p {
  margin: 0.25rem 0 0;
  color: var(--p-text-muted-color);
  font-size: 0.9rem;
}

.user-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}

.state-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem 1rem;
  text-align: center;
}
</style>
