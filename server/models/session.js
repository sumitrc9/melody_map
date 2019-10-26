const admin = require('firebase-admin')

const serviceAccount = require('../melodymaps-firebase-adminsdk-loznj-eb2f09b6bf.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://melodymaps.firebaseio.com/'
});

const database = admin.database();
const ref = database.ref('sessions')

module.exports.addSession = (name, location, range, danceability, energy, positivity, tempo) => {
    ref.once('value', snapshot => {
        ref.push({
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