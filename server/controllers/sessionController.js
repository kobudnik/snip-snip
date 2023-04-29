const bcrypt = require('bcrypt');
const db = require('../models/snipDB');

const sessionController = {};

sessionController.veryifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      throw new Error('Missing credentials');
    }

    const text = `SELECT * FROM users WHERE username = ($1)`;
    const query = await db.query(text, [username]);

    const user = query.rows[0];
    const hashPass = user.password;
    const decrypt = await bcrypt.compare(password, hashPass);

    if (decrypt) {
      req.session.userID = user.id;
      req.session.username = user.username;
      res.locals.verifiedUser = username;
      return next();
    }
    throw new Error('Passwords do not match');
  } catch (e) {
    return next({
      log: 'Error in veryifyUser Middleware',
      message: e.message,
      status: 401,
    });
  }
};

sessionController.checkSessionStatus = (req, res, next) => {
  try {
    if (!req.body.username || req.body.username !== req.session.username) {
      throw new Error('No valid session');
    } else {
      return next();
    }
  } catch (e) {
    return next({ message: e.message });
  }
};

module.exports = sessionController;
