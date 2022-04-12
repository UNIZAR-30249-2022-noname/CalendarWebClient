import { Radio, Select } from "antd";
import { useState } from "react";
import { MapLayers } from "./MapLayers";
import Text from "antd/lib/typography/Text";

type MapProps = {
  height: string;
  width: string;
  zoom: number;
};

export function MyMap({ height, width, zoom }: MapProps) {
  const [layerToShow, setLayerToShow] = useState("reserved");
  const [floor, setFloor] = useState("1");

  const onChange = (e: any) => {
    setLayerToShow(e.target.value);
  };
  function handleChange(value: any) {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
    setFloor(value);
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
      <Select defaultValue="1" style={{ left: "48%" }} onChange={handleChange}>
        <Select.Option value="1">Planta 1</Select.Option>
        <Select.Option value="2">Planta 2</Select.Option>
        <Select.Option value="3">Planta 3</Select.Option>
        <Select.Option value="4">Planta 4</Select.Option>
        <Select.Option value="5">Planta 5</Select.Option>
        <Select.Option value="6">Planta 6</Select.Option>
      </Select>
      <Radio.Group
        onChange={onChange}
        value={layerToShow}
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Radio.Button value={"reserved"}>Reservado</Radio.Button>
        <Radio.Button value={"building"}>Por edificio</Radio.Button>
        <Radio.Button value={"capacity"}>Capacidad total</Radio.Button>
        <Radio.Button value={"occupation"}>Ocupación actual</Radio.Button>
        <Radio.Button value={"type"}>Tipo de espacio</Radio.Button>
      </Radio.Group>
      <MapLayers
        height={height}
        width={width}
        zoom={zoom}
        layerToShow={layerToShow}
        floor={floor}
      />
    </div>
  );
}
