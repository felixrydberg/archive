if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const mysql = require('mysql');
const cors = require('cors');
const XMLHttpRequest = require('xhr2');

const initPassport = require('./passport-config');
const { application } = require('express');
initPassport(passport, );

const app = express();

//App config

app.set('view-engine', 'ejs');
app.use(express.static('views'));
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

// Database

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

// Routes

//GET

app.get('/', async (req, res) => {
  res.render('index.ejs', {
    logged: false,
    user: false,
  });
});

app.get('/about-us', (req, res) => {
  if (req.user) {
    res.render('aboutus.ejs', { logged: true, user: req.user });
  } else {
    res.render('aboutus.ejs', { logged: false, user: false });
  }
});
app.get('/join-us', (req, res) => {
  if (req.user) {
    res.render('joinus.ejs', { logged: true, user: req.user });
  } else {
    res.render('joinus.ejs', { logged: false, user: false });
  }
});
app.get('/our-fleet', (req, res) => {
  if (req.user) {
    res.render('ourfleet.ejs', { logged: true, user: req.user });
  } else {
    res.render('ourfleet.ejs', { logged: false, user: false });
  }
});

app.get('/login', checkNotAuth, (req, res) => {
  if (req.user) {
    res.render('login.ejs', { logged: true, user: req.user });
  } else {
    res.render('login.ejs', { logged: false, user: false });
  }
});

app.get('/profile', checkAuth, (req, res) => {
  if (req.user) {
    res.render('profile.ejs', { logged: true, user: req.user });
  } else {
    res.render('profile.ejs', { logged: false, user: false });
  }
});

app.get('/register', checkNotAuth, (req, res) => {
  if (req.user) {
    res.render('register.ejs', { logged: true, user: req.user });
  } else {
    res.render('register.ejs', { logged: false, user: false });
  }
});

app.get('/admin', checkAuth, checkAdmin, (req, res) => {
  if (req.user) {
    res.render('admin.ejs', { logged: true, user: req.user });
  }
});

// POST

app.post(
  '/login',
  checkNotAuth,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

app.post('/register', checkNotAuth, async (req, res) => {
  try {
    const hashpwd = await bcrypt.hash(req.body.pwd, 10);
    const user = {
      name: req.body.name,
      mail: req.body.email,
      pwd: await hashpwd,
    };

    const name = await getUsers('name', req.body.name);
    const mail = await getUsers('mail', req.body.email);

    if (name === 'nametaken') {
      res.redirect({ message: 'Username taken' }, '/register');
    } else if (mail === 'mailtaken') {
      res.redirect({ message: 'Mail already in use' }, '/register');
    } else {
      insertUser('users', user);
      res.redirect('/login');
    }
  } catch {
    res.redirect({ message: 'An error has accured' }, '/register');
  }
});

// Profile

app.post('/addship', checkAuth, (req, res) => {
  db.query(
    'INSERT INTO linkships(userID, shipID) VALUES (?,?)',
    [req.user[0].userID, req.body.id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200);
      res.send('Done');
    }
  );
});

app.post('/userships', checkAuth, (req, res) => {
  db.query(
    'SELECT * from ships where name REGEXP ? ORDER BY manufacturer',
    [req.body.name],
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
});

app.post('/getuserfleet', checkAuth, (req, res) => {
  db.query(
    'SELECT linkships.linkID, ships.shipID, ships.manufacturer, ships.name, ships.career, ships.focus , ships.class, ships.size FROM ships JOIN linkships ON linkships.shipID = ships.shipID WHERE linkships.userID = ?;',
    [req.user[0].userID],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post('/getuserbadges', checkAuth, (req, res) => {
  db.query(
    'SELECT badges.badgeID, badges.badgename, badges.badgetype FROM badges JOIN linkbadges ON badges.badgeID = linkbadges.badgeID JOIN users ON users.userID = linkbadges.userID WHERE users.userID = ?;',
    [req.user[0].userID],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post('/removeusership', checkAuth, (req, res) => {
  db.query(
    'DELETE FROM linkships WHERE linkID = ?',
    [req.body.id],
    (err, result) => {
      if (err) throw err;
      res.status(200);
      res.send('Done');
    }
  );
});

app.post('/getorgfleet', (req, res) => {
  db.query(
    'SELECT users.name AS username, ships.shipID, ships.manufacturer, ships.name, ships.career, ships.focus , ships.class, ships.size FROM ships JOIN linkships ON linkships.shipID = ships.shipID JOIN users ON linkships.userID = users.userID WHERE users.org = 1;',
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

//Admin stuff

app.get('/updateships', checkAuth, checkAdmin, (req, res) => {
  const url =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQiBixWaiTTbWtlZ5l9HVS9Lb9jSK9K5YkKFPSX0KEHTa1sZhfze99sajP4e0SEcxadbwnWsO2Nvd-A/pub?gid=0&single=true&output=csv';

  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      updateships(xhttp.response);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();

  const updateships = (csv) => {
    const data = csvToArray(csv);

    db.query('CALL update_ships', (err, result) => {
      if (err) {
        throw err;
      }
    });

    data.forEach((row) => {
      db.query(
        'Insert INTO ships(shipID, manufacturer, name, career, focus, class, size) VALUES (?,?,?,?,?,?,?)',
        [
          row.ID,
          row.Manufacturer,
          row.Name,
          row.Career,
          row.Focus,
          row.Class,
          row.Size,
        ],
        (err, result) => {
          if (err) {
            throw err;
          }
        }
      );
    });
  };

  res.status(200);
  res.send('Ships updated');
});

app.post('/getships', checkAuth, checkAdmin, (req, res) => {
  const sql = 'SELECT * FROM ships';

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/getbadges', checkAuth, checkAdmin, (req, res) => {
  const sql = 'SELECT * FROM badges';

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/getranks', checkAuth, checkAdmin, (req, res) => {
  const sql = 'SELECT * FROM ranks';

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/getlinkships', checkAuth, checkAdmin, (req, res) => {
  const sql = 'SELECT * FROM linkships';

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/getlinkbadges', checkAuth, checkAdmin, (req, res) => {
  const sql = 'SELECT * FROM linkbadges';

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/getlinkranks', checkAuth, checkAdmin, (req, res) => {
  const sql = 'SELECT * FROM linkranks';

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/removerow', checkAuth, checkAdmin, (req, res) => {
  const sql = `DELETE FROM ? where ${name}ID = ?`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/updatebadge', checkAuth, checkAdmin, (req, res) => {
  const sql = `UPDATE badges SET badgename = ?, badgetype = ? where badgeID = ?`;
  db.query(sql, [req.body.name, req.body.type, req.body.id], (err, result) => {
    if (err) throw err;
    res.send('Updated');
  });
});

app.post('/insertships', checkAuth, checkAdmin, (req, res) => {
  const sql = `INSERT INTO ? VALUES (?)`;
  db.query(sql, [req.body.table, []]);
});

app.post('/insertranks', checkAuth, checkAdmin, (req, res) => {
  const sql = `INSERT INTO ? VALUES (?)`;
  db.query(sql, [req.body.table, []]);
});

app.post('/insertbadges', checkAuth, checkAdmin, (req, res) => {
  const sql = `INSERT INTO ? VALUES (?)`;
  db.query(sql, [req.body.table, []]);
});

// DELETE

app.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

app.listen(3000);

// Functions

function csvToArray(str, delimiter = ',') {
  const headers = str.slice(0, str.indexOf('\n')).split(delimiter);
  const rows = str.slice(str.indexOf('\n') + 1).split('\n');

  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  return arr;
}

// Middleware

function checkNotAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

function checkAdmin(req, res, next) {
  if (req.user[0].admin !== 1) {
    res.status(401);
    return res.send('Not allowed');
  }

  next();
}

// Db stuff

const insertUser = (table, user) => {
  const sql = `INSERT INTO ${table}(name, mail, pwd) VALUES (?,?,?)`;
  db.query(sql, [user.name, user.mail, user.pwd], (err, result) => {
    if (err) throw err;
  });
};

function getUsers(type, value) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT name, mail FROM users where ${type} = ?`,
      value,
      function (err, result) {
        if (err) reject(err);
        const user = [];
        if (typeof result === undefined) {
          reject('undefined');
        } else if (typeof result !== undefined) {
          result.forEach((post) => {
            if (type === 'name') {
              if (post.name.toLowerCase() === value.toLowerCase()) {
                resolve('nametaken');
              }
            } else if (type === 'mail') {
              if (post.mail.toLowerCase() === value.toLowerCase()) {
                resolve('mailtaken');
              }
            } else {
              user.push(post);
            }
          });
          resolve(user);
        }
      }
    );
  });
}
