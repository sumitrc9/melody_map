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