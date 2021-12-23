const db = require("../../models");

module.exports = {
  create: async (payload) => {
    const result = await db.participants.create(payload);
    return result;
  }
};
