const db = require('../models/snipDB.js');

const folderController = {};

folderController.addFolder = async (req, res, next) => {
  try {
    // const params = [req.body.folderID, req.body.userID, req.body.snippet];
    if (!req.body.folder_name) throw { message: 'No folder name provided' };
    const params = [req.session.user_id, req.body.folder_name];
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
    const params = [req.session.user_id];
    const text = 'SELECT * FROM folders WHERE user_id = ($1)';
    const retrieveQuery = await db.query(text, params);
    res.locals.allFolders = retrieveQuery.rows;
    return next();
  } catch (e) {
    console.log('error in get all folders');
    return next({ message: 'Error in Add Folder Middleware', e });
  }
};
folderController.deleteFolder = async (req, res, next) => {
  try {
    const { folder_id } = req.body;
    if (!folder_id || typeof folder_id !== 'number') {
      throw { message: 'Improper folder id provided' };
    }

    const params = [folder_id, req.session.user_id];
    const text = `
    WITH deleted_rows AS (
      DELETE FROM folders WHERE id = ($1) AND name != 'default' RETURNING *
    )
    SELECT * FROM folders WHERE NOT EXISTS (
      SELECT 1 FROM deleted_rows WHERE folders.id = deleted_rows.id
    ) AND user_id = ($2);
`;
    const deleteQuery = await db.query(text, params);
    res.locals.remaining_folders = deleteQuery.rows;
    return next();
  } catch (e) {
    console.log(e.message);
    return next({ message: e.message });
  }
};

//  'DELETE FROM folders WHERE  (folder_id, user_id, snippet) VALUES ($1, $2, $3) RETURNING *';

module.exports = folderController;
