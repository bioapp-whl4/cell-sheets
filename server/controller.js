const bcrypt = require("bcryptjs");
module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { email, firstname, lastname, password } = req.body;
    const { session } = req;
    let username = email;

    try {
      // checking if the email is taken

      // let response = await db.checkForEmail({email})
      // emailCount = +response[0].emailCount
      // if(emailCount !== 0) {
      //     return sendStatus(409)
      // }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      let response_1 = await db.register({
        username,
        firstname,
        lastname,
        email,
        hash
      });
      const user_id = await db.login({ username });
      session.user = {
        username,
        user_id
      };
      res.status(200).send(session.user.user_id[0]);
    } catch (err) {
      res.sendStatus(409);
    }
  },
  login: async (req, res) => {
    const db = req.app.get("db");
    const { email } = req.body;
    let username = email;
    const { session } = req;
    try {
      let user = await db.login({ username });

      session.user = user[0];
      const authenticated = bcrypt.compareSync(
        req.body.password,
        user[0].password
      );
      session.user.authenticated = authenticated;

      if (authenticated) {
        res
          .status(200)
          .send({ authenticated, id: user[0].id, admin: user[0].admin });
      } else {
        throw new Error(401, "Error");
      }
    } catch (err) {
      res.sendStatus(401);
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },
  picklist: (req, res) => {
    const { session } = req;
    session.picklist = req.body;
  }
};
