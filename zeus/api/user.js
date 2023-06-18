if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const router = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const initPassport = require('../passport-config');
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');

const {
  users,
  badges,
  ships,
  ranks,
  linkbadges,
  linkships,
  linkranks,
} = require('../import/prismaclient.js');

const middleware = require('../import/middleware.js');
const { app } = require('../import/app');

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

initPassport(passport, users);

router.get('/', (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.send(null);
  }
});

router.post('/register', middleware.checkNotAuth, async (req, res) => {
  try {
    const { name, email, pwd, pwd2 } = req.body;

    if (pwd === pwd2) {
      const hashpwd = await bcrypt.hash(pwd, 10);
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

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

module.exports = router;
