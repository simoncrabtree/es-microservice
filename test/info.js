var Lab = require("lab");
var lab = exports.lab = Lab.script();
var code = require("code");
var serviceVersion = require("../package.json").version;
var Server = require("../server.js");

lab.experiment("Info endpoint", function() {
  lab.test("GET /info returns version of service",
  function(done){
    var server = Server();
    var options = {method: "GET", url:"/info"};
    server.inject(options, function(response){
      var result=response.result;
      code.expect(result.version).to.equal(serviceVersion);
      done();
    });
  });

  lab.test("Processing any event updates the Events Processed value", function(done){
    var server = Server();
    server.handleEvent("SomeOtherEvent_v1", "stream1", {}, function(err) {
      var options = {method: "GET", url:"/info"};
      server.inject(options, function(response){
        var result=response.result;
        code.expect(result.eventsProcessed).to.equal(1);
        code.expect(result.eventsHandled).to.equal(0);
        done();
      });
    });
  });

  lab.test("Handling an event updates the Events Handled value", function(done){
    var server = Server();
    server.handleEvent("OrganisationCreated_v1", "stream1", {}, function(err) {
      var options = {method: "GET", url:"/info"};
      server.inject(options, function(response){
        var result=response.result;
        code.expect(result.eventsProcessed).to.equal(1);
        code.expect(result.eventsHandled).to.equal(1);
        done();
      });
    });
  });
});
