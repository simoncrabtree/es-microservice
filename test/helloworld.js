var Lab = require("lab");
var lab = exports.lab = Lab.script();
var server = require("../server.js");
var code = require("code");

lab.experiment("Hello", function() {
  lab.test("Testing for 'Hello World'",
  function(done){
    var options = {method: "GET", url:"/"};
    server.inject(options, function(response){
      var result=response.result;
      code.expect(result).to.equal("Hello World");
      done();
    });
  });
});
