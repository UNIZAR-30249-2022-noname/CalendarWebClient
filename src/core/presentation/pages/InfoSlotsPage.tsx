import React, { useState, useEffect } from "react";
import { DatePicker, message } from "antd";
import locale from "antd/es/date-picker/locale/es_ES";
import { useLocation } from "react-router-dom";
import TableInfoSlots from "../../../features/infoSlots/presentation/components/TableInfoSlots";
import Box from "@mui/material/Box";
import moment from "moment";
import {
  InfoSlotsKey,
  ReqInfoSlot,
  SlotData,
} from "../../../features/infoSlots/domain/models/InfoSlots";
import { infoSlotsService } from "../../../features/infoSlots/domain/services/InfoSlots.service";
import SlotDataInBox from "../../../features/infoSlots/presentation/components/SlotDataInBox";

export const InfoSlotPage = () => {
  const search = useLocation().search;
  const name = new URLSearchParams(search).get("slot");
  const [date, setDate] = useState<string>("");
  const [slot, setSlots] = useState<InfoSlotsKey[]>([]);
  const [slotData, setSlotData] = useState<SlotData>({
    name: "",
    capacity: 0,
    description: "",
    building: "",
    floor: "",
  });

  const request: ReqInfoSlot = {
    name: name,
    date: date,
  };

  useEffect(() => {
    loadFields();
  }, []);

  const loadFields = async () => {
    const allinfo = await infoSlotsService.requestInfoSlots(request);
    if (allinfo.isError) message.error("Error al obtener los espacios");
    else setSlotData(allinfo.value.slotData);
  };

  const slots: InfoSlotsKey[] = [
    {
      key: 8,
      hour: 8,
      occupied: false,
    },
    {
      key: 9,
      hour: 9,
      occupied: true,
      person: "Urriku",
    },
    {
      key: 10,

      hour: 10,
      occupied: false,
    },
    {
      key: 11,
      hour: 11,
      occupied: false,
    },
    {
      key: 12,
      hour: 12,
      occupied: true,
      person: "Urriku",
    },
    {
      key: 13,
      hour: 13,
      occupied: false,
    },
    {
      key: 14,
      hour: 14,
      occupied: false,
    },
    {
      key: 15,
      hour: 15,
      occupied: true,
      person: "Urriku",
    },
    {
      key: 16,
      hour: 16,
      occupied: false,
    },
    {
      key: 17,
      hour: 17,
      occupied: false,
    },
    {
      key: 18,
      hour: 18,
      occupied: true,
      person: "Urriku",
    },
    {
      key: 19,
      hour: 19,
      occupied: false,
    },
    {
      key: 20,
      hour: 20,
      occupied: false,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "red",
        padding: "3%",
      }}
    >
      <div
        onLoad={async () => {
          const allinfo = await infoSlotsService.requestInfoSlots(request);
          if (allinfo.isError) message.error("Error al obtener los espacios");
          //else setSlotData(allinfo.value.slotData);
          else
            setSlotData({
              name: name,
              capacity: 5,
              description: "Lorem ipsum no leas mas porque esto es dummy text",
              building: "Ada",
              floor: "baja",
            });
        }}
      />
      <Box
        component="span"
        sx={{
          p: 2,
          border: "1px dashed grey",
          width: "18%",
          backgroundColor: "white",
        }}
      >
        <DatePicker
          defaultValue={moment(Date())}
          locale={locale}
          onChange={(_, dateString) => {
            setDate(dateString);
          }}
        />
        <h1>
          {date !== "" ? `You have clicked "${date}"` : "No button clicked yet"}
        </h1>
        <SlotDataInBox slotData={slotData} />
      </Box>
      <TableInfoSlots infoSlots={slots} />
    </div>
  );
};
