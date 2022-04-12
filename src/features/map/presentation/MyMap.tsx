import { LatLng } from "leaflet";
import { Radio, Select } from "antd";
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  WMSTileLayer,
  LayersControl,
} from "react-leaflet";
import { MapLayers } from "./MapLayers";

//TODO Meter opcion tipo

const { BaseLayer } = LayersControl;

const coordAda = new LatLng(41.6835, -0.8886);
const coordQuevedo = new LatLng(41.6835, -0.8874);
const coordBetan = new LatLng(41.6835, -0.8845);

type MapProps = {
  height: string;
  width: string;
  zoom: number;
};

export function MyMap({ height, width, zoom }: MapProps) {
  var scope = {
    sStyle: {
      height: height,
      width: width,
      zoom: zoom,
    },
  };
  const [value, setValue] = useState(1);

  const onChange = (e: any) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
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
    <div
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Select defaultValue="1">
        <Select.Option value="1">Planta 1</Select.Option>
        <Select.Option value="2">Planta 2</Select.Option>
        <Select.Option value="3">Planta 3</Select.Option>
        <Select.Option value="4">Planta 4</Select.Option>
        <Select.Option value="5">Planta 5</Select.Option>
        <Select.Option value="6">Planta 6</Select.Option>
      </Select>
      <Radio.Group
        onChange={onChange}
        value={value}
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Radio.Button value={1}>Reservado</Radio.Button>
        <Radio.Button value={2}>Por edificio</Radio.Button>
        <Radio.Button value={3}>Capacidad total</Radio.Button>
        <Radio.Button value={4}>Ocupación actual</Radio.Button>
      </Radio.Group>
      <MapLayers height={height} width={width} zoom={zoom} />
    </div>
  );
}
