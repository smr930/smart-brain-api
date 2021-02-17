require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    },
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('root route: app is working');
});

// signin route
app.post('/signin', (req, res) => {
    signin.handleSignin(req, res, bcrypt, db);
});

// register route
app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt);
});

// user profile route
app.get('/profile/:id', (req, res) => {
    profile.hanleProfileGet(req, res, db);
});

// user image entry route
app.put('/image', (req, res) => {
    image.handleImage(req, res, db);
});

app.post('/imageurl', (req, res) => {
    image.handleImageApi(req, res);
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT || 3000}`);
});

/**
 * /signin -> POST = success/fail
 * /register -> POST = new user
 * /profile/:userid -> GET = user
 * /image -> PUT = updated user content
 */
