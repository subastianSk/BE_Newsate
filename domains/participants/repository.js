const db = require("../../models");

module.exports = {
  create: async (payload) => {
    const result = await db.participants.create(payload);
    return result;
  },

  getById: async (id) => {
    const result = await db.participants.findByPk(id);
    return result;
  },

  createPoints: async (payload) => {
    const result = await db.participants_points.create(payload);
    return result;
  },
};
