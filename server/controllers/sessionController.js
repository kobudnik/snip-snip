const db = require('../models/snipDB.js');
const sessionController = {};
const bcrypt = require('bcrypt');

sessionController.veryifyUser = async (req, res, next) => {
  try {
    console.log('in verify user');
    const { username, password } = req.body;
    if (!(username && password)) {
      throw { message: 'Missing credentials' };
    }

    const text = `SELECT * FROM users WHERE username = ($1)`;
    const query = await db.query(text, [username]);

    const user = query.rows[0];
    const hashPass = user.password;
    const decrypt = await bcrypt.compare(password, hashPass);

    if (decrypt) {
      req.session.userID = user.id;
      req.session.username = user.username;
      res.locals.username = username;
      return next();
    } else {
      throw { message: 'Passwords do not match' };
    }
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
      throw { message: 'No valid session' };
    } else {
      return next();
    }
  } catch (e) {
    return next({ message: e.message });
  }
};

module.exports = sessionController;
