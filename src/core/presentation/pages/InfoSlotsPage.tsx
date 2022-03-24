import Text from "antd/lib/typography/Text";
import React, { useEffect, useState } from "react";
import { Row, DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/es_ES";
import { useLocation } from "react-router-dom";
import TableInfoSlots from "../../../features/infoSlots/presentation/components/TableInfoSlots";
import Box from "@mui/material/Box";
import moment from "moment";

export const InfoSlotPage = () => {
  const search = useLocation().search;
  const name = new URLSearchParams(search).get("slot");
  const [date, setDate] = useState<string>("");
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
        <Row>
          <Text strong style={{ fontSize: 15, color: "#1890FF" }}>
            Info Slots of {name}
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            fermentum felis a lorem gravida malesuada. Pellentesque justo nulla,
            eleifend a mauris sit amet, dignissim tempor turpis. Aliquam erat
            volutpat. Aenean urna nulla, semper sed risus pretium, rutrum
            ultrices massa. Morbi sit amet orci finibus, pulvinar nunc vitae,
            aliquet massa. Nulla facilisi. Morbi interdum quam et porta
            hendrerit. Vestibulum ut pellentesque turpis. Nam viverra, nulla
            eget accumsan semper, justo dolor vestibulum erat, eu scelerisque
            turpis nisl id enim.
          </Text>
        </Row>
      </Box>
      <TableInfoSlots />
    </div>
  );
};
