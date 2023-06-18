import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import store from "./store";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// True === allowed, false === restricted and stay at "to"
router.beforeEach(async (to, from, next) => {
  if (to.meta.middleware) {
    const res = await to.meta.middleware();
    if(res.allowed) return next()
    else {
      store.commit('handleMessage', {
        data: res.message
      })
      return next('/')
    }
  }
  return next();
});

export default router;

const app = createApp(App);

app.use(router).use(store).mount("#app");
