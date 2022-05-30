import { LatLng } from "leaflet";
import { useState, useEffect } from "react";
import Text from "antd/lib/typography/Text";
import {
  MapContainer,
  TileLayer,
  WMSTileLayer,
  LayersControl,
  Marker,
  Popup,
} from "react-leaflet";
import { relative } from "path";

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
  checked?: boolean;
  coord?: LatLng;
};

type OverlayProps = {
  labelName: string;
  layerToShow: string;
  floor: string;
};

export function MapLayers({
  height,
  width,
  zoom,
  layerToShow,
  floor,
  checked,
  coord,
}: MapProps) {
  var scope = {
    sStyle: {
      height: height,
      width: width,
      zoom: zoom,
    },
  };
  var layerName = "";
  var lts = layerToShow;
  switch (layerToShow) {
    case "reserved": {
      layerName = "Colores por aulas reservadas";
      break;
    }
    case "building": {
      layerName = "Colores por edificio";
      break;
    }
    case "capacity": {
      layerName = "Colores por capacidad";
      lts = lts + "p" + floor;
      floor = floor + "C";
      break;
    }
    case "occupation": {
      layerName = "Colores por ocupación actual";
      break;
    }
    case "type": {
      layerName = "Colores por tipo de espacio";
      break;
    }
  }
  var labelName = layerName + " Planta " + floor;
  var center;
  if (scope.sStyle.zoom === 1) {
    center = coordAda;
  } else if (scope.sStyle.zoom === 3) {
    center = coordBetan;
  } else {
    center = coordQuevedo;
  }
  var url =
    "http://localhost:8081/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=proyecto:p" +
    floor;
  fetch(url)
    .then((res) => {
      return res.blob();
    })
    .then((blob) => {
      var img = URL.createObjectURL(blob);
      // Do whatever with the img
      document.getElementById("legend")?.setAttribute("src", img);
    });
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MapContainer
        center={center}
        zoom={25}
        scrollWheelZoom={true}
        style={scope.sStyle}
      >
        <LayersControl>
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <LayersControl.Overlay name="Ada" checked={checked}>
            <Marker position={coord || coordAda}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </LayersControl.Overlay>
          <MyOverlay labelName={labelName} layerToShow={lts} floor={floor} />
        </LayersControl>
      </MapContainer>
      <div>
        <img id="legend" />
      </div>
    </div>
  );
}

function MyOverlay({ labelName, layerToShow, floor }: OverlayProps) {
  console.log(layerToShow);
  return (
    <LayersControl.Overlay name={labelName} checked>
      <WMSTileLayer
        format="image/png"
        transparent
        layers={"proyecto:" + "p" + floor}
        url={"http://localhost:8081/geoserver/proyecto/wms?"}
        styles={"proyecto:" + layerToShow}
      />
    </LayersControl.Overlay>
  );
}
