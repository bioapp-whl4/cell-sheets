module.exports = {
  getFreezers: async (req, res) => {
    const db = req.app.get("db");
    try {
      db.getFreezers().then(data => {
        res.status(200).send(data);
      });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
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
      res.sendStatus(500);
    }
  },
  getCane: async (req, res) => {
    const db = req.app.get("db");
    const cane_id = parseInt(req.query.id);
    try {
      const data = await db.getCane({ cane_id });
      res.status(200).send(data);
    } catch (err) {
      res.sendStatus(500);
    }
  },
  getBoxesByCaneId: async (req, res) => {
    const db = req.app.get("db");
    const cid = parseInt(req.query.id);
    try {
      const data = await db.getBoxesByCaneId({ cid });
      res.status(200).send(data);
    } catch (err) {
      res.sendStatus(500);
    }
  },
  getBox: async (req, res) => {
    const db = req.app.get("db");
    const box_id = parseInt(req.query.id);
    try {
      const data = await db.getBox({ box_id });
      res.status(200).send(data);
    } catch (err) {
      res.sendStatus(500);
    }
  },
  getSamplesByBoxId: async (req, res) => {
    const db = req.app.get("db");
    const box_id = parseInt(req.query.id);
    try {
      const data = await db.getSamplesByBoxId({ box_id });
      res.status(200).send(data);
    } catch (err) {
      res.sendStatus(500);
    }
  },
  getGridSamplesByBoxId: async (req, res) => {
    const db = req.app.get("db");
    const box_id = parseInt(req.query.id);
    try {
      const data = await db.getGridSamplesByBoxId({ box_id });
      res.status(200).send(data);
    } catch (err) {
      res.sendStatus(500);
    }
  },
  addSample: async (req, res) => {
    const {
      user_id,
      user_key,
      name,
      description,
      freeze_date,
      cell_vial,
      freezer_id,
      experiment_name, //generate experiment_id
      location_id,
      cane_id,
      box_id,
      box_position,
      culture_condition,
      freezing_medium_id,
      expanded_note,
      add1,
      add2,
      add3,
      add4,
      add5
    } = req.body;

    const db = req.app.get("db");
    try {
      await db.addSample({
        user_id,
        user_key,
        name,
        description,
        freeze_date,
        cell_vial,
        freezer_id,
        experiment_name,
        location_id,
        cane_id,
        box_id,
        box_position,
        culture_condition,
        freezing_medium_id,
        expanded_note,
        add1,
        add2,
        add3,
        add4,
        add5
      });
      res.sendStatus(200); //send data for web visual of cart ?
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
  getSamples: (req, res) => {
    const db = req.app.get("db");
    db.getSamples().then(data => {
      res.status(200).send(data);
    });
  }
};
