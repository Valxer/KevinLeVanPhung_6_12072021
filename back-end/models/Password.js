const passwordValidator = require('password-validator');    // plugin that allows us to configure a password format

const passwordSchema = new passwordValidator();

// password model used to make sure users have a strong password
passwordSchema
.is().min(8)
.is().max(50)
.has().uppercase()
.has().lowercase()
.has().digits(2)
.has().not().spaces()
.is().not().oneOf(['P4ssw0rd', 'Password123', '123Password']);

module.exports = passwordSchema;