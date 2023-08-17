import './App.css';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import { useState, useEffect} from 'react'


const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";
const meteoriteDataUrl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json";


function App() {

  const [meteoriteData, setMeteoriteData] = useState([]);
  const [coordinate, setCoordinates] = useState([]);

  useEffect(() => {
    // Fetch meteorite strike data
    fetch(meteoriteDataUrl)
      .then((response) => response.json())
      .then((data) => {
        setMeteoriteData(data.features)
      });
  }, [meteoriteData]);
console.log(meteoriteData.map(features => features.geometry))

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
     
            {meteoriteData.map((meteorite) => {
              const [longitude, latitude] = meteorite.geometry.coordinates;
              return (
                <Marker key={meteorite.properties.id} coordinates={[longitude, latitude]}>
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
