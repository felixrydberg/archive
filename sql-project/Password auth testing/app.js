// Variable Declaration

const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const port = 3000;
const app = express();

// Static Source

app.use(express.static('src'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// db Start

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ragnarok',
});

db.connect((error) => {
  if (error) {
    console.log(`MySQL Error: ${error}`);
  } else {
    console.log(`MySQL`);
  }
});

// Routes

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});

app.listen(port, () => {
  console.log(`Running on ${port}`);
});

const users = [];

db.query('SELECT * FROM test', function (err, result, fields) {
  if (err) {
    throw err;
  } else {
    result.forEach((post) => {
      users.push(post);
    });
  }
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', async (req, res) => {
  try {
    const hashpwd = await bcrypt.hash(req.body.password, 10);
    const user = {
      id: req.body.id,
      name: req.body.name,
      mail: req.body.mail,
      pwd: hashpwd,
    };

    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.post('/users/login', async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
  console.log(req.body.name);
  if (user == null) {
    console.log('User doesnt exist');
    return res.status(400).send('User and password doesnt match');
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      console.log('Success');
      res.send('Success');
    } else {
      console.log('not allowed');
      res.send('Not allowed');
    }
  } catch {
    console.log('Error');
    res.status(500).send();
  }
});
