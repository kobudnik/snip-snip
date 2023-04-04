const db = require('../models/snipDB.js');
const sessionController = {};
const bcrypt = require('bcrypt');

sessionController.veryifyUser = async (req, res, next) => {
  console.log('here');
  try {
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
      req.session.id = user.id;
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

module.exports = sessionController;
