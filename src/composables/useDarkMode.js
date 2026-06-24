import { ref } from 'vue';

const STORAGE_KEY = 'app-dark-mode';
const DARK_CLASS = 'app-dark';

const isDark = ref(localStorage.getItem(STORAGE_KEY) === 'true');
document.documentElement.classList.toggle(DARK_CLASS, isDark.value);

export function useDarkMode() {
  function toggleDarkMode() {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle(DARK_CLASS, isDark.value);
    localStorage.setItem(STORAGE_KEY, String(isDark.value));
  }

  return { isDark, toggleDarkMode };
}
