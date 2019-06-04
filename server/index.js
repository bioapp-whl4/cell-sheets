require("dotenv").config();
const massive = require("massive");
const session = require("express-session");
const express = require("express");
const controller = require("./controller");
const sampleCtrl = require("./sampleController");
const freezerCtrl = require("./freezerController");
const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env;
const app = express();

//middleware
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
    console.log(db.listTables());
    app.listen(SERVER_PORT, () => {
      console.log(`SERVER_PORT: ${SERVER_PORT}`);
    });
  })
  .catch(console.log(`Server loading!`));

app.post("/auth/login", controller.login);
app.post("/auth/register", controller.register);
// app.get('/auth/logout',controller.logout)
// app.get('/auth/session',controller.session)
//SAMPLE-CONTROLLER
app.get("/api/samples", sampleCtrl.getSamples);

//FREEZER-CONTROLLER
app.get("/api/freezers", freezerCtrl.getFreezers);
