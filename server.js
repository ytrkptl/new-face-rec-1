const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');
const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const auth = require('./controllers/authorization');
const signout = require('./controllers/signout');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// for using locally and connecting to pgAdmin as well
// as for making calls to heroku postgres from server
const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  });
}

app.listen(port, error => {
  if (error) throw error;
  console.log(`Server is running on port ${process.env.PORT}`)
});

app.get('/favicon.ico', (req, res) => res.status(204));
app.get('/', (req, res) => {res.send(`The server is running on port ${process.env.PORT}`)});
app.post('/signin', signin.signinAuthentication(db, bcrypt))
app.post('/register', register.registerAuthentication(db, bcrypt))
// app.post('/forgot', forgot.registerAuthentication(db, bcrypt))
app.get('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileGet(req, res, db) })
app.post('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileUpdate(req, res, db)})
app.post('/upload/:id', auth.requireAuth, (req, res) => { profile.handleProfilePhoto(req, res, db)})
app.put(('/image'), auth.requireAuth, (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', auth.requireAuth, (req, res) => { image.handleApiCall(req, res) })
app.delete('/signout', (req, res) => {signout.removeAuthToken(req, res)})
