const db = require("../../models");

module.exports = {
  getById: async (id) => {
    const result = await db.events.findByPk(id, {
      include: [
        {
          model: db.participants,
          attributes: ["id", "email"],
        },
        {
          model: db.users,
          attributes: ["id", "email"]
        }
      ],
    });
    return result;
  },
  create: async (payload) => {
    const result = await db.events.create(payload);
    return result;
  },
};
