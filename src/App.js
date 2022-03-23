import './App.css'
import 'leaflet/dist/leaflet.css'
import {
  Circle,
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
} from 'react-leaflet'


function App() {

  const center = [49.0384, 31.4513]
  
  const fillBlueOptions = { fillColor: 'blue' }
  const redOptions = { color: 'red' }


  return (
    <MapContainer
      center={center}
      zoom={6}
      style={{ width: '100vw', height: '100vh' }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=FdGH9PH2clq1aOQP5bpm#1.0/0.00000/0.00000"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      <Circle center={center} pathOptions={fillBlueOptions} radius={200} />
      <CircleMarker
        center={[49.0384,  31.4513]}
        pathOptions={redOptions}
        radius={20}>
        <Popup>Popup in CircleMarker</Popup>
      </CircleMarker>
    </MapContainer>
  )
}

export default App;
