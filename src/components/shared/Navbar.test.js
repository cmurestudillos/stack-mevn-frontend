import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import PrimeVue from 'primevue/config';
import { describe, expect, it } from 'vitest';
import Navbar from './Navbar.vue';

describe('Navbar', () => {
  it('renders the navigation links', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', name: 'home', component: { template: '<div />' } },
        { path: '/agregar', name: 'agregar', component: { template: '<div />' } },
      ],
    });

    const wrapper = mount(Navbar, {
      global: {
        plugins: [router, PrimeVue],
      },
    });

    await router.isReady();

    expect(wrapper.text()).toContain('Inicio');
    expect(wrapper.text()).toContain('Añadir');
  });
});
