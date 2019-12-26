var http = require("http");
var IndexPage = require("./pages/index.js");
var AboutPage = require("./pages/about.js");

//create a server object:
http
  .createServer(function(req, res) {
    const url = req.url;

    let html = "";

    if (url === "/") {
      html = IndexPage();
    } else if (url === "/about") {
      html = AboutPage();
    }

    res.write(html); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080
