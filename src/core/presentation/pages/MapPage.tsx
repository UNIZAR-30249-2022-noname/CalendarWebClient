import Text from "antd/lib/typography/Text";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export const MapPage = () => {
  //return (<Text>Map</Text>);
  return (
  <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  </MapContainer>
  );
};
