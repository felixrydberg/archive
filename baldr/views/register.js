import { createSSRApp } from 'vue';

export function register() {
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
        <form method="post" action="/api/user/register">
            <input type="text" name="name" placeholder="name">
            <input type="email" name="email" placeholder="email">
            <input type="password" name="pwd" placeholder="pwd">
            <input type="password" name="pwd" placeholder="repeat pwd">
            <button type="submit" name>Register</button>
        </form>
    </main>
  `,
    methods: {},
    components: {},
    props: {
      logged: Boolean,
    },
  });
}
