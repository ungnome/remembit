import { useSettings } from '../store/settings';

export function useThemeController() {
  const settings = useSettings();
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function handlePreferredColorChange(event: MediaQueryListEvent) {
    console.log(event);
    document.body.classList.toggle('dark', event.matches);
  }

  function enableSystemTheme() {
    prefersDark.addEventListener('change', handlePreferredColorChange);
  }

  function disableSystemTheme() {
    prefersDark.removeEventListener('change', handlePreferredColorChange);
  }

  function updateTheme() {
    switch (settings.theme) {
      case 'light':
        disableSystemTheme();
        document.body.classList.remove('dark');
        break;
      case 'dark':
        disableSystemTheme();
        document.body.classList.add('dark');
        break;
      case 'system':
        enableSystemTheme();
        document.body.classList.toggle('dark', prefersDark.matches);
        break;
    }
  }

  return {
    updateTheme
  };
}
