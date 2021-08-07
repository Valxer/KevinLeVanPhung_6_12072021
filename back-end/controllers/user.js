const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');                  // for authentification token creation

// for encrypting the mail in the database 
const cryptojs = require('crypto-js');                
const key = cryptojs.enc.Hex.parse(process.env.KEY);
const iv = cryptojs.enc.Hex.parse(process.env.IV);    //using a key and an iv we can make sure we get the same output for the same input (crypting not hashing)

const User = require('../models/User');

// allows us to use environment variables set in the .env file that we normally won't put on github
require('dotenv').config();

// creates a new user if he respects the conditions (unused mail in good format and secured password)
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)      // hashes the password for security reasons
        .then(hash => {                     // uses the hash to create the new user 
        const user = new User({
            email: cryptojs.AES.encrypt(req.body.email, key, { iv: iv }).toString(),  // encrypts the mail address
            password: hash
        });
        user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// allows the user to connect to our website
exports.login = (req, res, next) => {
    User.findOne({ email: cryptojs.AES.encrypt(req.body.email, key, { iv: iv }).toString() })   // searches the database for a user with the given email
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)                                        // compares the given password with the hash registered                    
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                  { userId: user._id },
                  process.env.TOKEN,      // gives the user an authentification token that will be used to ensure he can only do the authorized requests
                  { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};