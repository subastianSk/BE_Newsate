const bcrypt = require("bcryptjs");
const db = require("../../models");

module.exports = {
  create: async (payload) => {
    const result = await db.users.create(payload);
    return result;
  },
  getById: async (id) => {
    const result = await db.users.findByPk(id, {
      include: [{
        model: db.roles,
        attributes: ["id", "name"]
      }]
    });
    return result;
  },
  login: async (payload) => {
    const result = await db.users.findOne({
      where: {
        email: payload.email
      }
    });
    if (!result) {
      return null;
    }
    const passwordValid = bcrypt.compareSync(payload.password, result.password);
    return passwordValid ? result : null;
  }
};
