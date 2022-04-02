import { Row, Space } from "antd";
import Text from "antd/lib/typography/Text";
import moment from "moment";
import { useState } from "react";
import { MyMap } from "../../../features/map/presentation/MyMap";
import { Slots } from "../../../features/slots/domain/models/Slots";
import SlotsForm from "../../../features/slots/presentation/components/SlotsForm";
import TableSlots from "../../../features/slots/presentation/components/TableSlots";
import {dateFormat} from "../../config/constants"

export const SlotsPage = () => {
  const [slots, setSlots] = useState<Slots[]>([]);
  const [date, setDate] = useState<string>(moment().format(dateFormat));
  return (
    <Row>
      <div style={{ marginLeft: "50px" }}>
        <SlotsForm updateSlots={setSlots} updateDate={setDate}  />
        <TableSlots slots={slots} date={date} />
      </div>
      <div style={{ width: "200px" }} />
      <div style={{ marginTop: "20px" }}>
        <MyMap height="700px" width="700px" zoom={1} />
      </div>
    </Row>
  );
};
