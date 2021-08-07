const passwordSchema = require("../models/Password");

// uses the password model to determine if the password is secured enough
module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    res
      .status(400)
      .json({
        message:
          "Le mot de passe doit faire entre 8 et 50 caractères et doit comprendre 2 chiffes une minuscule et une majuscule",
      });
  } else {
    next();
  }
};
