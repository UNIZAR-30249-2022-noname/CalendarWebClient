import { Row } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { SlotData } from "../../domain/models/InfoSlots";

type Props = {
  slotData: SlotData;
};

const SlotDataInBox = ({ slotData }: Props) => {
  return (
    <Row>
      <Text strong style={{ fontSize: 15, color: "#1890FF" }}>
        Info Slots of {slotData.name}
      </Text>
      <Text style={{ width: "100%" }}>Descripción: {slotData.description}</Text>
      <Text style={{ width: "100%" }}>Tipo: {slotData.kind}</Text>
      <Text style={{ width: "100%" }}>Capacidad: {slotData.capacity}</Text>
      <Text style={{ width: "100%" }}>Edificio: {slotData.building}</Text>
      <Text style={{ width: "100%" }}>Planta: {slotData.floor}</Text>
    </Row>
  );
};

export default React.memo(SlotDataInBox);
