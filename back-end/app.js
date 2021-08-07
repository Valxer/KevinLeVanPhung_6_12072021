const express = require('express');             // framework used to launch the app
const bodyParser = require('body-parser');      // used to be able to read and use the body of a request
const mongoose = require('mongoose');           // enables the connection to our DataBase
const path = require('path');                   // gives the app the location of the current directory
const helmet = require('helmet');               // used to protect our app against X-XSS attacks and protects against some vulnerabilities (like click-jacking attack)

const sauceRoutes = require('./routes/sauce');  
const userRoutes = require('./routes/user');

// allows us to use environment variables set in the .env file that we normally won't put on github
require('dotenv').config();

// connecting us to our mongodb database
mongoose.connect(process.env.MONGOOSE_ID,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// launches the app
const app = express();

app.use(helmet());

// Middleware allowing all users to make request and defining what kind of request is allowed
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

// allows us to load the images in the "images" directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// routers used for all API requests
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;