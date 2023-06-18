import SESSION_SECRET from 'dotenv';

import express, { Router } from 'express';
import { app } from './import/app.js';
import cors from 'cors';
import session from 'express-session';
import flash from 'express-flash';
import { users } from './import/prismaclient.js';
import { hash } from 'bcrypt';
import passport from 'passport';
import checkAdmin from './import/middleware.js';
import checkAuth from './import/middleware.js';
import checkNotAuth from './import/middleware.js';
import { renderToString } from 'vue/server-renderer';

import { register } from './views/register.js';
import { login } from './views/login.js';

const options = {
  origin: 'localhost/3000',
};

app.use(cors(options));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

import router from './api/user.js';
app.use('api/user', router);

//Get

app.get('/', (req, res) => {
  const createapp = button();

  renderToString(createapp).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
        <script type="importmap">
          {
            "imports": {
              "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
            }
          }
        </script>
      </head>
      <body>
        <div id="app">${html}</div>
        <script type="module">
          import { button } from './views.js';
          button().mount('#app');
        </script>
      </body>
    </html>
    `);
  });
});

app.get('/register', (req, res) => {
  const createapp = register({});

  renderToString(createapp).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
        <script type="importmap">
          {
            "imports": {
              "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
            }
          }
        </script>
      </head>
      <body>
        <div id="app">${html}</div>
        <script type="module">
          import { register} from './views.js';
          register().mount('#app');
        </script>
      </body>
    </html>
    `);
  });
});

app.get('/test', (req, res) => {
  let logged = req.user ? true : false;
  res.send(req.user ? true : false);
});

app.get('/login', (req, res) => {
  const createapp = login();

  renderToString(createapp).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
        <script type="importmap">
          {
            "imports": {
              "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
            }
          }
        </script>
      </head>
      <body>
        <div id="app">${html}</div>
        <script type="module">
          import { login } from './views.js';
          login().mount('#app');
        </script>
      </body>
    </html>
    `);
  });
});

// App

app.post('/register', checkNotAuth, async (req, res) => {
  try {
    const { name, email, pwd, pwd2 } = req.body;

    if (pwd === pwd2) {
      const hashpwd = await hash(pwd, 10);
      const user = {
        name: name,
        email: email,
        pwd: hashpwd,
      };

      const username = await users.findUnique({
        where: {
          name: name,
        },
        select: {
          name: true,
        },
      });

      const usermail = await users.findUnique({
        where: {
          email: email,
        },
        select: {
          email: true,
        },
      });

      if (username) {
        console.log('Name exists');
      } else if (usermail) {
        console.log('Email exists');
      } else {
        const newuser = await users.create({
          data: {
            email: user.email,
            name: user.name,
            pwd: user.pwd,
          },
        });
        res.redirect('/');
      }
    } else {
      console.log('pwd not match');
    }
  } catch {
    console.log('catch');
  }
});

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

app.use(express.static('.'));

app.listen(3000, () => {});
