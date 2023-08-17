import './App.css';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import { useState, useEffect} from 'react'


const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";
const meteoriteDataUrl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json";


function App() {

  const [meteoriteData, setMeteoriteData] = useState([]);
  const [geometry, setGeometry] = useState([]);

  useEffect(() => {
    // Fetch meteorite strike data
    fetch(meteoriteDataUrl)
      .then((response) => response.json())
      .then((data) => {
        setMeteoriteData(data.features)
       
        const extractedGeometries = data.features.map(feature => feature.geometry);
        setGeometry(extractedGeometries);
        
      });
  }, [meteoriteData]);

  console.log(geometry.map(geo => geo.type))

  return (
    <div className="App">
      <div className="App-header">
     <ComposableMap >
      <Geographies 
      geography={geoUrl}>
      {({ geographies }) => 
        geographies.map((geo) => (
          <Geography  key={geo.rsmkey} geography={geo} />
        ))
        }
      </Geographies>
     
            {geometry.map((meteorite) => {
              const [longitude, latitude] = meteorite.coordinates;
              return (
                <Marker  coordinates={[longitude, latitude]}>
                  <circle r={4} fill="#F00" />
                </Marker>
              );
            })}
        
     </ComposableMap>
      </div>
    </div>
  );
}

export default App;
