import { promises as fs } from 'fs';
import { JSDOM } from 'jsdom';
import tj from '@mapbox/togeojson';

export default async function handler(req, res) {
    try {
        // Read the KML file
        const kml = new JSDOM(await fs.readFile('circle.kml', 'utf8'));

        // Convert the KML to GeoJSON
        const converted = tj.kml(kml.window.document.querySelector('kml'));

        // Return the GeoJSON in the response
        res.status(200).json(converted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}