import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { useUser } from '../store/user';

// Import Views (lazy load)
const Home = () => import('@views/common/HomeView.vue');
const Login = () => import('@views/common/LoginView.vue');
const MobileBookmarks = () => import('@views/mobile/BookmarksView.vue');
const MobileYou = () => import('@views/mobile/YouView.vue');
const MobileTabs = () => import('@views/mobile/TabsNav.vue');
const WebRoot = () => import('@views/web/BookmarksView.vue');

const routes: Array<RouteRecordRaw> = [
  {
    name: 'Home',
    component: Home,
    path: '/',
    meta: {
      requiresAuth: false
    }
  },
  {
    name: 'Login',
    component: Login,
    path: '/login',
    meta: {
      requiresAuth: false
    }
  },
  {
    name: 'Web',
    component: WebRoot,
    path: '/web',
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'Mobile',
    component: MobileTabs,
    path: '/mobile',
    meta: {
      requiresAuth: true
    },
    children: [
      {
        // default to bookmarks view
        name: 'MobileRoot',
        path: '',
        redirect: '/mobile/bookmarks'
      },
      {
        name: 'MobileBookmarks',
        component: MobileBookmarks,
        path: 'bookmarks'
      },
      {
        name: 'MobileYou',
        component: MobileYou,
        path: 'you'
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to) => {
  const user = useUser();
  if (to.meta.requiresAuth) {
    if (!user.isLoggedIn) {
      return { name: 'Login' };
    } else {
      return true;
    }
  } else {
    return true;
  }
});

// once the router is ready we register the service worker for PWA
router.isReady().then(async () => {
  const { registerSW } = await import('virtual:pwa-register');
  const intervalMS = 60 * 60 * 1000; // 1h

  registerSW({
    immediate: true,
    onRegistered(registered) {
      registered &&
        setInterval(() => {
          registered.update();
        }, intervalMS);
    }
  });
});

export default router;
