import { MapContainer, TileLayer } from 'react-leaflet'

export default function MapView() {
  // Coordenadas base: Un punto central de ejemplo (ej. Tijuana)
  const position = [32.5149, -117.0382]
  

  return (
    <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}
