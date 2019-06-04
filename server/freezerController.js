module.exports = {
  getFreezers: (req, res) => {
    const db = req.app.get("db");
    db.getFreezers().then(data => {
      res.status(200).send(data);
    });
  }
};
