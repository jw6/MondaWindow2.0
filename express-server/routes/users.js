<<<<<<< HEAD
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../routes/database');

// User Schema
const UserSchema = mongoose.Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    require: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.export.getUserByUsername = function(username, callback) {
  const query = { username: username}
  User.findOne(query, callback);
}

module.export.addUser = function(newUser, callback) {
  bcrypt.getSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.export.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  })
}
=======
const express  = require('express');
const router   = express.Router();
const passport = require('passport');
const jwt      = require('jsonwebtoken');
const config   = require('../config/database');

const User = require('../models/user');
//Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name:     req.body.name,
    email:    req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, msg: 'Failed to register user'});
    } else {
      res.json({success: true, msg: 'User registered'});
    }
  });
});

//Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) {
      throw err;
    }

    if(!user){
      return res.json({success: true, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;

      if(isMatch) {
        // const token = jwt.sign(user, config.secret, {
        //   expiresIn: 604800 // 1 week
        // });
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id:       user._id,
            name:     user.name,
            username: user.username,
            email:    user.email
          }
        });
      } else {
        return res.json({success: false, msg: "Wrong password"});
      }
    }); 
  }); 
});

//Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;
>>>>>>> develop
