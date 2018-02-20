const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const cors       = require('cors');
const passport   = require('passport');
const mongoose   = require('mongoose');
const config     = require('./config/database');

// Connect to database
mongoose.connect(config.database);

mongoose.connection.on('error', (err) => {
  console.log('database error ' + config.database);
});

const app = express();

const users = require('./routes/users');

// const port = 3000;
const port = process.env.PORT || 8080;
app.use(cors());

// Pass incoming request body
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Public folder will contains all static files(js, html, css, json etc)
// Static files are dumped from Angular front end
app.use(express.static(path.join(__dirname, 'public')));

// Basic route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Take care all unauthorized enpoints from nodejs side
app.get('*', (req, res) => {
  res.redirect('/');
});

// Start server
app.listen(port, () => {
  console.log('Server started on port ', + port);
})