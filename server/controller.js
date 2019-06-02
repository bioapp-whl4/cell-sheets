const bcryptjs = require("bcryptjs");
module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const {
      username,
      email,
      phone,
      first_name,
      last_name,
      password
    } = req.body;
    const { session } = req;
    try {
      let response = await db.checkForEmail({ email });
      emailCount = +response[0].emailCount;
      if (emailCount !== 0) {
        return sendStatus(409);
      }
      const salt = bcrypt.genSaltSync(10);
      const hashed_password = bcrypt.hashSync(password, salt);
      await db.register({ first_name, last_name, email, hashed_password });
      const user = await db.login({ email });
      session.user = {
        username,
        user_id
      };
      res.status(200).send(session.user.user_id[0]);
    } catch (err) {
      res.sendStatus(409);
    }
  }
};
