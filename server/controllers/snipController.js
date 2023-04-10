const db = require('../models/snipDB.js');
const snipController = {};

snipController.addSnip = async (req, res, next) => {
  try {
    const { folder_id, snippet } = req.body;
    const user_id = req.session.user_id;
    const params = [folder_id, user_id, snippet];
    const text =
      'INSERT INTO snippets (folder_id, user_id, snippet) VALUES ($1, $2, $3) RETURNING *';
    const inserted = await db.query(text, params);
    res.locals.snipSuccess = inserted.rows[0];
    return next();
  } catch (e) {
    return next({ message: 'Error in Add Snip Middleware', e });
  }
};

snipController.getSnips = async (req, res, next) => {
  try {
    const { folder_id } = req.params;
    const text = 'SELECT * FROM snippets WHERE folder_id = ($1)';
    const retrievedSnips = await db.query(text, [folder_id]);
    res.locals.allSnips = retrievedSnips['rows'];
    return next();
  } catch (e) {
    return next({ message: 'Error in GET Snip Middleware ', e });
  }
};

snipController.deleteSnip = async (req, res, next) => {
  try {
    //for testing. will modify to allow for multiple snips to be deleted at any one time later on
    const params = [11];
    const text = 'DELETE FROM snippets WHERE id = ($1) RETURNING *';
    const inserted = await db.query(text, params);
    return next();
  } catch (e) {
    return next({ message: 'Error in Delete Snip Middleware', e });
  }
};

module.exports = snipController;
