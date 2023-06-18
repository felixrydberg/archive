const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, users) {
  const authenticateUser = async (name, pwd, done) => {
    const user = await users.findUnique({
      where: {
        name: name,
      },
    });

    if (user == null) {
      return done(null, false, { message: 'No user found' });
    }
    try {
      if (await bcrypt.compare(pwd, user.pwd)) {
        delete user.pwd;
        return done(null, user);
      } else {
        return done(null, false, { message: 'Pwd didnt match' });
      }
    } catch (err) {
      return done(err);
    }
  };

  passport.use(
    new LocalStrategy(
      { usernameField: 'name', passwordField: 'pwd' },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}

module.exports = initialize;
