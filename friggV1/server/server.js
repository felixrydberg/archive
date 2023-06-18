const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const env = require('dotenv').config()

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
const maxAge = 1000 * 60 * 60;
app.use(session({
    name: 'frigg', 
    secret: process.env.SECRET,
    cookie: {
        httpOnly: true,
        maxAge: maxAge,
        secret: process.env.SECRET,
        secure: false, // SET TO TRUE FOR PROD
    },
    resave: false,
    saveUninitialized: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const authenticateRouter = require('./router/authenticate');
const restrictedMiddleware = require('./router/restricted-middleware');
const userRouter = require('./router/user');
const shipsRouter = require('./router/ships');

app.use('/api/authenticate', authenticateRouter);
app.use('/api/user', userRouter);

const port = process.env.PORT;

app.listen(port, (err) => {
    if(err) return console.log(err);
    console.log(`Server running on: ${port}`)
});

module.exports = app;