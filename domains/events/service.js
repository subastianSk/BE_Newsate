const common = require("../../mixins/common");
const repository = require("./repository");

function compare(a, b) {
  if (a.point > b.point) return -1;
  return 0;
}

module.exports = {
  name: "events",
  mixins: [common],
  actions: {
    add: {
      method: "post",
      path: "/",
      authentication: true,
      authorization: ["admin", "superadmin"],
      responseMessage: "success create events",
      handler: async (ctx) => {
        const user = ctx.user;
        // user.dataValues.id
        const payload = ctx.payload.body;
        const newPayload = {
          ...payload,
          userId: user.dataValues.id,
        };
        const result = await repository.create(newPayload);
        return result;
      },
    },
    delete: {
      responseMessage: "success delete event",
      method: "delete",
      path: "/:id",
      authentication: true,
      authorization: ["admin", "superadmin"],
      handler: async (ctx) => {
        const result = await repository.delete(Number(ctx.payload.params.id));
        if (!result) {
          throw new Error("id not exist");
        }
        return result;
      },
    },
    edit: {
      responseMessage: "success edit event",
      method: "put",
      path: "/:id",
      authentication: true,
      authorization: ["admin", "superadmin"],
      handler: async (ctx) => {
        const payload = ctx.payload.body;
        const result = await repository.edit(
          Number(ctx.payload.params.id),
          payload
        );
        if (result == null) {
          throw new Error("id not exist");
        }
        // return result;
      },
    },
    getById: {
      responseMessage: "success get data event",
      method: "get",
      path: "/:id",
      handler: async (ctx) => {
        const event = await repository.getById(Number(ctx.payload.params.id));
        if (!event) {
          throw new Error("id not exist");
        }

        console.log(event);

        const participants = event.participants.map((o) => ({
          id: o.id,
          email: o.email,
          point: o.participants_points.point,
        }));

        participants.sort(compare);

        const result = {
          id: event.id,
          name: event.name,
          date: event.date,
          creted_by: event.user,
          leaderboard: participants.slice(0, 3),
        };

        return result;
      },
    },
    getAll: {
      responseMessage: "success get data event",
      method: "get",
      path: "/",
      handler: async (ctx) => {
        const payload = ctx.payload.body;
        const event = await repository.get(payload);

        const result = event.map((o) => ({
          id: o.id,
          name: o.name,
          date: o.date,
          created_by: o.user,
        }));

        return result;
      },
    },
  },
};
