import { HourglassTwoTone } from "@ant-design/icons";
import { Button, Row, Table, Tag } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { InfoSlotsKey, SlotData } from "../../domain/models/InfoSlots";

type Props = {
  slotData: SlotData;
};

const SlotDataInBox = ({ slotData }: Props) => {
  return (
    <Row>
      <Text strong style={{ fontSize: 15, color: "#1890FF" }}>
        Info Slots of {slotData.name}
      </Text>
      <Text>Descripción: {slotData.description}</Text>
      <Text>Capacidad: {slotData.capacity}</Text>
      <Text>Edificio: {slotData.building}</Text>
      <Text>Planta: {slotData.floor}</Text>
    </Row>
  );
};

export default React.memo(SlotDataInBox);
