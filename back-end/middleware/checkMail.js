module.exports = (req, res, next) => {
    const validEmail = (email) => {
        let emailRegex = /^[a-zA-Z0-9À-ÿ!#$%&'*+/=?^_\`{|}~-]+(\.[a-zA-Z0-9À-ÿ!#$%&'*+/=?^_\`{|}~-]+)*@([a-zA-ZÀ-ÿ0-9]+\.)+[a-zA-ZÀ-ÿ0-9]{2,}$/
        let isOk = emailRegex.test(email)
        isOk ? next() : res.status(400).json({ message: 'mail non valide' });
    }
    validEmail(req.body.email)
  };