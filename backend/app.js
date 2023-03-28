const express = require('express');
const app = express();
//const http = require('http');

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type,Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PATCH,DELETE,OPTIONS"
    );
    next();
});

app.use((req, res, next) => {
    console.log("Server run on Port 3000");
    next();
});


app.get('/hello', (req, res,) => {
    // hello = [
    //     {
    //         id: 101,
    //         nameStudent: "kanishka",
    //         age: 22
    //     },
    //     {
    //         id: 101,
    //         nameStudent: "kanishka",
    //         age: 22
    //     },
    //     {
    //         id: 101,
    //         nameStudent: "kanishka",
    //         age: 22
    //     },
    //     {
    //         id: 101,
    //         nameStudent: "kanishka",
    //         age: 22
    //     },
    //     {
    //         id: 101,
    //         nameStudent: "kanishka",
    //         age: 22
    //     },
        
    // ];
    
    // const val = http.get("http://universities.hipolabs.com/search?country=United+Kingdom");
    // //return get("https://swapi.dev/api/vehicles/");

    // res.send(val);
    request('https://swapi.dev/api/vehicles/', function(error, response, body) {
        res.json(body)
    });

    
})



// app.get('/api', function(req, res){
//     var options = {
//      // host : 'www.example.com',
//       path : 'https://swapi.dev/api/vehicles/',
//      // port : 80,
//       method : 'GET'
//     }
  
//     var request = http.request(options, function(response){
//       var body = ""
//       response.on('data', function(data) {
//         body += data;
//       });
//       response.on('end', function() {
//         res.send(JSON.parse(body));
//       });
//     });
//     request.on('error', function(e) {
//       console.log('Problem with request: ' + e.message);
//     });
//     request.end();
//   });
  



module.exports = app;

