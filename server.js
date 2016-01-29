var Hapi = require("hapi");
var server = new Hapi.Server();
server.connection({ port: 8989 });

var info = function (request, reply) {
  reply({version: require('./package.json').version});
};

server.route({ method: 'GET', path: '/info', handler: info });

server.start();
console.log('hello server http://localhost:8989');
module.exports = server;
