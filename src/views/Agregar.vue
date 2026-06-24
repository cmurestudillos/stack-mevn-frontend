<template>
  <Card class="form-card">
    <template #title>Añadir nuevo usuario</template>
    <template #content>
      <form class="app-form" @submit.prevent="onSubmit">
        <FloatLabel variant="on" class="field">
          <InputText id="email" v-model="usuario.email" type="email" class="w-full" />
          <label for="email">Email</label>
        </FloatLabel>

        <FloatLabel variant="on" class="field">
          <InputText id="first_name" v-model="usuario.first_name" class="w-full" />
          <label for="first_name">First Name</label>
        </FloatLabel>

        <FloatLabel variant="on" class="field">
          <InputText id="last_name" v-model="usuario.last_name" class="w-full" />
          <label for="last_name">Last Name</label>
        </FloatLabel>

        <div class="form-actions">
          <PButton type="submit" label="Confirmar" />
          <PButton type="button" label="Cancelar" severity="secondary" outlined @click="cancelarAccion()" />
        </div>
      </form>
    </template>
  </Card>
</template>

<script>
// Propiedades de Vuex
import { mapActions } from 'vuex';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import PButton from 'primevue/button';

export default {
  components: { Card, InputText, FloatLabel, PButton },
  data() {
    return {
      usuario: {
        email: '',
        first_name: '',
        last_name: '',
      },
    };
  },
  methods: {
    ...mapActions(['agregarUsuario', 'cancelarAccion']),
    onSubmit() {
      this.$confirm.require({
        header: 'Confirmar',
        message: '¿Generar nuevo registro?',
        icon: 'pi pi-question-circle',
        acceptLabel: 'Confirmar',
        rejectLabel: 'Cancelar',
        accept: () => {
          this.agregarUsuario(this.usuario)
            .then(() => {
              this.$toast.add({ severity: 'success', summary: 'Usuario creado con éxito.', life: 1500 });
            })
            .catch(() => {
              this.$toast.add({ severity: 'error', summary: 'No se ha podido crear el usuario.' });
            });
        },
      });
    },
  },
};
</script>

<style scoped>
.form-card {
  max-width: 480px;
  margin: 0 auto;
}

.app-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
</style>
