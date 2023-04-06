const db = require('../models/snipDB.js');

const folderController = {};

folderController.addFolder = async (req, res, next) => {
  try {
    // const params = [req.body.folderID, req.body.userID, req.body.snippet];
    if (!req.body.folderName) throw { message: 'No folder name provided' };
    const params = [req.session.userID, req.body.folderName];
    const text =
      'INSERT INTO folders (user_id, name) VALUES ($1, $2) RETURNING *';

    const insertQuery = await db.query(text, params);
    res.locals.folders = insertQuery.rows[0];
    return next();
  } catch (e) {
    return next({ message: 'Error in Add Folder Middleware', e });
  }
};

folderController.getAllFolders = async (req, res, next) => {
  try {
    // const params = [req.body.folderID, req.body.userID, req.body.snippet];
    const params = [req.session.userID];
    const text = 'SELECT * FROM folders WHERE user_id = ($1)';
    const retrieveQuery = await db.query(text, params);
    res.locals.allFolders = retrieveQuery.rows;
    return next();
  } catch (e) {
    console.log('error in get all folders');
    return next({ message: 'Error in Add Folder Middleware', e });
  }
};
folderController.deleteFolders = async (req, res, next) => {
  try {
    const ids = req.body.ids;
    const text = `
  WITH deleted_rows AS (
    DELETE FROM folders WHERE id = ANY($1) RETURNING *
  )
  SELECT * FROM folders WHERE NOT EXISTS (
    SELECT 1 FROM deleted_rows WHERE folders.id = deleted_rows.id
  )
`;
    const deleteQuery = await db.query(text, [ids]);
    res.locals.remainingFolders = deleteQuery.rows;
    return next();
  } catch (e) {
    console.log(e, 'this is a postman err');
    return next({ message: e.message });
  }
};

//  'DELETE FROM folders WHERE  (folder_id, user_id, snippet) VALUES ($1, $2, $3) RETURNING *';

module.exports = folderController;
