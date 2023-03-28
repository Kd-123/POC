var express = require('express')
API = require('./api');
var app = express();
const cors = require('cors');

app.use(cors());

app.get('/fetchUniversity/:country', function (req, res){

    API.getByCountry(req.params.country).then(hit => {
        
        console.log(hit);
        res.send(hit.data);

    }).catch(err => {
        console.log(' ${err}');
        res.status(400).send(err);
    })

});

app.get('Go to: http://localhost:3000');
app.listen(3000);

module.exports = app;