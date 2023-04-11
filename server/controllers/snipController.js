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
    const { snip_ids } = req.body;
    if (!snip_ids || snip_ids.length === 0)
      throw { message: 'No snips provided' };
    const params = [snip_ids];

    const text = `
    WITH deleted_snips AS (
      DELETE FROM snippets WHERE id = ANY($1) RETURNING id, folder_id
    )
    SELECT * FROM snippets 
    WHERE folder_id IN (SELECT folder_id FROM deleted_snips)
      AND id NOT IN (SELECT id FROM deleted_snips);
    
  `;

    const remainingSnips = await db.query(text, params);
    console.log(remainingSnips, 'these are the remainders');
    res.locals.remaining_snips = remainingSnips.rows;
    return next();
  } catch (e) {
    return next({ message: 'Error in Delete Snip Middleware', e });
  }
};

snipController.moveSnip = async (req, res, next) => {
  try {
    const { snip_ids, new_folder_id } = req.body;
    if (!snip_ids || snip_ids.length === 0 || !new_folder_id)
      throw { message: 'Invalid data provided to relocate the snippet' };
    const params = [snip_ids, new_folder_id];

    const text = `
    WITH deleted_snips AS (
      DELETE FROM snippets WHERE id = ANY($1) RETURNING id, folder_id
    )
    SELECT * FROM snippets 
    WHERE folder_id IN (SELECT folder_id FROM deleted_snips)
      AND id NOT IN (SELECT id FROM deleted_snips);
    
  `;

    const remainingSnips = await db.query(text, [params]);
    console.log(remainingSnips, 'these are the remainders');
    res.locals.remaining_snips = remainingSnips.rows;
    return next();
  } catch (e) {
    return next({ message: 'Error in Delete Snip Middleware', e });
  }
};

module.exports = snipController;
