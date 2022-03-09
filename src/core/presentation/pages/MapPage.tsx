import Text from "antd/lib/typography/Text";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { MyMap } from "../../../features/map/presentation/MyMap";

export const MapPage = () => {
  return (
  <MyMap/>
  );
};
