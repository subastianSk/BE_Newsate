const common = require("../../mixins/common");
const repository = require("./repository");


module.exports = {
    name: "events",
    mixins: [common],
    actions: {
        add: {
            method: "post",
            path: "/",
            authentication: true,
            authorization: ["admin","moderator"],
            responseMessage: "success create events",
            handler: async (ctx) => {
                const payload = ctx.payload.body;
                const newPayload = {
                    ...payload,
                    date: new Date(),
                    createdBy: ctx.user.id
                }
                const result = await repository.create(newPayload);
                return result;
            },
        },
        getById: {
            responseMessage: "success get data event",
            method: "get",
            path: "/:id",
            handler: (ctx) => {
                const event = repository.getById(Number(ctx.payload.params.id));
                if (!event) {
                    throw new Error("id not exist");
                }
                return event;
            },
        },
    },
};