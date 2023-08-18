// Your JSON data
const data = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            6.08333,
            50.775
          ]
        }
      }
      // ... additional features can be here
    ]
  };
  
  // Extracting geometry
  const features = data.features; // Array of features
  
  for (const feature of features) {
    const geometry = feature.geometry;
  
   console.log(geometry.coordinates)
      
  }
  