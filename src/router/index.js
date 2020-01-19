import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  // NOTE: Handle catch all with NotFound component?
  // {
  //   path: '*',
  //   component: NotFound,
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// NOTE: handle unhandled routes and redirects to home
// router.replace({ path: '/', redirect: '/' });

export default router;
