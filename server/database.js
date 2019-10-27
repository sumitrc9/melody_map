const admin = require('firebase-admin')

const serviceAccount = require('./melodymaps-firebase-adminsdk-loznj-eb2f09b6bf.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://melodymaps.firebaseio.com/'
});

const database = admin.database();

module.exports.addSession = (name, location, range, danceability, energy, positivity, tempo) => {
    let sessionRef = database.ref('sessions')
    sessionRef.once('value', snapshot => {
        sessionRef.push({
            name,
            location,
            range,
            danceability,
            energy,
            positivity,
            tempo
        });
    })
}

module.exports.addUser = (id, name, location, songs) => {
    let usersRef = database.ref('users');
    usersRef.once('value', snapshot => {
        usersRef.child(id).set({
            name,
            location,
            songs
        }); 
    });
}

module.exports.updateUserLocation = (id, location) => {
    let usersRef = database.ref('users');
    usersRef.once('value', snapshot => {
        let entry = Object.entries(snapshot.val()).filter(val => val[0] == id)
        id = entry[0][0];
        name = entry[0][1].name;
        songs = entry[0][1].songs;
        this.addUser(id, name, location, songs);
    });
}