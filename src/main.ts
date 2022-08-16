// Ionic Imports
import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

// Vuejs Imports
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { useUser } from './store/user';

// Create App and root store
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

// Refersh User state from local storage
const user = useUser();
user.refresh();

// Load Ionic and Router
app.use(IonicVue);
app.use(router);

// Wait for router to be ready before mounting app
router.isReady().then(() => {
  app.mount('#app');
});
