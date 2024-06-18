const turf = require('@turf/turf');
const fs = require('fs');

function generateKml(lat, lng, radius) {
    // Define the center of the circle
    const center = turf.point([lng, lat]);

    // Define the number of points on the circle
    const steps = 100;

    // Generate the circle
    const circle = turf.circle(center, radius, {steps: steps});

    // Extract the coordinates of the circle
    const coordinates = circle.geometry.coordinates[0];

    // Convert the coordinates to a KML-compatible format
    const kmlCoordinates = coordinates.map(coord => `${coord[0]},${coord[1]},0`).join(' ');

    // Insert the coordinates into the KML template
    const kml = `<?xml version="1.0" encoding="UTF-8"?>
    <kml xmlns="http://www.opengis.net/kml/2.2">
      <Document>
        <Placemark>
          <name>Circle around lat: ${lat}, lng: ${lng}</name>
          <Polygon>
            <extrude>1</extrude>
            <altitudeMode>relativeToGround</altitudeMode>
            <outerBoundaryIs>
              <LinearRing>
                <coordinates>
                  ${kmlCoordinates}
                </coordinates>
              </LinearRing>
            </outerBoundaryIs>
          </Polygon>
        </Placemark>
      </Document>
    </kml>`;

    return kml;
}

module.exports = generateKml;

