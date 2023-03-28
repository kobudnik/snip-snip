const bcrypt = require('bcrypt');
const saltRounds = 8;

const hashController = {};

hashController.hashPassword = async (req, res, next) => {
  try {
    await bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) throw { message: err, status: 400 };
        res.locals.hashPW = hash;
        console.log('hashed password', hash);
        return next();
      });
    });
  } catch (e) {
    return next({ message: e.message, status: e.status });
  }
};

module.exports = hashController;
