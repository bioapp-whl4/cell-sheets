module.exports = {
  getFreezers: (req, res) => {
    const db = req.app.get("db");
    db.getFreezers().then(data => {
      res.status(200).send(data);
    });
  },
  getFreezer: async (req, res) => {
    const db = req.app.get("db");
    const freezer_id = parseInt(req.query.id);
    try {
      const data = await db.getFreezer({ freezer_id });
      res.status(200).send(data);
    } catch (err) {
      res.sendStatus(500);
    }
  },
  getCanesByFID: async (req, res) => {
    const db = req.app.get("db");
    const freezer_id = parseInt(req.query.id);
    try {
      const data = await db.getCanesByFreezerId({ freezer_id });
      res.status(200).send(data);
    } catch (err) {
      console.sendStatus(500);
    }
  }
};
