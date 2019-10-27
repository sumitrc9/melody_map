const express = require('express');
const request = require('request')
const bodyParser = require('body-parser')
const SpotifyWebApi = require('spotify-web-api-node')

const database = require('./database')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//app.use(express.static(path.join(__dirname, "/client/src")));

app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

//app.get("/*", (req, res) => {
//  res.sendFile(path.join(__dirname, "/client/src/pages/home.js"));
//});


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
    let id = req.body.id;
    let location = req.body.location;
    database.updateUserLocation(id, location);
    res.json('Success');
});

app.post('/getSessions', (req, res) => {
    //MAKE SURE TO GET CURRENT LOCATION and USERID

    let getDistance = (a, b) => {
        let aLat = a.lat / Math.PI;
        let bLat = b.lat / Math.PI;
        let aLng = a.lng / Math.PI;
        let bLng = b.lng / Math.PI;
        return 3960 * Math.acos(Math.sin(aLat) * Math.sin(bLat) + Math.cos(aLat) * Math.cos(bLat) * Math.cos(bLng - aLng));
    }

    location = req.body.location;
    id = req.body.id;
    database.getSessions(sessions => {
        allSessionList = sessions;
        sessions = sessions.filter(session => {
            let range = session[1].range;
            let b = session[1].location;
            return getDistance(location, b) < range;
        });
        sessions.forEach(session => database.addUserToSession(session[0], id));
        res.json({
            allSessions: allSessionList,
            joinedSessions: sessions
        });
    });
    //database.addUserToSession()
    // find all the sessions in the vicinity of the user
    // add all the users to the sessions
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
    idArr = [req.body.id];
    database.addSession(name, location, range, danceability, energy, positivity, tempo, idArr);
    res.json('Success');
})

const port = process.env.PORT || 8080;
app.listen(port);

console.log('App is listening on port ' + port);
