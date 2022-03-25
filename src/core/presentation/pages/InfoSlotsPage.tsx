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
  const [hS, sethS] = useState<InfoSlotsKey[]>([]);
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
    if (allinfo.isError)
      message.error("Error al obtener los datos de este espacio");
    else {
      setSlotData(allinfo.value.slotData);
      var infoSlotsKey: InfoSlotsKey[] = new Array();

      for (var i in allinfo.value.infoSlots) {
        infoSlotsKey[i] = {
          key: allinfo.value.infoSlots[i].hour,
          hour: allinfo.value.infoSlots[i].hour,
          occupied: allinfo.value.infoSlots[i].occupied,
          person: allinfo.value.infoSlots[i].person,
        };
      }
      sethS(infoSlotsKey);
    }
  };

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
      <TableInfoSlots infoSlots={hS} />
    </div>
  );
};
