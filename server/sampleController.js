module.exports = {
  getSamples: (req, res) => {
    const db = req.app.get("db");
    db.getSamples().then(data => {
      res.status(200).send(data);
    });
  },
  getSample: async (req, res) => {
    const sample_id = req.query.id;
    const db = req.app.get("db");
    try {
      await db.getSample({ sample_id }).then(data => {
        res.status(200).send(data);
      });
    } catch (err) {
      res.sendStatus(500);
    }
  }
};
