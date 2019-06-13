module.exports = {
  addBox: async (req, res) => {
    const { name, cane_id } = req.body;

    const db = req.app.get("db");
    try {
      await db.addBox({
        name,
        cane_id
      });
      res.sendStatus(200); //send data for web visual of cart ?
    } catch (err) {
      res.sendStatus(500);
    }
  },
  addCane: async (req, res) => {
    const { name, freezer_id } = req.body;

    const db = req.app.get("db");
    try {
      await db.addCane({
        name,
        freezer_id
      });
      res.sendStatus(200); //send data for web visual of cart ?
    } catch (err) {
      res.sendStatus(500);
    }
  },
  addFreezer: async (req, res) => {
    const { name, temp, lab_id } = req.body;

    const db = req.app.get("db");
    try {
      await db.addFreezer({
        name,
        temp,
        lab_id
      });
      res.sendStatus(200); //send data for web visual of cart ?
    } catch (err) {
      res.sendStatus(500);
    }
  }
};
