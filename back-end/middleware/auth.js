const jwt = require('jsonwebtoken');    // package for using authentification tokens
require('dotenv').config();             //allows us to use environment variables

module.exports = (req,res, next) => {
    try {
        const cryptedToken = req.headers.authorization.split(' ')[1];           // reads the token from headers
        const decryptedToken = jwt.verify(cryptedToken, process.env.TOKEN);     // uses the key to decrypt the token
        const userId = decryptedToken.userId;                                   // reads the userId from the decripted token
        if (req.body.userId && req.body.userId !== userId) {                    // checks if the user has the right token to the request
            throw 'User ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(403).json({ error: error | 'Unauthorized request.' });
    }
};