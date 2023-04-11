const db = require('../models/snipDB.js');

const userController = {};

userController.checkExists = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    //check for invalid credentials here so we don't make unnecessary calls to the db, even though we don't use these vars til next middleware
    if (!(username && password && email)) {
      throw { message: 'Missing credentials' };
    }
    const params = [username];
    const text = 'SELECT * FROM users WHERE username = ($1)';
    const { rows } = await db.query(text, params);
    if (rows.length > 0) {
      throw {
        message: 'Username already exists;',
      };
    } else {
      return next();
    }
  } catch (e) {
    return next({
      log: 'Error in checkUser Middleware',
      message: e.message,
    });
  }
};

userController.addUser = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const password = res.locals.hashPW;
    const params = [username, password, email];
    const text =
      'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await db.query(text, params);
    res.locals.newUser = rows;
    return next();
  } catch (e) {
    return next({
      log: 'Error in Add User Middleware',
      message: e.message,
    });
  }
};

userController.logoutUser = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        throw { message: err.message };
      }
      return next();
    });
  } catch (e) {
    return next({ message: e.message });
  }
};

module.exports = userController;
