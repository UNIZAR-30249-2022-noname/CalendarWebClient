import { LatLng } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  WMSTileLayer,
  LayersControl,
} from "react-leaflet";

const { BaseLayer } = LayersControl;

const  coordAda = new LatLng(41.6835, -0.8886)
const coordQuevedo = new LatLng(41.6835, -0.8874)
const coordBetan = new LatLng(41.6835, -0.8845)

type MapProps = {
  height: string;
  width: string;
  zoom: number
};

export function MyMap({ height, width, zoom }: MapProps) {
  var scope = {
    sStyle: {
      height: height,
      width: width,
      zoom: zoom
    },
  };
  var center
  if(scope.sStyle.zoom == 1){
    center = coordAda
  } else if (scope.sStyle.zoom == 3){
    center = coordBetan
  } else {
    center = coordQuevedo
  }
  return (
    <MapContainer
      center={center}
      zoom={18}
      scrollWheelZoom={true}
      style={scope.sStyle}
    >
      <LayersControl>
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LayersControl.Overlay name="Ada" checked={scope.sStyle.zoom == 1}>
            <Marker position={coordAda}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Quevedo" checked={scope.sStyle.zoom == 2}>
            <Marker position={coordQuevedo}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Betan" checked={scope.sStyle.zoom == 3}>
            <Marker position={coordBetan}>
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
}
