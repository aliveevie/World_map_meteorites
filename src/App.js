import './App.css';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import { useState, useEffect} from 'react'


const geoUrl = 'https://d3js.org/world-50m.v1.json';
const meteoriteDataUrl = 'https://data.nasa.gov/resource/y77d-th95.geojson';


function App() {

  const [markerData, setMarkerData] = useState([]);
  const [showProp, setShowProp] = useState(false);
 

  useEffect(() => {
    // Fetch meteorite strike data
    fetch(meteoriteDataUrl)
      .then((response) => response.json())
      .then((data) => {
        const features = data.features;
        
        const markerData = features.map((geo) => {
          if (geo.geometry && geo.geometry.coordinates) {
            const longitude = geo.geometry.coordinates[0];
            const latitude = geo.geometry.coordinates[1];
            const properties = geo.properties
            const offset = 30;
            
            return {
              coordinates: [longitude, latitude],
              properties: properties,
              offset: offset
            };
          }
          return null;
        });

        setMarkerData(markerData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  const markerDatas = []; // Your marker data here

  // Initialize a state for each marker
  const [markerStates, setMarkerStates] = useState(markerDatas.map(() => false));

  const handleMouseHover = (index) => {
    setMarkerStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  }
  


  return (
    <div className="App">
      <div className="App-header">
        <ComposableMap>
          <Geographies
            geography={geoUrl}
            fill="#EAEAEC"
            stroke="#D6D6DA"
          >
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmkey} geography={geo} />
              ))
            }
          </Geographies>
          {markerData.map((marker, index) => {
            if (marker) {
              const { coordinates, offset, properties } = marker;
              return (
                <Marker key={index} coordinates={coordinates}>
                  <g fill="none" stroke="#FF5533" strokeWidth="2">
                    <circle cx="12" cy="10" r="3" />
                  </g>
                  <text
                    textAnchor="middle"
                    y={offset}
                    style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                    onMouseEnter={() => handleMouseHover(index)}
                    onMouseLeave={() => handleMouseHover(index)}
                  >
                    {markerStates[index] && properties.name}
                  </text>
                </Marker>
              );
            }
            return null;
          })}
        </ComposableMap>
      </div>
    </div>
  );
}


export default App;
