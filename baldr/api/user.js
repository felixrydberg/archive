import SESSION_SECRET from 'dotenv';

import express from 'express';
import { Router } from 'express';
const router = Router();
import { app } from '../import/app.js';
import { hash } from 'bcrypt';
import passport from 'passport';
import flash from 'express-flash';
import { initPassport } from '../passport-config.js';
import session from 'express-session';
import { users } from '../import/prismaClient.js';
import checkNotAuth from '../import/middleware.js';

app.use(flash());
app.use(
  session({
    secret: SESSION_SECRET.config(),
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

initPassport(passport, users);

router.get('/', (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.send(null);
  }
});

router.post('/register', checkNotAuth, async (req, res) => {
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

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  }),
  (req, res) => {
    res.redirect('/');
  }
);

export default { router };
