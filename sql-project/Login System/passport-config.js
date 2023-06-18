const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ragnarok',
});

db.connect((error) => {
  if (error) {
    console.log(`MySQL Error: ${error}`);
  }
});

function login(value) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT userID, name, mail, pwd, org, admin FROM users where name = ?`,
      value,
      function (err, result) {
        if (err) reject(err);
        const user = [];
        if (result.length === 0) {
          resolve('empty');
        } else if (typeof result !== undefined) {
          result.forEach((post) => {
            user.push(post);
          });
          resolve(user);
        }
      }
    );
  });
}

function init(passport) {
  const authenticateUser = async (name, pwd, done) => {
    const user = await login(name);
    if (user === 'empty') {
      return done(null, false, { message: 'User not found' });
    } else {
      try {
        if (pwd) {
          if (await bcrypt.compare(pwd, user[0].pwd)) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'User and pwd didnt match' });
          }
        }
      } catch (e) {
        return done(e);
      }
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'name' }, authenticateUser));

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}

module.exports = init;
