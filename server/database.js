const admin = require('firebase-admin')

const serviceAccount = require('./melodymaps-firebase-adminsdk-loznj-eb2f09b6bf.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://melodymaps.firebaseio.com/'
});

const database = admin.database();

module.exports.addSession = (name, location, range, danceability, energy, positivity, tempo, idArr) => {
    let sessionRef = database.ref('sessions');
    sessionRef.once('value', snapshot => {
        sessionRef.push({
            name,
            location,
            range,
            danceability,
            energy,
            positivity,
            tempo,
            idArr
        });
    })
}

module.exports.addUserToSession = (session, id) => {
    let sessionRef = database.ref('sessions');
    sessionRef.once('value', snapshot => {
        let entry = Object.entries(snapshot.val()).filter(val => val[0] == session);
        let idArr = [...entry[0][1].idArr];
        let containsId = false;
        for (i = 0; i < idArr.length; i++) {
            if (idArr[i] == id) {
                containsId = true;
                break;
            }
        }
        if (!containsId) {
            idArr.push(id);
            entry[0][1].idArr = idArr;
            sessionRef.child(session).set(entry[0][1]);
        }        
    });
}

module.exports.getSessions = callback => {
    let sessionRef = database.ref('sessions');
    sessionRef.once('value', snapshot => {
        let entries = Object.entries(snapshot.val());
        callback(entries);
    });
}

module.exports.getSession = (session, callback) => {
    let sessionRef = database.ref('sessions');
    sessionRef.once('value', snapshot => {
        let entry = Object.entries(snapshot.val()).filter(val => val[0] == session);
        callback(entry[0]);
    });
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

module.exports.getUserSongs = (idArr, callback) => {
    let usersRef = database.ref('users');
    usersRef.once('value', snapshot => {
        let entries = Object.entries(snapshot.val()).filter(val => {
            for (i = 0; i < idArr.length; i++) {
                if (idArr[i] == val[0]) return true;
            }
            return false;
        });
        callback(entries.map(val => val[1].songs));
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