var Hapi = require("hapi");
var server = new Hapi.Server();
server.connection({ port: 8989 });
var hello = function (request, reply) {
  reply('Hello World');
};
server.route({ method: 'GET', path: '/', handler: hello });
server.start();
console.log('hello server http://localhost:8989');
module.exports = server;
