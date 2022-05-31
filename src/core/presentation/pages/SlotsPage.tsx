import { Row, Space } from "antd";
import Text from "antd/lib/typography/Text";
import { LatLng } from "leaflet";
import moment from "moment";
import { useState } from "react";
import { MapLayers } from "../../../features/map/presentation/MapLayers";
import { MyMap } from "../../../features/map/presentation/MyMap";
import { Slots } from "../../../features/slots/domain/models/Slots";
import SlotsForm from "../../../features/slots/presentation/components/SlotsForm";
import TableSlots from "../../../features/slots/presentation/components/TableSlots";
import { dateFormat } from "../../config/constants";

export const SlotsPage = () => {
  const [slots, setSlots] = useState<Slots[]>([]);
  const [date, setDate] = useState<string>(moment().format(dateFormat));
  const [coord, setCoord] = useState<LatLng>(new LatLng(41.6835, -0.8886));
  const [checked, setChecked] = useState(false);
  function onClickMap(coord: any) {
    setChecked(true);
    setCoord(coord);
  }
  return (
    <Row>
      <div style={{ marginLeft: "50px" }}>
        <SlotsForm updateSlots={setSlots} updateDate={setDate} />
        <TableSlots slots={slots} date={date} onClickMap={onClickMap} />
      </div>
      <div style={{ width: "200px" }} />
      <div style={{ marginTop: "20px" }}>
        <MapLayers
          height="700px"
          width="700px"
          zoom={1}
          layerToShow="type"
          floor={"Baja"}
          checked={checked}
          coord={coord}
        />
      </div>
    </Row>
  );
};
