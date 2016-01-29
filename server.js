var Hapi = require("hapi");

module.exports = function() {
  var server = new Hapi.Server();
  server.connection({ port: 8989 });

  var _handlers = {
    OrganisationCreated_v1: function(stream, data) {
    }
  };
  var _eventsProcessed = 0;
  var _eventsHandled = 0;

  var info = function (request, reply) {
    reply({
      version: require('./package.json').version,
      eventsProcessed: _eventsProcessed,
      eventsHandled: _eventsHandled
    });
  };

  server.route({ method: 'GET', path: '/info', handler: info });

  server.handleEvent = function(type, stream, data, cb) {
    _eventsProcessed++;
    if(_handlers[type]){
      _handlers[type](stream, data);
      _eventsHandled++;
    }
    cb(null);
  }

  server.start();
  return server;
}
