const db = require('../models/snipData.js');

const userController = {};

userController.addUser = async (req, res, next) => {
  try {
    const params = [req.body.Username, req.body.password, req.body.sessionID];
    const text =
      'INSERT INTO Persons (Username, password, sessionID) VALUES ($1, $2, $3) RETURNING *';
    const inserted = await db.query(text, params);
    res.locals.newUser = inserted;
    return next();
  } catch (e) {
    return next({ message: 'Error in Add User Middleware' });
  }
};

module.exports = userController;
