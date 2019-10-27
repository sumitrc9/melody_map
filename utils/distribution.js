
const atlantaLat = 33.7490;
const atlantaLong = 84.3880;


var o = {} // empty Object
var key = 'Coordinates';
o[key] = []; // empty Array, which you can push() values into

var gaussian = require('gaussian');
var distributionLat = gaussian(atlantaLat, 1/55);
var distributionLong = gaussian(atlantaLong, 1/55);
// Take a random sample using inverse transform sampling method.

var i = 0;
var iterations = 100;

for (i = 0; i < iterations; i++) {
o[key].push({
    lat: distributionLat.ppf(Math.random()),
    long: distributionLong.ppf(Math.random())
});
}

console.log(JSON.stringify(o));

//coords of atlanta  33.7490° N, 84.3880° W
//randomly make 100 coords in atlanta using gaussian
//return pairs of randomly 