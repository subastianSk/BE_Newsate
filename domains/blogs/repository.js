const db = require("../../models");

module.exports = {
    create: async (payload) => {
        const result = await db.blogs.create(payload);
        return result;
    },

    getById: async (id) => {
        const result = await db.blogs.findByPk(id);
        return result;
    },

};