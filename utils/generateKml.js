const turf = require('@turf/turf');

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

    // Define a point
    const point = `${lng},${lat},0`;

    // Define a line
    const line = `${lng},${lat},0 ${lng+0.1},${lat+0.1},0`;

    // Define a polygon
    const polygonCoordinates = [
        [lng, lat, 0],
        [lng + 0.1, lat, 0],
        [lng + 0.1, lat + 0.1, 0],
        [lng, lat + 0.1, 0],
        [lng, lat, 0] // Repeat the first point to close the polygon
    ].map(coord => coord.join(',')).join(' ');



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
        <Placemark>
          <name>Point at lat: ${lat}, lng: ${lng}</name>
          <Point>
            <coordinates>${point}</coordinates>
          </Point>
        </Placemark>
        <Placemark>
          <name>Line starting at lat: ${lat}, lng: ${lng}</name>
          <LineString>
            <coordinates>${line}</coordinates>
          </LineString>
        </Placemark>
      <Placemark>
          <name>Polygon</name>
          <Polygon>
            <extrude>1</extrude>
            <altitudeMode>relativeToGround</altitudeMode>
            <outerBoundaryIs>
              <LinearRing>
                <coordinates>
                  ${polygonCoordinates}
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