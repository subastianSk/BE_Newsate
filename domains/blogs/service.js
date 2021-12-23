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
        getAll: {
            method: "get",
            path: "/",
            handler: async (ctx) => {
                const result = await repository.get();
                return result;
            }
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
        updateById: {
            responseMessage: "update success data Blogs",
            method: "put",
            path: "/:id",
            authentication: true,
            authorization: ["admin"],
            handler: async (ctx) => {
                const payload = ctx.payload.body;
                const newPayload = {
                    ...payload,
                    date: new Date(),
                    userId: ctx.user.id
                }
                const result = await repository.update(newPayload, ctx.payload.params.id);
                console.log(ctx)
                return result;
            },
        },
        deleteById: {
            responseMessage: "delete success data Blogs",
            method: "delete",
            path: "/:id",
            authentication: true,
            authorization: ["admin"],
             handler: async (ctx) => {
                if (!ctx.payload?.params?.id) {
                    throw new Error("id not exist")
                }
                const id = Number(ctx.payload.params.id);
                await repository.delete(id);
                return {
                    message: `Blog with id ${id} was deleted successfully`
                };
            },
        },
    },
};