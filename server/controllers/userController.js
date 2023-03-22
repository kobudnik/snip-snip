const db = require('../models/snipData.js');

const userController = {};

userController.addUser = async (req, res, next) => {
  try {
    //for testing
    const params = ['john_doe', 'mypassword', 'john.doe@example.com'];
    // const params = [req.body.Username, req.body.password, req.body.sessionID];
    const text =
      'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await db.query(text, params);
    res.locals.newUser = rows;
    return next();
  } catch (e) {
    return next({ message: 'Error in Add User Middleware' });
  }
};

module.exports = userController;
