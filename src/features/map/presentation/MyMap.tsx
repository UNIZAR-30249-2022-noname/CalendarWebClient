import { Radio, Select, Tooltip } from "antd";
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
  if (lastfloor === null) lastfloor = "Baja";
  const [layerToShow, setLayerToShow] = useState(lastlayer);
  const [floor, setFloor] = useState(lastfloor);

  useEffect(() => {
    var lastlayer = new URLSearchParams(search).get("layerToShow");
    var lastfloor = new URLSearchParams(search).get("floor");
    if (lastlayer === null) lastlayer = "reserved";
    if (lastfloor === null) lastfloor = "Baja";
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
        <Select.Option value="Sótano"> Planta Sótano </Select.Option>
        <Select.Option value="Baja">Planta Baja</Select.Option>
        <Select.Option value="Primera">Planta Primera</Select.Option>
        <Select.Option value="Segunda">Planta Segunda</Select.Option>
        <Select.Option value="Tercera">Planta Tercera</Select.Option>
        <Select.Option value="Cuarta">Planta Cuarta</Select.Option>
        <Select.Option value="Quinta">Planta Quinta</Select.Option>
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
        <Radio.Button value={"capacity"}>Capacidad total</Radio.Button>
        <Radio.Button value={"type"}>Tipo de espacio</Radio.Button>
        <Tooltip placement="topLeft" title="Próximamente">
          <Radio.Button value={"reserved"} disabled>
            Reservado
          </Radio.Button>
        </Tooltip>
        <Tooltip placement="topLeft" title="Próximamente">
          <Radio.Button value={"occupation"} disabled>
            Ocupación actual
          </Radio.Button>
        </Tooltip>
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
