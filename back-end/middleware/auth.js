const jwt = require('jsonwebtoken');

module.exports = (req,res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'Si0Ma_e4erXeoqq_3ivtX11b8ZF_MSJN1');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Invalid request !' });
    }
};