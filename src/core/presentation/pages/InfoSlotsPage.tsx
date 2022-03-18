import Text from "antd/lib/typography/Text";
import { Row, Space } from "antd";
import { useLocation } from "react-router-dom";
import TableInfoSlots from "../../../features/infoSlots/presentation/components/TableInfoSlots";
import Box from "@mui/material/Box";

export const InfoSlotPage = () => {
  const search = useLocation().search;
  const name = new URLSearchParams(search).get("slot");

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
