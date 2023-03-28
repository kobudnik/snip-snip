const db = require('../models/snipData.js');

const sessionController = {};

sessionController.veryifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      return next({ message: 'Missing credentials' });
    }

    const params = [username];
    const text = `SELECT * FROM users WHERE username = $(1)`;
    const query = await db.query(text, params);
    const user = query.rows[0];
    const hashPass = user.password;
    if (bcrypt.compare(password, hashPass)) {
      return next();
    } else {
      return next({ message: 'Passwords do not match' });
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
