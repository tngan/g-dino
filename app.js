// Simple HTTP server to take care your dino

'use strict';

const fs = require("fs");
const http = require("http");
const url = require("url");

http.createServer((req, res) => {
    
    const pathname = url.parse(req.url).pathname;
    console.log(`Request for ${pathname} received.`);
    let context = "404.html";
    if(pathname === "/") {
        context = "index.html";
    } else if (pathname === "/runner.js") {
        context = "public/javascripts/runner.js";
    } else if (pathname === "/loadtime.js") {
        context = "public/javascripts/loadtime.js";
    } else if (pathname === "/base.css") {
        context = "public/stylesheets/base.css";
    } else if (pathname === "/dino.css") {
        context = "public/stylesheets/dino.css";
    }
    res.writeHead(200);
    res.write(fs.readFileSync(context, "utf8"));
    res.end();

}).listen(3000);

console.log("Train my dino on port 3000...");