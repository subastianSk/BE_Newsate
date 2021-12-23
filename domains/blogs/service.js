const common = require("../../mixins/common");
const repository = require("./repository");


module.exports = {
    name: "blogs",
    mixins: [common],
    actions: {
        add: {
            method: "post",
            path: "/",
            authentication: true,
            authorization: ["admin"],
            responseMessage: "success create blog",
            handler: async (ctx) => {
                const payload = ctx.payload.body;
                const newPayload = {
                    ...payload,
                    date: new Date(),
                    userId: ctx.user.id
                }
                const result = await repository.create(newPayload);
                return result;
            },
        },
        getById: {
            responseMessage: "success get data Blogs",
            method: "get",
            path: "/:id",
            handler: (ctx) => {
                const berita = repository.getById(Number(ctx.payload.params.id));
                if (!berita) {
                    throw new Error("id not exist");
                }
                return berita;
            },
        },
    },
};