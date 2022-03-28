import React, { useState, useEffect } from "react";
import { DatePicker, message } from "antd";
import locale from "antd/es/date-picker/locale/es_ES";
import { useLocation } from "react-router-dom";
import TableInfoSlots from "../../../features/infoSlots/presentation/components/TableInfoSlots";
import Box from "@mui/material/Box";
import {dateFormat} from "../../config/constants"
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
  const queryDate = new URLSearchParams(search).get("date");
  const [date, setDate] = useState<string>(queryDate!); //Esto me lo pasara iñigo
  const [hS, sethS] = useState<InfoSlotsKey[]>([]);
  const [slotData, setSlotData] = useState<SlotData>({
    name: "",
    capacity: 0,
    description: "",
    building: "",
    floor: "",
    type: "",
  });

  const request: ReqInfoSlot = {
    name: name,
    date: date,
  };

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    loadFields();
  }, []);

  const loadFields = async () => {
    const allinfo = await infoSlotsService.requestInfoSlots(request);
    const key = "update";
    message.loading({ content: "Actualizando datos...", key });
    if (allinfo.isError)
      message.error("Error al obtener los datos de este espacio");
    else {
      await delay(500);
      message.success({ content: "Datos actualizados", key, duration: 1 });
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
          format={dateFormat}
          defaultValue={moment(queryDate,dateFormat)}
          locale={locale}
          onChange={(_, dateString) => {
            setDate(dateString);
            loadFields();
          }}
        />
        <SlotDataInBox slotData={slotData} />
      </Box>
      <TableInfoSlots infoSlots={hS} space={name} date={date} person={"Yo"} />
    </div>
  );
};
