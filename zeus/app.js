if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const cors = require('cors');

const { app } = require('./import/app');
const middleware = require('./import/middleware');
const {
  users,
  badges,
  ships,
  ranks,
  linkbadges,
  linkships,
  linkranks,
} = require('./import/prismaclient');

const vue = require('vue');
const serverRender = require('vue/server-renderer');

app.use(express.static('.'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(
  cors({
    origin: 'localhost/3000',
  })
);

// Routes

app.use('/api/user', require('./api/user'));

app.get('/', (req, res) => {
  const app = vue.createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`,
  });

  serverRender.renderToString(app).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
        </script>
      </body>
    </html>
    `);
  });
});

app.get('/register', middleware.checkNotAuth, (req, res) => {
  res.render('register.ejs');
});

app.get('/login', middleware.checkNotAuth, (req, res) => {
  res.render('login.ejs');
});

app.listen(5000);

//Functions
