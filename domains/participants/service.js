const common = require("../../mixins/common");
const repository = require("./repository");
const eventRepository = require("../events/repository");

module.exports = {
  name: "participants",
  mixins: [common],
  actions: {
    add: {
      method: "post",
      path: "/",
      authentication: true,
      authorization: ["admin", "moderator"],
      responseMessage: "success create participant",
      handler: async (ctx) => {
        console.log("ini add");
        const payload = ctx.payload.body;
        const result = await repository.create(payload);
        return result;
      },
    },
    addPoints: {
      method: "post",
      path: "/:id/point",
      authentication: true,
      authorization: ["admin", "moderator"],
      responseMessage: "success add points to participant",

      handler: async (ctx) => {
        console.log("ini addPoint");
        const participantId = Number(ctx.payload.params.id);
        // check if participantId exist
        const isParticipantIdExist = await repository.getById(participantId);
        if (!isParticipantIdExist) {
          throw new Error(`participant with id ${participantId} doesn't exist`);
        }

        const eventId = Number(ctx.payload.body.eventId);
        // check if eventId exist
        const isEventIdExist = await eventRepository.getById(eventId);
        if (!isEventIdExist) {
          throw new Error(`event with id ${eventId} doesn't exist`);
        }

        const payload = {
          participantId: participantId,
          eventId: eventId,
          weight: Number(ctx.payload.body.weight),
          point: Number(ctx.payload.body.weight) * 10,
          userId: ctx.user.id,
          // ctx.user.id
        };

        const result = await repository.createPoints(payload);
        return result;
      },
    },
    getPointsByParticipant: {
      method: "get",
      path: "/:id/point",
      responseMessage: "success getAllPoint participant",
      handler: async (ctx) => {
        const participantId = Number(ctx.payload.params.id);
        // check if participantId exist
        const isParticipantIdExist = await repository.getById(participantId);
        if (!isParticipantIdExist) {
          throw new Error(`participant with id ${participantId} doesn't exist`);
        }

        const result = repository.getParticipantTotalPoints(participantId);
        return result;
      },
    },
    geteEventPointParticipant: {
      method: "get",
      path: "/:id/point/event/:event/",
      responseMessage: "success getEventPoint participant",
      handler: async (ctx) => {
        const participantId = Number(ctx.payload.params.id);
        // check if participantId exist
        const isParticipantIdExist = await repository.getById(participantId);
        if (!isParticipantIdExist) {
          throw new Error(`participant with id ${participantId} doesn't exist`);
        }

        // check if participant join this event
        const eventId = Number(ctx.payload.params.event);

        const result = repository.getParticipantTotalPointsInEvent(participantId, eventId);
        return result;
      },
    },
  },
};
