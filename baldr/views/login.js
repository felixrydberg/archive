import { createSSRApp } from 'vue';

export function login() {
  return createSSRApp({
    data: () => ({}),
    template: `
        <header>
            <nav>
                <figure class="nav-left">
                <a href="/" class="body-text"> Home </a>
                <a href="/about-us" class="body-text"> About us </a>
                <a href="/join-us" class="body-text"> Join us </a>
                <a href="/our-fleet" class="body-text"> Our Fleet </a>
                </figure>
                <figure class="nav-right">
                <div v-if="logged">
                    <a href="/profile" class="body-text"> Profile </a>
                    <form action="/logout?_method=DELETE" method="post">
                    <button type="submit" class="body-text">Log out</button>
                    </form>
                </div>
                <div v-else>
                    <a href="/login" class="body-text"> Login </a>
                    <a href="/register" class="body-text"> Register </a>
                </div>
                </figure>
            </nav>
        </header>
        <main>
            <form method="post" action="/api/user/login">
                <input type="text" name="name" placeholder="name">
                <input type="password" name="pwd" placeholder="pwd">
                <button type="submit" name>Login</button>
            </form>
        </main>
      `,
    methods: {},
    components: {},
  });
}
