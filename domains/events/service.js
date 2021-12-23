const common = require("../../mixins/common");
const repository = require("./repository");


function compare( a, b ){
    if(a.point > b.point)
        return -1;
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
            authorization: ["admin","moderator"],
            responseMessage: "success create events",
            handler: async (ctx) => {
                const payload = ctx.payload.body;
                const result = await repository.create(payload);
                return result;
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
                    email : o.email,
                    point : o.participants_points.point
                }));

                participants.sort(compare);

                const result = {
                    id : event.id,
                    name : event.name,
                    date : event.date,
                    creted_by : event.user,
                    leaderboard : participants.slice(0,3)
                };

                return result;
            },
        },
    },
};