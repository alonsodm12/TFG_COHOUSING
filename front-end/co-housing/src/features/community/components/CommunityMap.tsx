import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

type Props = {
  latitude: number;
  longitude: number;
  address?: string;
};

export const CommunityMap = ({ latitude, longitude, address }: Props) => {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={15} 
      style={{
        height: '200px',
        width: '100%',
        borderRadius: '16px',          // Bordes redondeados
        overflow: 'hidden',            // Para que el borde aplique bien
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', // Sombra suave
      }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>{address ?? 'Ubicación comunidad'}</Popup>
      </Marker>
      <Circle
        center={[latitude, longitude]}
        radius={150} // radio en metros
        pathOptions={{ color: '#3f51b5', fillColor: '#3f51b5', fillOpacity: 0.2 }}
      />
    </MapContainer>
  );
};
