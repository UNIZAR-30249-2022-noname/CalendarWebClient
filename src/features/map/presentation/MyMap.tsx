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
          <LayersControl.Overlay name="marker">
            <Marker position={[41.65, -0.88]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="ESPAÑA">
            <WMSTileLayer
              transparent
              format="image/png"
              layers={"OI.OrthoimageCoverage"}
              attribution='&copy; <a href="https://pnoa.ign.es/">IGN</a>'
              url="http://www.ign.es/wms-inspire/pnoa-ma?"
            />
          </LayersControl.Overlay>
        </BaseLayer>
        <LayersControl.Overlay name="EEUU">
          <WMSTileLayer
            format="image/png"
            transparent
            layers="topp:states"
            url="http://172.18.0.5:8080/geoserver/topp/wms?"
          />
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};
