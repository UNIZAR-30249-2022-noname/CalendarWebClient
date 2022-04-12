import { LatLng } from "leaflet";
import { Radio, Select } from "antd";
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  WMSTileLayer,
  LayersControl,
} from "react-leaflet";

//TODO Meter opcion tipo

const { BaseLayer } = LayersControl;

const coordAda = new LatLng(41.6835, -0.8886);
const coordQuevedo = new LatLng(41.6835, -0.8874);
const coordBetan = new LatLng(41.6835, -0.8845);

type MapProps = {
  height: string;
  width: string;
  zoom: number;
  layerToShow: string;
  floor: string;
};

export function MapLayers({
  height,
  width,
  zoom,
  layerToShow,
  floor,
}: MapProps) {
  var scope = {
    sStyle: {
      height: height,
      width: width,
      zoom: zoom,
    },
  };
  var center;
  if (scope.sStyle.zoom === 1) {
    center = coordAda;
  } else if (scope.sStyle.zoom === 3) {
    center = coordBetan;
  } else {
    center = coordQuevedo;
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
        <LayersControl.Overlay name="Colores por aulas reservadas">
          <WMSTileLayer
            format="image/png"
            transparent
            layers="topp:states"
            url="http://localhost:8081/geoserver/topp/wms?"
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Colores por edificio">
          <WMSTileLayer
            format="image/png"
            transparent
            layers="topp:states"
            url="http://localhost:8081/geoserver/topp/wms?"
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Colores por capacidad del aula">
          <WMSTileLayer
            format="image/png"
            transparent
            layers="topp:states"
            url="http://localhost:8081/geoserver/topp/wms?"
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Colores por ocupación actual">
          <WMSTileLayer
            format="image/png"
            transparent
            layers="topp:states"
            url="http://localhost:8081/geoserver/topp/wms?"
          />
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
}
