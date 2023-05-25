function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

function calculateDistance(location1, lat, lng) {
  const R = 6371e3; // Earth's radius in meters
  const lat1 = toRadians(location1.coordinates.lat);
  const lat2 = toRadians(lat);
  const deltaLat = toRadians(lat - location1.coordinates.lat);
  const deltaLon = toRadians(lng - location1.coordinates.lng);

  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2)
    + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // distance in meters
  return distance;
}

export default calculateDistance;