module.exports = {
  getSamples: (req, res) => {
    const db = req.app.get("db");
    db.getSamples().then(data => {
      res.status(200).send(data);
    });
  }
};
