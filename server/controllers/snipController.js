const db = require('../models/snipDB.js');
const snipController = {};

snipController.addSnip = async (req, res, next) => {
  try {
    const { folderID, snippet } = req.body;
    const userID = req.session.userID;
    const params = [folderID, userID, snippet];
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
    const { folderID } = req.params;
    const text = 'SELECT * FROM snippets WHERE folder_id = ($1)';
    const retrievedSnips = await db.query(text, [folderID]);
    res.locals.allSnips = retrievedSnips['rows'];
    return next();
  } catch (e) {
    return next({ message: 'Error in GET Snip Middleware ', e });
  }
};

snipController.deleteSnip = async (req, res, next) => {
  try {
    const { snipIDs } = req.body;
    if (!snipIDs || snipIDs.length === 0)
      throw { message: 'No snips provided' };
    const params = [snipIDs];

    const text = `
    WITH deleted_snips AS (
      DELETE FROM snippets WHERE id = ANY($1) RETURNING id, folder_id
    )
    SELECT * FROM snippets 
    WHERE folder_id IN (SELECT folder_id FROM deleted_snips)
      AND id NOT IN (SELECT id FROM deleted_snips);
    
  `;

    const remainingSnips = await db.query(text, params);
    res.locals.remainingSnips = remainingSnips.rows;
    return next();
  } catch (e) {
    return next({ message: 'Error in Delete Snip Middleware', e });
  }
};

snipController.moveSnip = async (req, res, next) => {
  try {
    const { snipIDs, newFolderID, folderID } = req.body;
    if (!snipIDs || snipIDs.length === 0 || !newFolderID)
      throw { message: 'Invalid data provided to relocate the snippet' };

    const text = `
      WITH moved_snips AS (
        UPDATE snippets SET folder_id = $2 WHERE id = ANY($1) RETURNING *
      ),
      remaining_snips AS (
        SELECT * FROM snippets WHERE folder_id = $3 AND id NOT IN (SELECT id FROM moved_snips)
      )
      SELECT * FROM remaining_snips;
    `;

    const params = [snipIDs, newFolderID, folderID];
    const remainingSnips = await db.query(text, params);

    res.locals.remainingSnips = remainingSnips.rows;
    return next();
  } catch (e) {
    return next({ message: 'Error in Move Snip Middleware', e });
  }
};
module.exports = snipController;
