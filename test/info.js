var Lab = require("lab");
var lab = exports.lab = Lab.script();
var server = require("../server.js");
var code = require("code");
var serviceVersion = require("../package.json").version;

lab.experiment("Info endpoint", function() {
  lab.test("GET /info returns version of service",
  function(done){
    var options = {method: "GET", url:"/info"};
    server.inject(options, function(response){
      var result=response.result;
      code.expect(result.version).to.equal(serviceVersion);
      done();
    });
  });

  lab.test("Handling any event updates the Events Processed value", function(done){
    server.handleEvent("SomeOtherEvent_v1", "stream1", {}, function(err) {
      var options = {method: "GET", url:"/info"};
      server.inject(options, function(response){
        var result=response.result;
        code.expect(result.eventsProcessed).to.equal(1);
        done();
      });
    });
  });

});
