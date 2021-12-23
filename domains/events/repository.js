const db = require("../../models");

module.exports = {
  getById: async (id) => {
    const result = await db.events.findByPk(id);
    return result;
  },
  create: async (payload) => {
    const result = await db.participants.create(payload);
    return result;
  }
};
