const db = require("../../models");

module.exports = {
  getById: async (id) => {
    const result = await db.events.findByPk(id);
    return result;
  },
};
