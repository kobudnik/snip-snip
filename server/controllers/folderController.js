const db = require('../models/snipDB.js');

const folderController = {};

folderController.addFolder = async (req, res, next) => {
  try {
    // const params = [req.body.folderID, req.body.userID, req.body.snippet];
    if (!req.body.folderName) throw { message: 'No folder name provided' };
    const params = [req.session.userID, req.body.folderName];
    const text =
      'INSERT INTO folders (user_id, name) VALUES ($1, $2) RETURNING *';

    const inserted = await db.query(text, params);
    res.locals.folders = inserted.rows[0];
    console.log(res.locals.folders);
    return next();
  } catch (e) {
    return next({ message: 'Error in Add Folder Middleware', e });
  }
};
//  'DELETE FROM folders WHERE  (folder_id, user_id, snippet) VALUES ($1, $2, $3) RETURNING *';

module.exports = folderController;
