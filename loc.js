const lat = 40.7128; // Example latitude
const lon = -74.0060; // Example longitude
const destination = 'Times Square, New York, NY'; // Example destination

const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${lat},${lon}&destination=${encodeURIComponent(destination)}`;
