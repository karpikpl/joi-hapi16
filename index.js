const Hapi = require('hapi');
const Joi = require('joi');

const server = new Hapi.Server();
server.connection({
    port: 8081
});

server.route({
    method: 'POST',
    path: '/data/{id}',
    handler: function (request, reply) {

        reply(`Trying to add data for id:${request.params.id}. Payload: ${JSON.stringify(request.payload)}`);
    },
    config: {
        validate: {
            params: {
                id: Joi.number()
                    .min(1)
                    .max(10)
            },
            payload: Joi.object({
                id: Joi.number(),
                url: Joi.string()
                    .uri()
            })
        }
    }
});

server.start((err) => {

    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Hapi 16 server running at: ${server.info.uri}`);
});
