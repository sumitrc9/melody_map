const express = require('express');
const request = require('request')
const bodyParser = require('body-parser')
const SpotifyWebApi = require('spotify-web-api-node')

// const session = require('./models/session')
// const user = require('./models/user')

const database = require('./database')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Example api sends a get request to Flask endpoint
app.get('/api/getList', (req,res) => {
    request('http://localhost:5000/getList', { json: true }, (err, res_in, body) => {
        if (err) { return console.log(err); }
        const list = body
        res.json(list)
    });
});

app.post('/updateLocation', (req, res) => {
    console.log(req.body);
});

app.post('/postToken', (req, res) => {
    token = req.body.token;
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);
    spotifyApi.getMySavedTracks({
            limit: 30,
            offset: 1
        })
        .then(data => {
            let userSongs = [];
            data.body.items.forEach(song => {
                userSongs.push({
                    name: song.track.name,
                    imageUrl: song.track.album.images[0].url,
                    artist: song.track.artists[0].name
                });
            })
            spotifyApi.getMe()
                .then(me => {
                    id = me.body.id;
                    name = me.body.display_name;
                    location = '';
                    database.addUser(id, name, location, userSongs)
                    user = {
                        id: id,
                        name: name
                    }
                    res.json(user)
                });
        });
});

app.post('/createSession', (req, res) => {
    name = req.body.name;
    location = req.body.location;
    range = req.body.range;
    danceability = req.body.danceability;
    energy = req.body.energy;
    positivity = req.body.positivity;
    tempo = req.body.tempo;
    database.addSession(name, location, range, danceability, energy, positivity, tempo);
    res.json('Success');
})

const port = process.env.PORT || 8080;
app.listen(port);

console.log('App is listening on port ' + port);
