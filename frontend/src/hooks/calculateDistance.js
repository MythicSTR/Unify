function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

// function calculateDistance(location1, lat, lng) {
//   const R = 6371e3; // Earth's radius in meters
//   const lat1 = toRadians(location1.coordinates.lat);
//   const lat2 = toRadians(lat);
//   const deltaLat = toRadians(lat - location1.coordinates.lat);
//   const deltaLon = toRadians(lng - location1.coordinates.lng);

//   const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2)
//     + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//   const distance = R * c; // distance in meters
//   return distance;
// }

function calculateDistance(studentLocation, lat2, lon2) {
  const earthRadius = 6371; // Radius of the Earth in kilometers

  // Convert latitude and longitude to radians
  const lat1Rad = toRadians(studentLocation.coordinates.lat);
  const lon1Rad = toRadians(studentLocation.coordinates.lng);
  const lat2Rad = toRadians(lat2);
  const lon2Rad = toRadians(lon2);

  // Haversine formula
  const dlat = lat2Rad - lat1Rad;
  const dlon = lon2Rad - lon1Rad;
  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate the distance
  const distance = earthRadius * c;

  return distance;
}

export default calculateDistance;