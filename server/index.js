const express = require('express');
const request = require('request')
const bodyParser = require('body-parser')

const session = require('./models/session')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    request('http://localhost:5000/getList', { json: true }, (err, res_in, body) => {
        if (err) { return console.log(err); }
        const list = body
        res.json(list)
    });
});

app.post('/postToken', (req, res) => {
	console.log(req.body);
});

app.post('/createSession', (req, res) => {
    name = req.body.name;
    location = req.body.location;
    range = req.body.range;
    danceability = req.body.danceability;
    energy = req.body.energy;
    positivity = req.body.positivity;
    tempo = req.body.tempo;
    session.addSession(name, location, range, danceability, energy, positivity, tempo);
    res.json('Success');
})

const port = process.env.PORT || 8080;
app.listen(port);

console.log('App is listening on port ' + port);
