<template>
  <footer class="app-footer">
    <p>
      Copyright © - Designed and Created by:
      <strong>Carlos Mur</strong>
    </p>
    <p>
      <small
        ><i>Version: {{ version }}</i></small
      >
    </p>
  </footer>
</template>

<script>
import packageInfo from '../../../package.json';

export default {
  data() {
    return {
      version: packageInfo.version,
    };
  },
};
</script>

<style scoped>
.app-footer {
  background: var(--p-surface-900);
  color: var(--p-surface-0);
  text-align: center;
  padding: 0.75rem 1rem;
  margin-top: auto;
}

.app-footer a {
  color: inherit;
}

.app-footer p {
  margin: 0.15rem 0;
}
</style>
