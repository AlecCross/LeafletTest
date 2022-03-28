import './App.css'
import 'leaflet/dist/leaflet.css'
import {
  CircleMarker,
  MapContainer,
  TileLayer,
  Popup,
  LayersControl
} from 'react-leaflet'
import trevoga from './result'
import cities from './data/cities'

function App() {
  const center = [49.0384, 31.4513]
  const fillBlueOptions = { fillColor: 'blue' }

  const arr = []

  trevoga.messages.map(message => <>
    {Object.values(message.text).map(n => arr.push(n.text))}
  </>)

  // console.log(arr)
  const alarms = new Set(arr)

  // console.log(alarms)
  const newAlarms = []

  const oblast = []
  const rayon = []
  const terGromada = []
  const cityTerGromada = []

  for (let city of alarms) {
    if (city &&
      !city.includes('#') &&
      !city.includes('область') &&
      !city.includes('район')) {
      let city29 = city.substring(29)
      let cityWithoutM = city29.includes('м. ') ? city29.substring(3) : city29
      // let misto = cityWithoutM.substring(cityWithoutM.indexOf('та ') + 3)
      let misto = cityWithoutM.substring(0, cityWithoutM.indexOf('та ') - 1)
      if (misto !== '') newAlarms.push(misto)
    }

    if (city &&
      !city.includes('#') &&
      !city.includes('Відбій тривоги в ') &&
      city.includes('область')
    )
      oblast.push(
        city.substring(29, city.includes('.') ? city.length - 1 : city.length)
      )

    // if (city &&
    //   !city.includes('#') &&
    //   !city.includes('Відбій тривоги в ') &&
    //   !city.includes('область') &&
    //   !city.includes('район') &&
    //   !city.includes('м.')
    // )
    //   terGromada.push(
    //     city.substring(29, city.includes('.') ? city.length - 1 : city.length))

    if (city &&
      !city.includes('#') &&
      city.includes('м. ')) {
      let city29 = city.substring(29)
      let cityWithoutM = city29.includes('м. ') ? city29.substring(3) : city29
      let misto = cityWithoutM.substring(cityWithoutM.indexOf('та ') + 3)
      if (misto.length > 3) terGromada.push(misto.substring(0, misto.includes('.') ? misto.length - 1 : misto.length))
    }

    if (city &&
      !city.includes('#') &&
      !city.includes('Відбій тривоги в ') &&
      !city.includes('область') &&
      !city.includes('територіальна громада') &&
      !city.includes('м.')
    )
      rayon.push(
        city.substring(29, city.includes('.') ? city.length - 1 : city.length))

    if (city &&
      !city.includes('#') &&
      city.includes('м. ')
    )
      cityTerGromada.push(
        city.substring(29))
  }

  console.log([... new Set(newAlarms)])

  const citiesSet = [... new Set(newAlarms)]
  return <>
    <MapContainer
      center={center}
      zoom={6}
      style={{ width: '100vw', height: '100vh' }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=FdGH9PH2clq1aOQP5bpm#1.0/0.00000/0.00000"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> 
        <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      {
        cities.map(c =>
          <CircleMarker
            key={c.coordinates}
            center={c.coordinates}
            pathOptions={fillBlueOptions}
            radius={5}>
            <Popup>{c.city}</Popup>
          </CircleMarker>)
      }
      <LayersControl position="bottomright" collapsed={true}>
        {citiesSet.map((m, index) =>
          <LayersControl.BaseLayer key={index} name={m}>
            <TileLayer></TileLayer>
          </LayersControl.BaseLayer>)}
      </LayersControl>
    </MapContainer></>
}

export default App;
