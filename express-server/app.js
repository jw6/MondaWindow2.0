const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const cors       = require('cors');
const passport   = require('passport');
const mongoose   = require('mongoose');
const config     = require('config');

// Connect to database
mongoose.connect(config.database);

mongoose.connect.on('error', (err) => {
  console.log('database error ' + config.database);
});

const app = express();