import { createStore } from 'vuex';
import router from '../router/index';
// Peticiones HTTP
import clienteAxios from '../config/axios';

export default createStore({
  state: {
    usuarios: [],
    usuario: { email: '', first_name: '', last_name: '', avatar: '' },
    loading: false,
    loadError: false,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setLoadError(state, payload) {
      state.loadError = payload;
    },
    setUsuarios(state, payload) {
      state.usuarios = payload;
    },
    setUsuario(state, payload) {
      state.usuario = payload;
    },
    setNuevoUsuario(state, payload) {
      state.usuarios.push(payload);
    },
    setActualizarUsuario(state, payload) {
      state.usuarios = state.usuarios.map(item => (item.id === payload.id ? payload : item));
    },
    eliminar(state, payload) {
      state.usuarios = state.usuarios.filter(item => item.id !== payload);
    },
  },
  actions: {
    listarUsuarios({ commit }) {
      commit('setLoading', true);
      commit('setLoadError', false);
      return clienteAxios
        .get('/api/usuarios')
        .then(res => {
          commit('setUsuarios', res.data.data);
          commit('setLoading', false);
        })
        .catch(e => {
          console.error(e.response ?? e);
          commit('setLoading', false);
          commit('setLoadError', true);
        });
    },
    obtenerUsuarioById({ commit }, id) {
      return clienteAxios
        .get(`/api/usuarios/${id}`)
        .then(res => {
          commit('setUsuario', res.data.data);
        })
        .catch(e => {
          console.error(e.response ?? e);
        });
    },
    // Las acciones de escritura devuelven la promesa de axios para que el componente
    // que las invoca pueda mostrar el toast de éxito/error correspondiente.
    agregarUsuario({ commit }, usuario) {
      return clienteAxios.post('/api/usuarios', usuario).then(res => {
        commit('setNuevoUsuario', res.data);
        router.push('/');
      });
    },
    modificarUsuario({ commit }, usuario) {
      return clienteAxios.put(`/api/usuarios/${usuario.id}`, usuario).then(() => {
        commit('setActualizarUsuario', usuario);
        router.push('/');
      });
    },
    eliminarUsuario({ commit }, id) {
      return clienteAxios.delete(`/api/usuarios/${id}`).then(() => {
        commit('eliminar', id);
      });
    },
    cancelarAccion() {
      router.push('/');
    },
  },
  modules: {},
});
