##Udacity project 5 - Eazy-Dig

 A responsive web application that allows the user to search information about records.
 
 You can test the barcode function with the pictures in barcode_pics if you don't have any records with you.
 
About Whosampled fuction
-------------
Whosampled doesn't provide any API, so I need to have a server to GET the webpage.
I already have one on AWS but I think Whosampled ban it,
so I have another one on cloud9 to deal with Whosampled request.

Cloud9 shutdown the server regularly, so Whosampled fuction may not work most of the time.

This is the link: https://ide.c9.io/illl48/whosampled
You can send me a request through Cloud9 so you can have the access to it then run the server when you need.

Below is my server code (nodejs)

```
var http = require('http');
var path = require('path');
var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var cors = require('cors');
var request = require('request');
var server = http.createServer(router);

router.use(cors());

router.get('/whosampled', function(req, res){
  //'http://www.whosampled.com/The-Jackson-5/ABC/'
  var url = 'http://www.whosampled.com/'+req.query.artist+'/'+req.query.title+'/';
  //console.log(url);
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('found body');
      res.json(body);
    }
    else res.json('error');
  })  
  
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
```
 
Live Demo
-------------
https://illl48.github.io/Eazy-Dig/ 

Install
-------------
```shell
npm install
```

Run
-------------
To run the porject on http://localhost:8080/ 
```shell
npm run dev
```

Build
-------------
1. Remove ``` 'webpack/hot/dev-server', ``` in **webpack.config.js**
2. Run ``` npm run dev ```
3. Result will be in the build folder
