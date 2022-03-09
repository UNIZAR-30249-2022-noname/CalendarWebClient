import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  WMSTileLayer,
  LayersControl,
} from "react-leaflet";

const { BaseLayer } = LayersControl;

export const MyMap = () => {
  //return (<Text>Map</Text>);
  return (
    <MapContainer center={[41.65, -0.88]} zoom={13.2} scrollWheelZoom={true}>
      <LayersControl>
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LayersControl.Overlay name= "marker">
          <Marker position={[41.65, -0.88]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          </LayersControl.Overlay>
        </BaseLayer>
        <BaseLayer name="NASA Blue Marble">
          <TileLayer
            url="https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg"
            attribution="&copy; NASA Blue Marble, image service by OpenGeo"
            maxNativeZoom={8}
          />
        </BaseLayer>
      </LayersControl>
    </MapContainer>
  );
};
