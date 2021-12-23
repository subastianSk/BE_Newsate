const db = require("../../models");

module.exports = {
  getById: async (id) => {
    const result = await db.roles.findByPk(id);
    return result;
  }
};
