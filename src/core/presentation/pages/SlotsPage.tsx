import { Row } from "antd";
import Text from "antd/lib/typography/Text";
import { useState } from "react";
import { Slots } from "../../../features/slots/domain/models/Slots";
import SlotsForm from "../../../features/slots/presentation/components/SlotsForm";
import TableSlots from "../../../features/slots/presentation/components/TableSlots";


export const SlotsPage = () => {
  const [slots,setSlots] = useState<Slots[]>([])
  return (
    <Row>
    <div>
      
  <SlotsForm updateSlots={setSlots}/>
  <TableSlots slots={slots}/>
  </div>
  </Row>
  )


};
