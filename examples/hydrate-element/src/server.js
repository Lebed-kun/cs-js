import IndexPage from "./pages/index.js";

var http = require("http");
var fs = require("fs");
var path = require("path");

//create a server object:
http
  .createServer(function(req, res) {
    const url = req.url;

    let content = "Not found";
    if (url === "/") {
      content = IndexPage();
    } else if (url.match(/\.js$/)) {
      const filepath = path.join(__dirname, url);
      content = fs.readFileSync(filepath, "utf8");
    }

    res.write(content); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080
