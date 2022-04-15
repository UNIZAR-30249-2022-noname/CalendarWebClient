import { Radio, Select } from "antd";
import { useEffect, useState } from "react";
import { MapLayers } from "./MapLayers";
import { useHistory, useLocation } from "react-router-dom";
import Text from "antd/lib/typography/Text";

type MapProps = {
  height: string;
  width: string;
  zoom: number;
};

export function MyMap({ height, width, zoom }: MapProps) {
  const history = useHistory();
  const search = useLocation().search;
  var lastlayer = new URLSearchParams(search).get("layerToShow");
  var lastfloor = new URLSearchParams(search).get("floor");
  if (lastlayer === null) lastlayer = "reserved";
  if (lastfloor === null) lastfloor = "1";
  const [layerToShow, setLayerToShow] = useState(lastlayer);
  const [floor, setFloor] = useState(lastfloor);

  useEffect(() => {
    var lastlayer = new URLSearchParams(search).get("layerToShow");
    var lastfloor = new URLSearchParams(search).get("floor");
    if (lastlayer === null) lastlayer = "reserved";
    if (lastfloor === null) lastfloor = "1";
    setLayerToShow(lastlayer);
    setFloor(lastfloor);
  }, []);

  const onChange = (e: any) => {
    let path = `/map` + "?layerToShow=" + e.target.value + "&floor=" + floor;
    history.push(path);
    window.location.reload();
  };
  function handleChange(value: any) {
    let path = `/map` + "?layerToShow=" + layerToShow + "&floor=" + value;
    history.push(path);
    window.location.reload();
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
      <Select
        defaultValue={lastfloor}
        style={{ left: "48%" }}
        onChange={handleChange}
      >
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
