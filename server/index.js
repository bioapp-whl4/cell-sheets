require("dotenv").config();
const massive = require("massive");
const session = require("express-session");
const express = require("express");
const controller = require("./controller");
const sampleCtrl = require("./sampleController");
const freezerCtrl = require("./freezerController");
const addPartsCtrl = require("./partsController");
const {
  CONNECTION_STRING,
  SESSION_SECRET,
  SERVER_PORT,
  ACCOUNT_SID,
  AUTH_TOKEN
} = process.env;
const client = require("twilio")(ACCOUNT_SID, AUTH_TOKEN);

const app = express();

//middleware
app.use(express.static(`${__dirname}/../build`));
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log(`DATABASE: Connected`);
    app.listen(SERVER_PORT, () => {
      console.log(`SERVER_PORT: ${SERVER_PORT}`);
    });
  })
  .catch(console.log(`Server loading!`));

app.post("/auth/login", controller.login);
app.post("/auth/register", controller.register);
app.get("/auth/logout", controller.logout);
// app.get('/auth/session',controller.session)

//FREEZER-CONTROLLER
app.get("/api/freezers", freezerCtrl.getFreezers);
app.get("/api/freezer", freezerCtrl.getFreezer);
app.post("/api/freezer", addPartsCtrl.addFreezer);
app.get("/api/freezer/canes", freezerCtrl.getCanesByFID);
app.get("/api/cane/boxes", freezerCtrl.getBoxesByCaneId);
app.get("/api/box/samples", freezerCtrl.getSamplesByBoxId);
app.get("/api/medium", freezerCtrl.getMedium);

//BOX
app.get("/api/boxgrid/samples", freezerCtrl.getGridSamplesByBoxId);
app.get("/api/box", freezerCtrl.getBox);
app.post("/api/box", addPartsCtrl.addBox);
app.put("/api/boxgrid/samples", freezerCtrl.updateSampleLocations);
//SAMPLE
app.get("/api/samples", sampleCtrl.getSamples);
app.get("/api/sample", sampleCtrl.getSample);
app.post("/api/sample", freezerCtrl.addSample);
app.put("/api/sample", freezerCtrl.addSample);
//CANE
app.get("/api/cane", freezerCtrl.getCane);
app.post("/api/cane", addPartsCtrl.addCane);
//PICKLIST
app.post("/api/picklist", controller.picklist);
//Freezer warning
app.post("/api/warning", (req, res) => {
  const { freezer_id } = req.body;
  client.messages
    .create({
      body: `Cell Sheets Alert: Freezer ${freezer_id} temperature is above 16C`,
      from: "18058745931",
      to: "8053456125"
    })
    .then(message => console.log(message.sid));
  res.sendStatus(200);
});
