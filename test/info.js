var Server = require('../server');
var serviceVersion = require("../package.json").version;
var assert = require('assert');

describe('Server', function() {
  describe('GET /info', function () {
    it('returns info about the service', function (done) {
      var server = Server();
      var options = {method: "GET", url:"/info"};
      server.inject(options, function(response){
        var result=response.result;
        assert.equal(result.version, serviceVersion);
        done();
      });
    });
  });

  describe("Processing any event", function() {
    it("updates the Events Processed value", function(done){
      var server = Server();
      server.handleEvent("SomeOtherEvent_v1", "stream1", {}, function(err) {
        var options = {method: "GET", url:"/info"};
        server.inject(options, function(response){
          var result=response.result;
          assert.equal(result.eventsProcessed, 1);
          assert.equal(result.eventsHandled ,0);
          done();
        });
      });
    });
  });

  describe("Handling an event", function() {
    it("updates the Events Handled value", function(done){
      var server = Server();
      server.handleEvent("OrganisationCreated_v1", "stream1", {}, function(err) {
        var options = {method: "GET", url:"/info"};
        server.inject(options, function(response){
          var result=response.result;
          assert.equal(result.eventsProcessed, 1);
          assert.equal(result.eventsHandled, 1);
          done();
        });
      });
    });
  });

});
