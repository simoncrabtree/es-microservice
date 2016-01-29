var Hapi = require("hapi");
var server = new Hapi.Server();
server.connection({ port: 8989 });

var _eventsHandled = 0;

var info = function (request, reply) {
  reply({
    version: require('./package.json').version,
    eventsHandled: _eventsHandled
  });
};

server.route({ method: 'GET', path: '/info', handler: info });

server.handleEvent = function(type, stream, data, cb) {
  _eventsHandled++;
  cb(null);
}

server.start();
console.log('hello server http://localhost:8989');
module.exports = server;
