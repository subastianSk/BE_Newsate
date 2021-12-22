const common = require("../../mixins/common");
const repository = require("./repository");

module.exports = {
  name: "participants",
  mixins: [common],
  actions: {
    add: {
      method: "post",
      path: "/",
      authentication: true,
      responseMessage: "success create participant",
      handler: async (ctx) => {
        const payload = ctx.payload.body;
        const result = await repository.create(payload);
        return result;
      },
    }
  },
};
