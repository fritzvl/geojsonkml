const fs = require('fs');
const generateKml = require('./utils/generateKml.js');

const lat = -3.745;
const lng = -38.523;
const radius = 10; // radius in kilometers

const kml = generateKml(lat, lng, radius);

fs.writeFileSync('circle.kml', kml);