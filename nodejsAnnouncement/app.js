const express = require('express');
const app = express();

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


app.get('/api', (req, res,) => {
  const uni = req.get('http://universities.hipolabs.com/search?country=United+Kingdom');
  console.log(uni); 
  res.end();
})

app.get('Go to: http://localhost:3000');
app.listen(3000);

module.exports = app;