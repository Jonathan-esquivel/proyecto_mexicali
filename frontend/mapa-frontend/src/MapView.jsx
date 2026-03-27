import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function ChangeView({ center, zoom }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(center, zoom)
  }, [center, map, zoom])
  return null
}

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      if (onMapClick) onMapClick(e.latlng.lat, e.latlng.lng)
    }
  })
  return null
}

export default function MapView({ center = [32.5149, -117.0382], onMapClick, viviendas = [] }) {
  return (
    <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
      <ChangeView center={center} zoom={15} />
      <MapClickHandler onMapClick={onMapClick} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <Marker position={center} />

      {viviendas.map((v) => (
        <Marker 
          key={v.id} 
          position={[v.latitud, v.longitud]}
          eventHandlers={{
            click: () => onMapClick(v.latitud, v.longitud)
          }}
        >
          <Popup>
            <strong>Dirección:</strong> {v.direccion} <br />
            <strong>Estado:</strong> {v.estado}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
