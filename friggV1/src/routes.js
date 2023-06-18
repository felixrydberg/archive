import home from "./pages/home.vue";
import joinus from "./pages/joinus.vue";
import about from "./pages/about.vue";
import login from "./pages/login.vue";
import register from "./pages/register.vue";
import profile from "./pages/profile.vue";

import notAuth from "./middleware/notAuth";
import auth from "./middleware/auth";

const routes = [
  { path: "/", component: home, meta: {}, name: 'home' },
  { path: "/join-us", component: joinus, meta: {}, name: 'joinus'  },
  { path: "/about", component: about, meta: {}, name: 'about'  },
  { path: "/login", component: login, meta: {middleware: notAuth}, name: 'login'  },
  { path: "/register", component: register, meta: {middleware: notAuth}, name: 'register'  },
  { path: "/profile", component: profile, meta: {middleware: auth}, name: 'profile'  },
];

export default routes;
