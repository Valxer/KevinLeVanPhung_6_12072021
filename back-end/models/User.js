const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');   // mongoose plugin used to garantee the unicity of a mail address in the database

// user model used in database
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);