const express = require('express');
const request = require('request')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    request('http://localhost:5000/getList', { json: true }, (err, res_in, body) => {
        if (err) { return console.log(err); }
        const list = body
        res.json(list)
    });
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log('App is listening on port ' + port);